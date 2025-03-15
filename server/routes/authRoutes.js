const authController = require('../controllers/authController');
const express = require('express');

const router = express.Router();

router.post('/loginEmail', authController.loginEmail);
router.post('/loginPhone', authController.loginPhone);
router.post('/resendToken', authController.resendToken);
router.post('/verifyEmail', authController.verifyEmail);
router.post('/forgottenPassword', authController.forgottenPassword);
router.post('/resetPassword', authController.resetPassword);

module.exports = router;