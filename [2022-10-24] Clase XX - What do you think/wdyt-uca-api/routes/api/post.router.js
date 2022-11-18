const express = require("express");
const router = express.Router();

const ROLES = require("../../data/roles.constants.json");

const postController = require("../../controllers/post.controller");

const postValidators = require("../../validators/post.validators");
const runValidations = require("../../validators/index.middleware");

const { authentication, authorization } = require('../../middlewares/auth.middewares');

router.get("/", postController.findAll);
router.get("/:identifier",
    postValidators.findPostByIdValidator,
    runValidations,
    postController.findOneById);

//Funcionalidad de usuario
router.post("/",
    authentication,
    authorization(ROLES.USER),
    postValidators.createPostValidator,
    runValidations,
    postController.create);

module.exports = router;