const Rotina = require('../models/Rotina');

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

// Função auxiliar para calcular as emissões da rotina
const calcularEmissoesRotina = (dados) => {
    let alimentosTotal = 0;
    let gasTotal = 0;
    let veiculosTotal = 0;

    // 1. Cálculo de Alimentos (* 4 semanas no mês)
    if (dados.porcoes) {
        for (const [alimento, quantidade] of Object.entries(dados.porcoes)) {
            const fator = FATORES_EMISSAO.alimentos[alimento] || 0;
            alimentosTotal += (quantidade * fator) * 4;
        }
    }

    // 2. Cálculo de Gás Botijão
    // Se for encanado, o valor na rotina é null/0 (será calculado no TesteDeUsuario)
    const usaGasEncanado = dados.tipoGas === 'encanado';
    const qtdPessoas = dados.quantidadePessoas || 1;
    
    if (!usaGasEncanado && dados.tipoBotijao && dados.tempoDuracaoGas) {
        const fatorGas = FATORES_EMISSAO.gas[dados.tipoBotijao] || 0;
        gasTotal = (fatorGas / dados.tempoDuracaoGas) / qtdPessoas;
    }

    // 3. Cálculo de Veículos
    if (dados.usaVeiculo === 'sim') {
        if (dados.possuiVeiculo === 'proprio') {
            if (dados.combustivel === 'Elétrico') {
                veiculosTotal += ((dados.kmEletrico || 0) * FATORES_EMISSAO.eletrico) * 4;
            } else {
                const fatorCombustivel = FATORES_EMISSAO.combustiveis[dados.combustivel] || 0;
                veiculosTotal += (dados.litrosCombustivel || 0) * fatorCombustivel;
            }
        } else if (dados.possuiVeiculo === 'publico') {
            if (dados.transportesPublicos && dados.kmTransportes) {
                dados.transportesPublicos.forEach((tipo) => {
                    const km = dados.kmTransportes[tipo] || 0;
                    const fator = FATORES_EMISSAO.transportes[tipo] || 0;
                    veiculosTotal += km * fator;
                });
                veiculosTotal = veiculosTotal * 4; // * 4 semanas
            }
        }
    }

    return {
        alimentos: parseFloat(alimentosTotal.toFixed(2)),
        gas: parseFloat(gasTotal.toFixed(2)),
        veiculos: parseFloat(veiculosTotal.toFixed(2)),
        total: parseFloat((alimentosTotal + gasTotal + veiculosTotal).toFixed(2))
    };
};

/**
 * Cadastrar nova rotina
 */
exports.createRotina = async (req, res) => {
    try {
        const dadosRotina = req.body;
        
        // Realiza o cálculo no Backend!
        const emissoesCalculadas = calcularEmissoesRotina(dadosRotina);
        
        const novaRotina = new Rotina({
            ...dadosRotina,
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
 * Buscar todas as rotinas de um usuário específico
 */
exports.getRotinasByUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
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
