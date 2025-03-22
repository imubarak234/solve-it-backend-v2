const studentControllerClass = require('../controllers/studentController');
const express = require('express');
const auth = require('../middlewares/jwt');
const apiLimiter = require('../middlewares/rateLimiter');
const funcObj = require('../utils/functions');

const router = express.Router();



router.post('/signUpStudent', apiLimiter, funcObj.upload.single("image"), studentControllerClass.createStudent);
router.post('/getStudent', apiLimiter, studentControllerClass.getStudents);

module.exports = router;

