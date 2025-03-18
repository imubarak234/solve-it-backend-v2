const postController = require('../controllers/postController');
const express = require('express');
const auth = require('../middlewares/jwt');
const apiLimiter = require('../middlewares/rateLimiter');

const router = express.Router();

router.post('/createPost', apiLimiter, auth.verifyToken, postController.createPost);
router.post('/createPostCategory', apiLimiter, auth.verifyToken, postController.createPostCategory);
router.post('/createPostCommentReply', apiLimiter, auth.verifyToken, postController.createPostCommentReply);
router.post('/createPostComment', apiLimiter, auth.verifyToken, postController.createPostComments);
router.post('/createPostReaction', apiLimiter, auth.verifyToken, postController.createPostReaction);
router.post('/getPostElements', apiLimiter, auth.verifyToken, postController.getPostElements);
router.post('/deletePostElement', apiLimiter, auth.verifyToken, postController.deletePostElement);

module.exports = router;