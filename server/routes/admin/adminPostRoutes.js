const adminPostsController = require('../../controllers/admin/adminPostController');
const express = require('express');

const router = express.Router();

router.post('/createPost', adminPostsController.createPost);
router.post('/deletePost', adminPostsController.deletePost);
router.put('/updatePost', adminPostsController.updatePost);

module.exports = router;
