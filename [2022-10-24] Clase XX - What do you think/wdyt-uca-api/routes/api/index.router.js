const express = require("express");
const router = express.Router();

//importar todos los enrutadores
const postRouter = require("./post.router");
const authRouter = require("./auth.router");

//Definir las rutas
router.use("/auth", authRouter);
router.use("/post", postRouter);

module.exports = router;