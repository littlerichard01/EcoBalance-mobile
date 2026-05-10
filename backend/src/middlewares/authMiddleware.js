const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  //Se não tiver token
  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  //Pega o token (remove "Bearer ")
  const token = authHeader.split(" ")[1];

  try {
    //Verifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Salva dados do usuário
    req.user = decoded;

    let userId = decoded?.id || decoded?._id || decoded?.userId;

    if (!userId && decoded?.email) {
      const user = await User.findOne({ email: decoded.email }).select("_id");
      if (user) {
        userId = String(user._id);
      }
    }

    if (!userId) {
      return res.status(401).json({ message: "Token inválido ou sem identificação do usuário" });
    }

    req.authUserId = String(userId);

    next(); //Continua pra rota

  } catch (error) {
    console.warn("Falha na verificação do token", error?.name || "");
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = authMiddleware;
