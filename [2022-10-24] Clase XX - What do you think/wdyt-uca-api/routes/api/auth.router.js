const Express = require("express");
const router = Express.Router();

const authController = require("../../controllers/auth.controller");
const runValidations = require("../../validators/index.middleware");
const { registerValidator } = require("../../validators/auth.validators");

router.post("/signup",
  registerValidator,
  runValidations,
  authController.register
);

router.post("/signin", authController.login)

module.exports = router;