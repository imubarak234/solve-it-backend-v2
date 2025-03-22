const roleController = require('../../controllers/admin/roleController');
const express = require('express');
const auth = require('../../middlewares/jwt');
const apiLimiter = require('../../middlewares/rateLimiter');

const router = express.Router();

router.post('/createRole', apiLimiter, auth.verifyToken, roleController.createRole);
router.post('/updateRole', apiLimiter, auth.verifyToken, roleController.updateRole);
router.post('/createPermission', apiLimiter, auth.verifyToken, roleController.createPermission);
router.post('/updatePermission', apiLimiter, auth.verifyToken, roleController.updatePermission);
router.get('/getRoles', apiLimiter, roleController.getRoles);
router.get('/getPermissions', apiLimiter, roleController.getPermissions);

module.exports = router;