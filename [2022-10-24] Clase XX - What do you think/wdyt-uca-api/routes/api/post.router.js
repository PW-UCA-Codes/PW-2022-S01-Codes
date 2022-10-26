const express = require("express");
const router = express.Router();

const posts = require('../../data/posts.example.json');

router.get("/", (req, res, next) => {
    return res.status(200).json({ posts });
});

router.get("/:identifier", (req, res) => {
    const id = req.params.identifier;

    const post = posts.find(p => p.id === id);

    if(!post) {
        return res.status(404)
            .json({ error: "Post no encontrado" })
    }

    return res.status(200).json(post);
})

module.exports = router;