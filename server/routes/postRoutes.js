const postController = require('../controllers/postController');
const express = require('express');
const auth = require('../middlewares/jwt');
const apiLimiter = require('../middlewares/rateLimiter');

const router = express.Router();

router.post('/createPost', apiLimiter, postController.createPost);
router.post('/createPostCategory', apiLimiter, postController.createPostCategory);
router.post('/createPostCommentReply', apiLimiter, postController.createPostCommentReply);
router.post('/createPostComment', apiLimiter, postController.createPostComments);
router.post('/createPostReaction', apiLimiter, postController.createPostReaction);
router.post('/createPostCommentReaction', apiLimiter, postController.createPostCommentReaction);
router.post('/getPostElements', apiLimiter, postController.getPostElements);
router.post('/deletePostElement', apiLimiter, postController.deletePostElement);

module.exports = router;