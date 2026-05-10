const dotenv = require('dotenv');
dotenv.config();

const dns = require('node:dns');
const dnsServers = (process.env.DNS_SERVERS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
if (dnsServers.length > 0) dns.setServers(dnsServers);

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./database/connection');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { startTesteReminderJob } = require('./jobs/testeReminderJob');

const app = express();
app.disable('x-powered-by');
const port = process.env.PORT || 3000;

const isProduction = process.env.NODE_ENV === 'production';
const serverUrl = isProduction
  ? process.env.PROD_API_URL || 'https://producao.com'
  : `http://localhost:${port}`;

let prodOrigin = null;
if (isProduction && process.env.PROD_API_URL) {
  try {
    prodOrigin = new URL(process.env.PROD_API_URL).origin;
  } catch {
    prodOrigin = null;
  }
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!isProduction) return callback(null, true);
      if (!origin) return callback(null, true);
      if (!prodOrigin) return callback(null, false);
      return callback(null, origin === prodOrigin);
    },
  })
);
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
  startTesteReminderJob();
  app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port} (${isProduction ? 'Produção' : 'Desenvolvimento'})`);
    console.log(`Swagger UI disponível em ${serverUrl}/api-docs`);
  });
}

startServer();
