const mongoose = require('mongoose');

const rotinaSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nome: { type: String, required: true },
  dieta: { type: String },
  porcoes: {
    type: Map,
    of: Number
  },
  quantidadePessoas: { type: Number },
  tipoGas: { type: String }, // "encanado" ou "botijao"
  tipoBotijao: { type: String }, // "P13", "P20", "P45"
  tempoDuracaoGas: { type: Number },
  usaVeiculo: { type: String }, // "sim" ou "nao"
  possuiVeiculo: { type: String }, // "proprio" ou "publico"
  combustivel: { type: String }, // "Gasolina", "Diesel", "Etanol", "Elétrico", "Nenhum"
  litrosCombustivel: { type: Number },
  kmEletrico: { type: Number },
  transportesPublicos: [String],
  kmTransportes: {
    type: Map,
    of: Number
  },
  emissoes: {
    alimentos: { type: Number, default: 0 },
    gas: { type: Number, default: 0 }, // null/0 se for gás encanado (calculado depois no teste)
    veiculos: { type: Number, default: 0 },
    total: { type: Number, default: 0 } // soma prévia da rotina
  },
  dataCriacao: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Rotina', rotinaSchema);