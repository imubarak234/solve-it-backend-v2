const walletsController = require('../controllers/walletController');
const express = require('express');
const auth = require('../middlewares/jwt');
const apiLimiter = require('../middlewares/rateLimiter');
const funcObj = require('../utils/functions');

const router = express.Router();

router.post('/createBankAccount', apiLimiter, walletsController.createBankAccount);
router.put('/updateBankAccount', apiLimiter, walletsController.updateBankAccount);
router.get('/getBankAccounts', apiLimiter, walletsController.getBankAccounts);
router.put('/deleteBankAccount/:id', apiLimiter, walletsController.deleteBankAccount);
router.put('/updateWalletBalance', apiLimiter, walletsController.updateWalletBalance);   
router.get('/getWallets', apiLimiter, walletsController.getWallets);
router.post('/createWallet', apiLimiter, walletsController.createWallet);

module.exports = router;