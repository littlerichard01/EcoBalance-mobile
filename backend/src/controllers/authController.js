const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Cadastro
const registerUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    //Verifica se já existe
    const userExists = await User.findOne({ email: String(email) });
    if (userExists) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    //Criptografia de senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    //Cria usuário
    const avatarSelecionado = Math.floor(Math.random() * 9) + 1;
    const user = new User({
      nome,
      email,
      senha: hashedPassword,
      avatarSelecionado
    });

    await user.save();

    return res.status(201).json({
      message: "Usuário criado com sucesso"
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Login
const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email: String(email) });
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ message: "Senha inválida" });
    }

    //Gerar token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login realizado com sucesso",
      token
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser
};
