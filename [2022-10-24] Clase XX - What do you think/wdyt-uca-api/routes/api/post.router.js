const express = require("express");
const router = express.Router();

const postController = require("../../controllers/post.controller");

const postValidators = require("../../validators/post.validators");
const runValidations = require("../../validators/index.middleware");

const { authentication } = require('../../middlewares/auth.middewares');

router.get("/", postController.findAll);
router.get("/:identifier",
    postValidators.findPostByIdValidator,
    runValidations,
    postController.findOneById);

router.post("/",
    authentication,
    postValidators.createPostValidator,
    runValidations,
    postController.create);

module.exports = router;