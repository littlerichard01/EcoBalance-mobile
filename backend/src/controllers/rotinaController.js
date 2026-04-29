const jwt = require('jsonwebtoken');
const Rotina = require('../models/Rotina');
const User = require('../models/User');

// Fatores de emissão (trazidos do front-end para o back-end)
const FATORES_EMISSAO = {
    alimentos: {
        'Carne bovina': 6.136,
        'Carne suína': 1.149,
        'Frango': 0.591,
        'Peixe': 0.389,
        'Leite': 0.594,
        'Ovos': 0.186,
        'Leguminosas': 0.055,
        'Frutas e vegetais': 0.135,
        'Cereais integrais': 0.176
    },
    gas: {
        'P13': 35.711,
        'P20': 54.94,
        'P45': 123.615
    },
    combustiveis: {
        'Gasolina': 2.31,
        'Diesel': 2.68,
        'Etanol': 1.44
    },
    transportes: {
        'Ônibus': 0.016,
        'Ônibus elétrico': 0,
        'Metrô': 0.0035,
        'Trem': 0.019,
        'Carro (app)': 0.1268,
        'Motocicleta (app)': 0.0711
    },
    eletrico: 0.0891
};

// Funções auxiliares para reduzir a complexidade da principal
const calcularAlimentos = (porcoes) => {
    if (!porcoes) return 0;
    return Object.entries(porcoes).reduce((total, [alimento, quantidade]) => {
        const fator = FATORES_EMISSAO.alimentos[alimento] || 0;
        return total + (quantidade * fator) * 4;
    }, 0);
};

const calcularVeiculosProprios = (dados) => {
    if (dados.combustivel === 'Elétrico') {
        return ((dados.kmEletrico || 0) * FATORES_EMISSAO.eletrico) * 4;
    }
    const fatorCombustivel = FATORES_EMISSAO.combustiveis[dados.combustivel] || 0;
    return (dados.litrosCombustivel || 0) * fatorCombustivel;
};

const calcularTransportePublico = (transportes, kms) => {
    if (!transportes || !kms) return 0;
    const total = transportes.reduce((acc, tipo) => {
        const km = kms[tipo] || 0;
        const fator = FATORES_EMISSAO.transportes[tipo] || 0;
        return acc + (km * fator);
    }, 0);
    return total * 4;
};

// Função principal agora simplificada (Complexidade < 15)
const calcularEmissoesRotina = (dados) => {
    let gasTotal = 0;
    let veiculosTotal = 0;

    const alimentosTotal = calcularAlimentos(dados.porcoes);

    const usaGasEncanado = dados.tipoGas === 'encanado';
    const qtdPessoas = dados.quantidadePessoas || 1;
    if (!usaGasEncanado && dados.tipoBotijao && dados.tempoDuracaoGas) {
        const fatorGas = FATORES_EMISSAO.gas[dados.tipoBotijao] || 0;
        gasTotal = (fatorGas / dados.tempoDuracaoGas) / qtdPessoas;
    }

    if (dados.usaVeiculo === 'sim') {
        veiculosTotal = dados.possuiVeiculo === 'proprio'
            ? calcularVeiculosProprios(dados)
            : calcularTransportePublico(dados.transportesPublicos, dados.kmTransportes);
    }

    const totalGeral = alimentosTotal + gasTotal + veiculosTotal;

    return {
        alimentos: parseFloat(alimentosTotal.toFixed(2)),
        gas: parseFloat(gasTotal.toFixed(2)),
        veiculos: parseFloat(veiculosTotal.toFixed(2)),
        total: parseFloat(totalGeral.toFixed(2))
    };
};

const obterUsuarioIdDaRequisicao = async (req) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return null;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded?.id) {
        return String(decoded.id);
    }

    if (decoded?._id) {
        return String(decoded._id);
    }

    if (decoded?.userId) {
        return String(decoded.userId);
    }

    if (decoded?.email) {
        const user = await User.findOne({ email: decoded.email }).select('_id');
        if (user) {
            return String(user._id);
        }
    }

    return null;
};

/**
 * Cadastrar nova rotina
 */
exports.createRotina = async (req, res) => {
    try {
        const dadosRotina = { ...req.body };
        const usuarioId = await obterUsuarioIdDaRequisicao(req);

        if (!usuarioId) {
            return res.status(401).json({ message: 'Usuário não autenticado.' });
        }

        // Garante o ID do usuário como String
        dadosRotina.usuarioId = String(usuarioId);

        // Formatar valores numéricos que podem vir como string vazia do front
        if (dadosRotina.quantidadePessoas === '') delete dadosRotina.quantidadePessoas;
        if (dadosRotina.tempoDuracaoGas === '') delete dadosRotina.tempoDuracaoGas;
        if (dadosRotina.litrosCombustivel === '') delete dadosRotina.litrosCombustivel;
        if (dadosRotina.kmEletrico === '') delete dadosRotina.kmEletrico;

        // Realiza o cálculo no Backend!
        const emissoesCalculadas = calcularEmissoesRotina(dadosRotina);

        // Criando o objeto explicitamente com TODOS os campos do Schema
        const novaRotina = new Rotina({
            usuarioId: dadosRotina.usuarioId,
            nome: dadosRotina.nome, 
            dieta: dadosRotina.dieta, 
            porcoes: dadosRotina.porcoes,
            quantidadePessoas: dadosRotina.quantidadePessoas, 
            tipoGas: dadosRotina.tipoGas,
            tipoBotijao: dadosRotina.tipoBotijao,
            tempoDuracaoGas: dadosRotina.tempoDuracaoGas,
            usaVeiculo: dadosRotina.usaVeiculo,
            possuiVeiculo: dadosRotina.possuiVeiculo,
            combustivel: dadosRotina.combustivel,
            kmEletrico: dadosRotina.kmEletrico,
            litrosCombustivel: dadosRotina.litrosCombustivel,
            transportesPublicos: dadosRotina.transportesPublicos,
            kmTransportes: dadosRotina.kmTransportes,
            emissoes: emissoesCalculadas
        });

        await novaRotina.save();
        res.status(201).json({ message: 'Rotina criada com sucesso!', rotina: novaRotina });
    } catch (error) {
        console.error('Erro ao criar rotina:', error);
        res.status(500).json({ message: 'Erro interno ao criar rotina', error: error.message });
    }
};

/**
 * Buscar todas as rotinas do usuário logado
 */
exports.getRotinasByUsuario = async (req, res) => {
    try {
        const usuarioId = await obterUsuarioIdDaRequisicao(req);

        if (!usuarioId) {
            return res.status(401).json({ message: 'Usuário não autenticado.' });
        }

        const rotinas = await Rotina.find({ usuarioId }).sort({ dataCriacao: -1 });

        res.status(200).json(rotinas);
    } catch (error) {
        console.error('Erro ao buscar rotinas:', error);
        res.status(500).json({ message: 'Erro interno ao buscar rotinas', error: error.message });
    }
};

/**
 * Buscar uma rotina específica pelo ID
 */
exports.getRotinaById = async (req, res) => {
    try {
        const { id } = req.params;
        const rotina = await Rotina.findById(id);

        if (!rotina) {
            return res.status(404).json({ message: 'Rotina não encontrada.' });
        }

        res.status(200).json(rotina);
    } catch (error) {
        console.error('Erro ao buscar rotina:', error);
        res.status(500).json({ message: 'Erro interno ao buscar rotina', error: error.message });
    }
};

/**
 * Atualizar uma rotina existente
 */
exports.updateRotina = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        // Se houver dados que alterem o cálculo, recalculamos no backend
        const emissoesCalculadas = calcularEmissoesRotina(dadosAtualizados);
        dadosAtualizados.emissoes = emissoesCalculadas;

        const rotina = await Rotina.findByIdAndUpdate(
            id,
            { $set: dadosAtualizados },
            { new: true, runValidators: true }
        );

        if (!rotina) {
            return res.status(404).json({ message: 'Rotina não encontrada.' });
        }

        res.status(200).json({ message: 'Rotina atualizada com sucesso!', rotina });
    } catch (error) {
        console.error('Erro ao atualizar rotina:', error);
        res.status(500).json({ message: 'Erro interno ao atualizar rotina', error: error.message });
    }
};

/**
 * Deletar uma rotina
 */
exports.deleteRotina = async (req, res) => {
    try {
        const { id } = req.params;
        const rotina = await Rotina.findByIdAndDelete(id);

        if (!rotina) {
            return res.status(404).json({ message: 'Rotina não encontrada.' });
        }

        res.status(200).json({ message: 'Rotina deletada com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar rotina:', error);
        res.status(500).json({ message: 'Erro interno ao deletar rotina', error: error.message });
    }
};
