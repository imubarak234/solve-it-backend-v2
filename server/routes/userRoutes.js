const userControllerClass = require('../controllers/userController');
const express = require('express');
const auth = require('../middlewares/jwt');
const apiLimiter = require('../middlewares/rateLimiter');

const router = express.Router();

router.post("/signUpUser", apiLimiter, userControllerClass.createUser);
router.post("/getAllUsers", apiLimiter, auth.verifyToken, userControllerClass.getUsers);
router.post("/getUserProfile", apiLimiter, auth.verifyToken, userControllerClass.getUsers);

module.exports = router;