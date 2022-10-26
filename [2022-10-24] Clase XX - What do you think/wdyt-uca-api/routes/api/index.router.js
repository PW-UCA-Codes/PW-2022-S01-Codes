const express = require("express");
const router = express.Router();

//importar todos los enrutadores
const postRouter = require("./post.router");

//Definir las rutas
router.use("/post", postRouter);

module.exports = router;