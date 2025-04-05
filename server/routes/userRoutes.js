const userControllerClass = require('../controllers/userController');
const express = require('express');
const auth = require('../middlewares/jwt');
const apiLimiter = require('../middlewares/rateLimiter');
const funcObj = require('../utils/functions');

const router = express.Router();

router.post("/signUpUser", apiLimiter, funcObj.upload.single("image"), userControllerClass.createUser);
router.get("/getAllUsers", apiLimiter, userControllerClass.getUsers);
router.get("/getUserProfile/:id", apiLimiter, userControllerClass.getUserProfile);
router.post("/createUserCategory", apiLimiter, userControllerClass.createUserCategory);
router.get("/getUserCategories", apiLimiter, userControllerClass.getUserCategories);
router.put("updateUserCategory", apiLimiter, userControllerClass.updateUserCategory);

module.exports = router;