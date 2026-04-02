const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Google Public DNS

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./database/connection');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configuração do Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Verifica o status do servidor
 *     description: Rota de teste para confirmar se o backend está funcionando.
 *     responses:
 *       200:
 *         description: Servidor rodando com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Backend do EcoBalance está rodando!
 */
// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'Backend do EcoBalance está rodando!' });
});

// Importar rotas
const authRoutes = require('./routes/authRoutes');
const rotinaRoutes = require('./routes/rotinaRoutes');
const testeRoutes = require('./routes/testeRoutes');
const userRoutes = require('./routes/userRoutes');

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/rotinas', rotinaRoutes);
app.use('/api/testes', testeRoutes);
app.use('/api/users', userRoutes);

async function startServer() {
  await connectDB();
  app.listen(port, () => {
    const isProduction = process.env.NODE_ENV === 'production';
    const serverUrl = isProduction 
      ? process.env.PROD_API_URL || 'https://producao.com' // @PLACEHOLDER para a URL de produção futura
      : `http://localhost:${port}`;
      
    console.log(`🚀 Servidor rodando na porta ${port} (${isProduction ? 'Produção' : 'Desenvolvimento'})`);
    console.log(`Swagger UI disponível em ${serverUrl}/api-docs`);
  });
}

startServer();
