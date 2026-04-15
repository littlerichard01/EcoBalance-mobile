const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');
const Rotina = require('../models/Rotina');
const TesteDeUsuario = require('../models/TesteDeUsuario');

const camposPermitidos = ['nome', 'email', 'senha', 'receberLembretes', 'receberNotificacoesApp', 'avatarSelecionado', 'idioma'];

const sanitizeUser = (user) => ({
    _id: user._id,
    nome: user.nome,
    email: user.email,
    receberLembretes: user.receberLembretes,
    receberNotificacoesApp: user.receberNotificacoesApp,
    avatarSelecionado: user.avatarSelecionado,
    conquistas: user.conquistas,
    idioma: user.idioma,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
});

exports.getMe = async (req, res) => {
    try {
        const usuarioId = req.authUserId;

        if (!usuarioId) {
            return res.status(401).json({ message: 'Usuário não autenticado.' });
        }

        const usuario = await User.findById(usuarioId);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json({
            usuario: sanitizeUser(usuario)
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno ao buscar usuário.',
            error: error.message
        });
    }
};

exports.getMinhasConquistas = async (req, res) => {
    try {
        const usuarioId = req.authUserId;

        if (!usuarioId) {
            return res.status(401).json({ message: 'Usuário não autenticado.' });
        }

        const usuario = await User.findById(usuarioId).select('conquistas');

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json({
            conquistas: usuario.conquistas || []
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno ao buscar conquistas do usuário.',
            error: error.message
        });
    }
};

exports.updateMe = async (req, res) => {
    try {
        const usuarioId = req.authUserId;

        if (!usuarioId) {
            return res.status(401).json({ message: 'Usuário não autenticado.' });
        }

        const updates = {};

        for (const campo of camposPermitidos) {
            if (req.body[campo] !== undefined) {
                updates[campo] = req.body[campo];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'Nenhum dado válido foi enviado para atualização.' });
        }

        if (updates.email) {
            const emailExistente = await User.findOne({
                email: updates.email,
                _id: { $ne: usuarioId }
            });

            if (emailExistente) {
                return res.status(400).json({ message: 'Email já cadastrado.' });
            }
        }

        if (updates.senha) {
            updates.senha = await bcrypt.hash(updates.senha, 10);
        }

        const usuarioAtualizado = await User.findByIdAndUpdate(
            usuarioId,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!usuarioAtualizado) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json({
            message: 'Usuário atualizado com sucesso.',
            usuario: sanitizeUser(usuarioAtualizado)
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno ao atualizar usuário.',
            error: error.message
        });
    }
};

exports.deleteMe = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        const usuarioId = req.authUserId;

        if (!usuarioId) {
            session.endSession();
            return res.status(401).json({ message: 'Usuário não autenticado.' });
        }

        session.startTransaction();

        const usuario = await User.findById(usuarioId).session(session);

        if (!usuario) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const rotinas = await Rotina.find({ usuarioId }).select('_id').session(session);
        const rotinaIds = rotinas.map((rotina) => rotina._id);

        const testesFiltro = rotinaIds.length > 0
            ? { $or: [{ usuario: usuarioId }, { rotina: { $in: rotinaIds } }] }
            : { usuario: usuarioId };

        const testesResult = await TesteDeUsuario.deleteMany(testesFiltro, { session });
        const rotinasResult = await Rotina.deleteMany({ usuarioId }, { session });
        await User.deleteOne({ _id: usuarioId }, { session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message: 'Usuário deletado com sucesso.',
            detalhes: {
                rotinasRemovidas: rotinasResult.deletedCount || 0,
                testesRemovidos: testesResult.deletedCount || 0
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return res.status(500).json({
            message: 'Erro interno ao deletar usuário.',
            error: error.message
        });
    }
};
