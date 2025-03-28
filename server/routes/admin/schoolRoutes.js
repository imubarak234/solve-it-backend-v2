const schoolController = require('../../controllers/admin/schoolController');
const express = require('express');
const auth = require('../../middlewares/jwt');
const apiLimiter = require('../../middlewares/rateLimiter');

const router = express.Router();

router.post('/createSchool', apiLimiter, schoolController.createSchool);
router.post('/createDepartment', apiLimiter, schoolController.createDepartment);
router.post('/createLevel', apiLimiter, schoolController.createLevel);
router.post('/createFaculty', apiLimiter, schoolController.createFaculty);
router.post('/getSchoolElements', apiLimiter, schoolController.getSchoolElements);

module.exports = router;
