const postController = require('../controllers/postController');
const express = require('express');

const router = express.Router();

router.post('/createPost', postController.createPost);
router.post('/createPostCategory', postController.createPostCategory);
router.post('/createPostCommentReply', postController.createPostCommentReply);
router.post('/createPostComment', postController.createPostComments);
router.post('/createPostReaction', postController.createPostReaction);
router.post('/getPostElements', postController.getPostElements);
router.post('/deletePostElement', postController.deletePostElement);

module.exports = router;