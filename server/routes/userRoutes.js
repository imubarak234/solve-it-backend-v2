const userControllerClass = require('../controllers/userController');
const express = require('express');
const auth = require('../middlewares/jwt');
const apiLimiter = require('../middlewares/rateLimiter');

const router = express.Router();

router.post("/signUpUser", apiLimiter, userControllerClass.createUser);
router.get("/getAllUsers", apiLimiter, userControllerClass.getUsers);
router.get("/getUserProfile/:id", apiLimiter, userControllerClass.getUserProfile);

module.exports = router;