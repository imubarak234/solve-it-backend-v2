const schoolController = require('../../controllers/admin/schoolController');
const express = require('express');
const auth = require('../../middlewares/jwt');
const apiLimiter = require('../../middlewares/rateLimiter');

const router = express.Router();

router.post('/createSchool', apiLimiter, auth.verifyToken, schoolController.createSchool);
router.post('/createDepartment', apiLimiter, auth.verifyToken, schoolController.createDepartment);
router.post('/createLevel', apiLimiter, auth.verifyToken, schoolController.createLevel);
router.post('/createFaculty', apiLimiter, auth.verifyToken, schoolController.createFaculty);
router.post('/getSchoolElements', apiLimiter, schoolController.getSchoolElements);

module.exports = router;
