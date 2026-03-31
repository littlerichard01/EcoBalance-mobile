const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('❌ MONGO_URI não está definida nas variáveis de ambiente');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ Conectado com sucesso ao MongoDB Atlas via Mongoose');
  } catch (error) {
    console.error('❌ Erro na conexão com o MongoDB:', error);
    process.exit(1);
  }
}

module.exports = { connectDB };
