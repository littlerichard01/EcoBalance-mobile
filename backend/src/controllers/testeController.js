const TesteDeUsuario = require('../models/TesteDeUsuario');
const Rotina = require('../models/Rotina');
const User = require('../models/User');
const { CONQUISTAS_DEFINICOES, MEDIA_GLOBAL_TOTAL } = require('../config/conquistas');
const { garantirConquistasPadrao } = require('../services/conquistasPadrao');

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

const ativarConquista = (usuario, nomeConquista) => {
    const agora = new Date();
    const conquista = (usuario.conquistas || []).find((c) => c?.nome === nomeConquista);
    if (!conquista) {
        const def = CONQUISTAS_DEFINICOES.find((d) => d.nome === nomeConquista);
        usuario.conquistas = [
            ...(usuario.conquistas || []),
            {
                nome: nomeConquista,
                descricao: def?.descricao || nomeConquista,
                ativa: true,
                data: agora
            }
        ];
        return true;
    }

    if (conquista.ativa) return false;

    conquista.ativa = true;
    conquista.data = agora;
    return true;
};

const atualizarConquistasDoUsuario = async (usuarioId) => {
    const usuario = await User.findById(usuarioId).select('conquistas');
    if (!usuario) return;

    let mudou = garantirConquistasPadrao(usuario);

    const testesRecentes = await TesteDeUsuario.find({ usuario: usuarioId })
        .sort({ dataRealizacao: -1, createdAt: -1 })
        .limit(3)
        .select('emissaoTotal dataRealizacao createdAt');

    if (!testesRecentes || testesRecentes.length === 0) {
        if (mudou) await usuario.save();
        return;
    }

    const totalAtual = Number(testesRecentes[0]?.emissaoTotal) || 0;
    const totalAnterior = testesRecentes[1] ? Number(testesRecentes[1]?.emissaoTotal) || 0 : null;
    const totalAnterior2 = testesRecentes[2] ? Number(testesRecentes[2]?.emissaoTotal) || 0 : null;

    const countTestes = await TesteDeUsuario.countDocuments({ usuario: usuarioId });

    if (countTestes === 1) {
        mudou = ativarConquista(usuario, 'primeiro_teste') || mudou;
    }

    if (totalAtual < MEDIA_GLOBAL_TOTAL) {
        mudou = ativarConquista(usuario, 'abaixo_media_global') || mudou;
    }

    if (totalAnterior !== null && totalAtual < MEDIA_GLOBAL_TOTAL && totalAnterior < MEDIA_GLOBAL_TOTAL) {
        mudou = ativarConquista(usuario, 'abaixo_media_global_2') || mudou;
    }

    if (totalAnterior !== null && totalAtual < totalAnterior) {
        mudou = ativarConquista(usuario, 'melhoria_pessoal') || mudou;
    }

    if (totalAnterior !== null && totalAnterior2 !== null && totalAtual < totalAnterior && totalAtual < totalAnterior2) {
        mudou = ativarConquista(usuario, 'melhoria_pessoal_2') || mudou;
    }

    if (mudou) {
        await usuario.save();
    }
};

/**
 * Criar um novo Teste de Usuário (Cálculo Mensal)
 */
exports.createTeste = async (req, res) => {
    try {
        const { rotina: rotinaId, energiaEletrica, gasNatural, viagem } = req.body;
        const usuarioId = req.authUserId;

        if (!usuarioId) {
            return res.status(401).json({ message: 'Usuário não autenticado.' });
        }

        // 1. Busca a rotina base para pegar as emissões já calculadas nela
        const rotinaBase = await Rotina.findOne({ _id: String(rotinaId), usuarioId: String(usuarioId) });
        if (!rotinaBase) {
            return res.status(404).json({ message: 'Rotina base não encontrada.' });
        }

        let emissaoEnergia = 0;
        let emissaoGasMensal = 0;
        let emissaoViagens = 0;

        // 2. Cálculo da Energia Elétrica (kWh mensal)
        if (energiaEletrica?.kwh) {
            emissaoEnergia = energiaEletrica.kwh * FATORES_TESTE.energia;
        }

        // 3. Cálculo do Gás Natural (só faz sentido se a rotina usa encanado)
        if (rotinaBase.tipoGas === 'encanado' && gasNatural?.m3) {
            const qtdPessoas = rotinaBase.quantidadePessoas || 1;
            emissaoGasMensal = (gasNatural.m3 * FATORES_TESTE.gasNatural) / qtdPessoas;
        }

        // 4. Cálculo das Viagens do mês
        let veiculosProcessados = [];
        if (viagem?.fezViagem && viagem?.veiculos?.length > 0) {
            viagem.veiculos.forEach(v => {
                const fator = getFatorViagem(v.tipo);
                const emissaoVeiculo = (v.km || 0) * fator;
                emissaoViagens += emissaoVeiculo;
                
                veiculosProcessados.push({
                    tipo: v.tipo,
                    km: v.km,
                    emissao: Number.parseFloat(emissaoVeiculo.toFixed(2))
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
            usuario: usuarioId,
            rotina: rotinaId,
            energiaEletrica: {
                kwh: energiaEletrica?.kwh || 0,
                emissao: Number.parseFloat(emissaoEnergia.toFixed(2))
            },
            gasNatural: {
                m3: gasNatural?.m3 || 0,
                emissao: Number.parseFloat(emissaoGasMensal.toFixed(2))
            },
            viagem: {
                fezViagem: viagem?.fezViagem || false,
                internacional: viagem?.internacional || false,
                veiculos: veiculosProcessados
            },
            emissaoAlimentos: Number.parseFloat(totalAlimentos.toFixed(2)),
            emissaoGas: Number.parseFloat(totalGas.toFixed(2)),
            emissaoVeiculos: Number.parseFloat(totalVeiculos.toFixed(2)),
            emissaoTotal: Number.parseFloat(emissaoTotal.toFixed(2))
        });

        await novoTeste.save();

        await atualizarConquistasDoUsuario(usuarioId);

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

/**
 * Buscar todos os testes do usuário autenticado (Histórico)
 */
exports.getMyTestes = async (req, res) => {
    try {
        const usuarioId = req.authUserId;

        if (!usuarioId) {
            return res.status(401).json({ message: 'Usuário não autenticado.' });
        }

        const testes = await TesteDeUsuario.find({ usuario: usuarioId })
            .populate('rotina', 'nome')
            .sort({ dataRealizacao: -1 });

        return res.status(200).json(testes);
    } catch (error) {
        console.error('Erro ao buscar histórico de testes do usuário autenticado:', error);
        return res.status(500).json({ message: 'Erro interno ao buscar histórico', error: error.message });
    }
};
