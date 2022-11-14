const User = require("../models/User.model");
const debug = require("debug")("app:auth-controller");

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
      password: password
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
    return res.status(200).json({ message: "El usuario ha iniciado sesion" })
  } catch (error) {
    debug(error);
    return res.status(500).json({ error: "Error inesperado" })
  }
}

module.exports = controller;