const studentControllerClass = require('../controllers/studentController');
const express = require('express');

const router = express.Router();

router.post('/signUpStudent', studentControllerClass.createStudent);

module.exports = router;

