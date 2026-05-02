const cron = require('node-cron');
const User = require('../models/User');
const TesteDeUsuario = require('../models/TesteDeUsuario');
const { enviarEmailLembreteTeste } = require('../services/emailService');

const DIAS_PARA_LEMBRETE = Number(process.env.TESTE_LEMBRETE_DIAS || 30);

const diffDias = (a, b) => {
  const ms = a.getTime() - b.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
};

const buscarDataBase = async (userId) => {
  const ultimoTeste = await TesteDeUsuario.findOne({ usuario: userId })
    .sort({ dataRealizacao: -1, createdAt: -1 })
    .select('dataRealizacao createdAt')
    .lean();

  const raw = ultimoTeste?.dataRealizacao || ultimoTeste?.createdAt;
  if (raw) {
    const d = new Date(raw);
    if (!Number.isNaN(d.getTime())) return d;
  }

  const user = await User.findById(userId).select('createdAt').lean();
  const created = user?.createdAt ? new Date(user.createdAt) : null;
  if (created && !Number.isNaN(created.getTime())) return created;

  return null;
};

const enviarLembretesEmail = async () => {
  const agora = new Date();
  const users = await User.find({ receberLembretes: true })
    .select('_id nome email ultimoLembreteTesteEmailEm createdAt')
    .lean();

  for (const u of users) {
    if (!u?.email) continue;

    const base = await buscarDataBase(u._id);
    if (!base) continue;

    const diasDesdeBase = diffDias(agora, base);
    if (diasDesdeBase < DIAS_PARA_LEMBRETE) continue;

    const ultimo = u.ultimoLembreteTesteEmailEm ? new Date(u.ultimoLembreteTesteEmailEm) : null;
    if (ultimo && !Number.isNaN(ultimo.getTime())) {
      const diasDesdeUltimoLembrete = diffDias(agora, ultimo);
      if (diasDesdeUltimoLembrete < DIAS_PARA_LEMBRETE) continue;
    }

    try {
      await enviarEmailLembreteTeste({ para: u.email, nome: u.nome });
      await User.updateOne(
        { _id: u._id },
        { $set: { ultimoLembreteTesteEmailEm: agora } }
      );
    } catch (err) {
    }
  }
};

exports.startTesteReminderJob = () => {
  const disabled = String(process.env.TESTE_LEMBRETE_DESATIVADO || '').toLowerCase() === 'true';
  if (disabled) return;

  cron.schedule('0 9 * * *', async () => {
    try {
      await enviarLembretesEmail();
    } catch (e) {}
  });
};
