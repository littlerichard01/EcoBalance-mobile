const nodemailer = require('nodemailer');

const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true';

  if (!host || !user || !pass) {
    throw new Error('Config SMTP ausente (SMTP_HOST/SMTP_USER/SMTP_PASS).');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass }
  });
};

exports.enviarEmailLembreteTeste = async ({ para, nome }) => {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!from) throw new Error('Remetente SMTP ausente (SMTP_FROM ou SMTP_USER).');

  const transporter = getTransporter();

  const subject = 'EcoBalance: hora de fazer seu teste mensal';
  const displayName = nome ? String(nome).trim() : '';
  const saudacao = displayName ? `Olá, ${displayName}!` : 'Olá!';

  const text =
    `${saudacao}\n\n` +
    `Está na hora de fazer seu teste mensal de cálculo de carbono no EcoBalance.\n` +
    `Abra o aplicativo e realize um novo teste para acompanhar seu progresso.\n\n` +
    `EcoBalance`;

  const html =
    `<p>${saudacao}</p>` +
    `<p>Está na hora de fazer seu teste mensal de cálculo de carbono no <strong>EcoBalance</strong>.</p>` +
    `<p>Abra o aplicativo e realize um novo teste para acompanhar seu progresso.</p>` +
    `<p><strong>EcoBalance</strong></p>`;

  await transporter.sendMail({
    from,
    to: para,
    subject,
    text,
    html
  });
};
