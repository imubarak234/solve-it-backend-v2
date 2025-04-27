const roleController = require('../../controllers/admin/roleController');
const express = require('express');
const auth = require('../../middlewares/jwt');
const apiLimiter = require('../../middlewares/rateLimiter');

const router = express.Router();

router.post('/createRole', apiLimiter, roleController.createRole);
router.post('/updateRole', apiLimiter, roleController.updateRole);
router.post('/createPermission', apiLimiter, roleController.createPermission);
router.post('/updatePermission', apiLimiter, roleController.updatePermission);
router.get('/getRoles', apiLimiter, roleController.getRoles);
router.get('/getPermissions', apiLimiter, roleController.getPermissions);
router.get('/getRolePermissions/:id', apiLimiter, roleController.getRolePermissions);
router.post('/mapRolePermissions', apiLimiter, roleController.mapRolePermission);

module.exports = router;