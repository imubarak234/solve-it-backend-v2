const chatController = require('../controllers/chatController');
const apiLimiter = require('../middlewares/rateLimiter');
const express = require('express');

const router = express.Router();

router.post('/getChatsByIds', apiLimiter, chatController.getChatsByIds);