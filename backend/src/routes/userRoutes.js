const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento do usuário autenticado
 */

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     summary: Atualiza os dados do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Novo Nome"
 *               email:
 *                 type: string
 *                 example: "novoemail@exemplo.com"
 *               senha:
 *                 type: string
 *                 example: "nova_senha"
 *               receberLembretes:
 *                 type: boolean
 *                 example: true
 *               avatarSelecionado:
 *                 type: number
 *                 example: 2
 *               idioma:
 *                 type: string
 *                 example: "pt"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 */
router.put('/me', userController.updateMe);

/**
 * @swagger
 * /api/users/me:
 *   delete:
 *     summary: Deleta o usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso.
 */
router.delete('/me', userController.deleteMe);

module.exports = router;
