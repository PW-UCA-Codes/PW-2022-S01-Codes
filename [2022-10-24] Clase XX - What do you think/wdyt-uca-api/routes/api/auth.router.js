const Express = require("express");
const router = Express.Router();

const authController = require("../../controllers/auth.controller");
const runValidations = require("../../validators/index.middleware");
const { registerValidator } = require("../../validators/auth.validators");
const { authentication } = require("../../middlewares/auth.middewares");

router.post("/signup",
  registerValidator,
  runValidations,
  authController.register
);

router.post("/signin", authController.login);

router.get("/whoami", authentication, authController.whoami);

module.exports = router;