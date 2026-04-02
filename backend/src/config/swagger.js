const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config();

// Define a URL base dependendo do ambiente
const isProduction = process.env.NODE_ENV === 'production';
const serverUrl = isProduction 
  ? process.env.PROD_API_URL || 'https://producao.com' // @PLACEHOLDER para a URL de produção futura
  : `http://localhost:${process.env.PORT || 3000}`;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API EcoBalance',
      version: '1.0.0',
      description: 'Documentação da API do backend EcoBalance',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    servers: [
      {
        url: serverUrl,
        description: isProduction ? 'Servidor de Produção' : 'Servidor Local',
      },
    ],
  },
  apis: ['./src/server.js', './src/routes/*.js'], // Caminhos para os arquivos com as anotações
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
