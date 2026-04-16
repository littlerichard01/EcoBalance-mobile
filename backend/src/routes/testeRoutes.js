const express = require('express');
const router = express.Router();
const testeController = require('../controllers/testeController');
const authMiddleware = require('../middlewares/authMiddleware');

// Aplica o middleware de autenticação em TODAS as rotas de teste
router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Testes
 *   description: Cálculos mensais de pegada de carbono
 */

/**
 * @swagger
 * /api/testes:
 *   post:
 *     summary: Cria e calcula um novo teste mensal
 *     description: Junta os dados fixos de uma rotina existente com os gastos variáveis do mês (energia, viagens).
 *     tags: [Testes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rotina:
 *                 type: string
 *                 description: "ID da Rotina Base escolhida"
 *                 example: "id_da_rotina_aqui"
 *               energiaEletrica:
 *                 type: object
 *                 properties:
 *                   kwh:
 *                     type: number
 *                 example: { "kwh": 0 }
 *               gasNatural:
 *                 type: object
 *                 properties:
 *                   m3:
 *                     type: number
 *                 example: { "m3": 0 }
 *               viagem:
 *                 type: object
 *                 properties:
 *                   fezViagem:
 *                     type: boolean
 *                   internacional:
 *                     type: boolean
 *                   veiculos:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         tipo:
 *                           type: string
 *                         km:
 *                           type: number
 *                 example: { "fezViagem": false, "internacional": false, "veiculos": [] }
 *     responses:
 *       201:
 *         description: Teste criado e emissão total calculada.
 */
router.post('/', testeController.createTeste);

/**
 * @swagger
 * /api/testes/me:
 *   get:
 *     summary: Lista o histórico de testes (cálculos) do usuário autenticado
 *     tags: [Testes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Histórico de testes retornado.
 */
router.get('/me', testeController.getMyTestes);

/**
 * @swagger
 * /api/testes/usuario/{usuarioId}:
 *   get:
 *     summary: Lista o histórico de testes (cálculos) de um usuário
 *     tags: [Testes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *         example: "id_do_usuario_aqui"
 *     responses:
 *       200:
 *         description: Histórico de testes retornado.
 */
router.get('/usuario/:usuarioId', testeController.getTestesByUsuario);

module.exports = router;
