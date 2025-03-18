const adminPostsController = require('../../controllers/admin/adminPostController');
const express = require('express');
const auth = require('../../middlewares/jwt');
const apiLimiter = require('../../middlewares/rateLimiter');

const router = express.Router();

router.post('/createPost', apiLimiter, auth.verifyToken, adminPostsController.createPost);
router.post('/deletePost', apiLimiter, auth.verifyToken, adminPostsController.deletePost);
router.put('/updatePost', apiLimiter, auth.verifyToken, adminPostsController.updatePost);

module.exports = router;
