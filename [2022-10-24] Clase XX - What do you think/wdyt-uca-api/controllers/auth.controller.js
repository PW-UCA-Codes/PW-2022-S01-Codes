const User = require("../models/User.model");
const debug = require("debug")("app:auth-controller");
const ROLES = require("../data/roles.constants.json");

const { createToken, verifyToken } = require("../utils/jwt.tools");

const controller = {};

controller.register = async (req, res) => {
  try {
    //Paso 01: Obtener los datos del usuario -> Req -> body
    const { username, email, password } = req.body;

    //Paso 02: Verificar que el username o el email estén libres
    const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

    if (user) {
      return res.status(409).json({ error: "Este usuario ya existe" });
    }

    //debug({ username, email, password })
    //Paso 03: Encriptar? No puedo guardar una contraseña tal cual
    //Paso 04: Guardar mi usuario

    const newUser = new User({
      username: username,
      email: email,
      password: password,
      roles: [ROLES.USER]
    })

    await newUser.save();

    return res.status(201).json({ message: "Usuario creado con éxito!" })
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error inesperado" })
  }
}

controller.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    //Paso 01: Verificar si el usuario existe
    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });

    if (!user) {
      return res.status(404).json({ error: "El usuario no existe" });
    }

    //Paso 02: Comparar las contraseñas
    if (!user.comparePassword(password)) {
      return res.status(401).json({ error: "Contraseña no coincide" });
    }

    //Paso 03: Loggearlo
    const token = createToken(user._id);
    user.tokens = [token, ...user.tokens.filter(_token => verifyToken(_token)).splice(0, 4)];

    await user.save();

    //Paso 04: Registrar los tokens de usuario

    return res.status(200).json({ token: token });
  } catch (error) {
    debug(error);
    return res.status(500).json({ error: "Error inesperado" })
  }
}

module.exports = controller;