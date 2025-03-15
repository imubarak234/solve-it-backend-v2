const schoolController = require('../../controllers/admin/schoolController');
const express = require('express');

const router = express.Router();

router.post('/createSchool', schoolController.createSchool);
router.post('/createDepartment', schoolController.createDepartment);
router.post('/createLevel', schoolController.createLevel);
router.post('/createFaculty', schoolController.createFaculty);
router.post('/getSchoolElements', schoolController.getSchoolElements);

module.exports = router;
