const studentControllerClass = require('../controllers/studentController');
const express = require('express');
const auth = require('../middlewares/jwt');
const apiLimiter = require('../middlewares/rateLimiter');

const router = express.Router();



router.post('/signUpStudent', apiLimiter, auth.verifyToken, studentControllerClass.createStudent);

module.exports = router;

