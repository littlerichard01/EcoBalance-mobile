const { CONQUISTAS_DEFINICOES } = require('../config/conquistas');

const garantirConquistasPadrao = (usuario) => {
  const atuais = Array.isArray(usuario.conquistas) ? usuario.conquistas : [];
  const nomesAtuais = new Set(atuais.map((c) => c?.nome));
  let mudou = false;

  for (const def of CONQUISTAS_DEFINICOES) {
    const existente = atuais.find((c) => c?.nome === def.nome);
    if (existente && existente.descricao !== def.descricao) {
      existente.descricao = def.descricao;
      mudou = true;
    }
    if (!nomesAtuais.has(def.nome)) {
      atuais.push({
        nome: def.nome,
        descricao: def.descricao,
        ativa: false,
        data: null,
      });
      mudou = true;
    }
  }

  if (!Array.isArray(usuario.conquistas) || mudou) {
    usuario.conquistas = atuais;
  }

  return mudou;
};

module.exports = { garantirConquistasPadrao };
