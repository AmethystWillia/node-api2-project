// implement your posts router here
const { Router } = require('express');
const router = Router();
const Post = require('./posts-model');

// [GET] requests
router.get('/', (req, res) => {
    Post.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(() => {
            res.status(500).json({ message: "The posts information could not be retrieved" });
        });
});

module.exports = router;