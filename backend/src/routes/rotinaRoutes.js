const express = require('express');
const router = express.Router();
const rotinaController = require('../controllers/rotinaController');
const authMiddleware = require('../middlewares/authMiddleware');

// Aplica o middleware de autenticação em TODAS as rotas de rotina
router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Rotinas
 *   description: Gerenciamento de rotinas dos usuários (CRUD)
 */

/**
 * @swagger
 * /api/rotinas:
 *   post:
 *     summary: Cria uma nova rotina
 *     description: Envia os dados brutos do usuário. O cálculo das emissões é feito automaticamente pelo servidor.
 *     tags: [Rotinas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Nome da Rotina"
 *               dieta:
 *                 type: string
 *                 example: "Tipo de Dieta"
 *               porcoes:
 *                 type: object
 *                 example: {"Alimento 1": 0, "Alimento 2": 0}
 *               quantidadePessoas:
 *                 type: number
 *                 example: 1
 *               tipoGas:
 *                 type: string
 *                 example: "encanado_ou_botijao"
 *               tipoBotijao:
 *                 type: string
 *                 example: "tipo_do_botijao_se_houver"
 *               tempoDuracaoGas:
 *                 type: number
 *                 example: 1
 *               usaVeiculo:
 *                 type: string
 *                 example: "sim_ou_nao"
 *               possuiVeiculo:
 *                 type: string
 *                 example: "proprio_ou_publico"
 *               litrosCombustivel:
 *                 type: number
 *                 example: 0
 *               kmEletrico:
 *                 type: number
 *                 example: 0
 *               transportesPublicos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Transporte 1", "Transporte 2"]
 *               kmTransportes:
 *                 type: object
 *                 example: {"Transporte 1": 0, "Transporte 2": 0}
 *     responses:
 *       201:
 *         description: Rotina criada e calculada com sucesso.
 */
router.post('/', rotinaController.createRotina);

/**
 * @swagger
 * /api/rotinas/usuario/lista:
 *   get:
 *     summary: Lista todas as rotinas do usuário logado
 *     description: Utiliza o Token JWT do cabeçalho para identificar o usuário, não precisando passar o ID na URL.
 *     tags: [Rotinas]
 *     responses:
 *       200:
 *         description: Lista de rotinas do usuário.
 */
router.get('/usuario/lista', rotinaController.getRotinasByUsuario);

/**
 * @swagger
 * /api/rotinas/{id}:
 *   get:
 *     summary: Busca uma rotina específica pelo ID
 *     tags: [Rotinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "id_da_rotina_aqui"
 *     responses:
 *       200:
 *         description: Dados da rotina.
 *       404:
 *         description: Rotina não encontrada.
 */
router.get('/:id', rotinaController.getRotinaById);

/**
 * @swagger
 * /api/rotinas/{id}:
 *   put:
 *     summary: Atualiza uma rotina existente
 *     description: Ao atualizar os dados, o servidor recalcula as emissões automaticamente.
 *     tags: [Rotinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "id_da_rotina_aqui"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Novo Nome da Rotina"
 *               dieta:
 *                 type: string
 *                 example: "Nova Dieta"
 *               porcoes:
 *                 type: object
 *                 example: {"Alimento 1": 0, "Alimento 2": 0}
 *               quantidadePessoas:
 *                 type: number
 *                 example: 1
 *               tipoGas:
 *                 type: string
 *                 example: "encanado_ou_botijao"
 *               tipoBotijao:
 *                 type: string
 *                 example: "tipo_do_botijao_se_houver"
 *               tempoDuracaoGas:
 *                 type: number
 *                 example: 1
 *               usaVeiculo:
 *                 type: string
 *                 example: "sim_ou_nao"
 *               possuiVeiculo:
 *                 type: string
 *                 example: "proprio_ou_publico"
 *               litrosCombustivel:
 *                 type: number
 *                 example: 0
 *               kmEletrico:
 *                 type: number
 *                 example: 0
 *               transportesPublicos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Transporte 1", "Transporte 2"]
 *               kmTransportes:
 *                 type: object
 *                 example: {"Transporte 1": 0, "Transporte 2": 0}
 *     responses:
 *       200:
 *         description: Rotina atualizada com sucesso.
 */
router.put('/:id', rotinaController.updateRotina);

/**
 * @swagger
 * /api/rotinas/{id}:
 *   delete:
 *     summary: Deleta uma rotina
 *     tags: [Rotinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "id_da_rotina_aqui"
 *     responses:
 *       200:
 *         description: Rotina deletada com sucesso.
 */
router.delete('/:id', rotinaController.deleteRotina);

module.exports = router;
