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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Post.findById(id)
        .then(post => {
            if (post === null || post === undefined) {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            } else {
                res.status(200).json(post);
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The post information could not be retrieved" });
        });
});

router.get('/:id/comments', (req, res) => {
    const { id } = req.params;
    Post.findById(id)
        .then(post => {
            if (post === null || post === undefined) {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            } else {
                Post.findPostComments(id)
                    .then(post => {
                        res.status(200).json(post);
                    })
                    .catch(() => {
                        res.status(500).json({ message: "The comments information could not be retrieved" });
                    });
                }
        })
        .catch(() => {
            res.status(500).json({ message: "The comments information could not be retrieved" });
    });
});

// [POST] requests
router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" });
    } else {
        Post.insert({ title, contents })
        .then(({ id }) => {
            return Post.findById(id);
        })
        .then(post => {
            res.status(201).json(post);
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error while saving the post to the database" });
        });
    }
});

// [PUT] requests
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" });
    } else {
        Post.findById(id)
            .then(post => {
                if (post === null | post === undefined) {
                    res.status(404).json({ message: "The post with the specified ID does not exist" });
                } else {
                    return Post.update(id, { title, contents });
                }
            })
            .then(data => {
                if (data) {
                    return Post.findById(id);
                }
            })
            .then(updated => {
                res.status(200).json(updated);
            })
            .catch()
    }
});

// [DELETE] requests
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Post.remove(id)
        .then(delPost => {
            if (delPost === null || delPost === undefined) {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            } else {
                res.status(200).json(delPost);
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The comments information could not be retrieved" });
        });
});

module.exports = router;