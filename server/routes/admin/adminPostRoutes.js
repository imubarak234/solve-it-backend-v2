const adminPostsController = require('../../controllers/admin/adminPostController');
const express = require('express');
const auth = require('../../middlewares/jwt');
const apiLimiter = require('../../middlewares/rateLimiter');

const router = express.Router();

router.post('/createPost', apiLimiter, adminPostsController.createPost);
router.post('/deletePost', apiLimiter, adminPostsController.deletePost);
router.put('/updatePost', apiLimiter, adminPostsController.updatePost);

module.exports = router;
