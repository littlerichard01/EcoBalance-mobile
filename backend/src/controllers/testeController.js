const TesteDeUsuario = require('../models/TesteDeUsuario');
const Rotina = require('../models/Rotina');
const User = require('../models/User');

// Fatores de emissão específicos do Teste (Mensais)
const FATORES_TESTE = {
    energia: 0.0385, // kg CO2 por kWh
    gasNatural: 2.15, // kg CO2 por m³
    viagens: {
        'Carro': 0.192,
        'Carro elétrico': 0.053,
        'Moto': 0.103,
        'Ônibus': 0.105,
        'Metrô': 0.041,
        'Trem': 0.041,
        'Avião': 0.255,
        'Barco/cruzeiro': 0.39
    }
};

/**
 * Função auxiliar para traduzir o nome do veículo se vier em inglês
 */
const getFatorViagem = (tipo) => {
    const mapaIngles = {
        'Car': 'Carro',
        'Electric car': 'Carro elétrico',
        'Motorcycle': 'Moto',
        'Bus': 'Ônibus',
        'Subway': 'Metrô',
        'Train': 'Trem',
        'Airplane': 'Avião',
        'Boat/Cruise': 'Barco/cruzeiro'
    };
    const tipoTraduzido = mapaIngles[tipo] || tipo;
    return FATORES_TESTE.viagens[tipoTraduzido] || 0;
};

/**
 * Criar um novo Teste de Usuário (Cálculo Mensal)
 */
exports.createTeste = async (req, res) => {
    try {
        const { usuario, rotina: rotinaId, energiaEletrica, gasNatural, viagem } = req.body;

        // 1. Busca a rotina base para pegar as emissões já calculadas nela
        const rotinaBase = await Rotina.findById(rotinaId);
        if (!rotinaBase) {
            return res.status(404).json({ message: 'Rotina base não encontrada.' });
        }

        let emissaoEnergia = 0;
        let emissaoGasMensal = 0;
        let emissaoViagens = 0;

        // 2. Cálculo da Energia Elétrica (kWh mensal)
        if (energiaEletrica && energiaEletrica.kwh) {
            emissaoEnergia = energiaEletrica.kwh * FATORES_TESTE.energia;
        }

        // 3. Cálculo do Gás Natural (só faz sentido se a rotina usa encanado)
        if (rotinaBase.tipoGas === 'encanado' && gasNatural && gasNatural.m3) {
            const qtdPessoas = rotinaBase.quantidadePessoas || 1;
            emissaoGasMensal = (gasNatural.m3 * FATORES_TESTE.gasNatural) / qtdPessoas;
        }

        // 4. Cálculo das Viagens do mês
        let veiculosProcessados = [];
        if (viagem && viagem.fezViagem && viagem.veiculos && viagem.veiculos.length > 0) {
            viagem.veiculos.forEach(v => {
                const fator = getFatorViagem(v.tipo);
                const emissaoVeiculo = (v.km || 0) * fator;
                emissaoViagens += emissaoVeiculo;
                
                veiculosProcessados.push({
                    tipo: v.tipo,
                    km: v.km,
                    emissao: parseFloat(emissaoVeiculo.toFixed(2))
                });
            });
        }

        // 5. Soma total do mês (Rotina Fixa + Teste Variável)
        const totalAlimentos = rotinaBase.emissoes.alimentos || 0;
        
        // Gás total = Gás Botijão (da rotina) + Gás Encanado (do teste mensal)
        const totalGas = (rotinaBase.emissoes.gas || 0) + emissaoGasMensal;
        
        // Veículos total = Veículos Diários (da rotina) + Viagens (do teste mensal)
        const totalVeiculos = (rotinaBase.emissoes.veiculos || 0) + emissaoViagens;

        const emissaoTotal = totalAlimentos + totalGas + totalVeiculos + emissaoEnergia;

        // 6. Prepara o objeto para salvar
        const novoTeste = new TesteDeUsuario({
            usuario,
            rotina: rotinaId,
            energiaEletrica: {
                kwh: energiaEletrica?.kwh || 0,
                emissao: parseFloat(emissaoEnergia.toFixed(2))
            },
            gasNatural: {
                m3: gasNatural?.m3 || 0,
                emissao: parseFloat(emissaoGasMensal.toFixed(2))
            },
            viagem: {
                fezViagem: viagem?.fezViagem || false,
                internacional: viagem?.internacional || false,
                veiculos: veiculosProcessados
            },
            emissaoAlimentos: parseFloat(totalAlimentos.toFixed(2)),
            emissaoGas: parseFloat(totalGas.toFixed(2)),
            emissaoVeiculos: parseFloat(totalVeiculos.toFixed(2)),
            emissaoTotal: parseFloat(emissaoTotal.toFixed(2))
        });

        await novoTeste.save();

        res.status(201).json({ 
            message: 'Teste calculado e salvo com sucesso!', 
            teste: novoTeste 
        });

    } catch (error) {
        console.error('Erro ao criar teste de usuário:', error);
        res.status(500).json({ message: 'Erro interno ao calcular teste', error: error.message });
    }
};

/**
 * Buscar todos os testes de um usuário (Histórico)
 */
exports.getTestesByUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const testes = await TesteDeUsuario.find({ usuario: usuarioId })
            .populate('rotina', 'nome') // Traz o nome da rotina base
            .sort({ dataRealizacao: -1 });
        
        res.status(200).json(testes);
    } catch (error) {
        console.error('Erro ao buscar histórico de testes:', error);
        res.status(500).json({ message: 'Erro interno ao buscar histórico', error: error.message });
    }
};
