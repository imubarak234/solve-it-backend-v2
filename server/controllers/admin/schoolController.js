const joiObj = require('../../utils/joi.js');
const funcObj = require('../../utils/functions.js');
const sqlPackage = require('../../config/mysql.js')
const schoolSchema = require('../../utils/schemas/schoolSchemas.js');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const crypto = require('crypto');

let schoolControllerClass = {};

dayjs.extend(utc);
dayjs.extend(timezone);

schoolControllerClass.createSchool = async (req, res) => {
  try {

    const { error, value } = schoolSchema.createSchoolSchema.validate(req.body);
              
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { name, logo, code } = value;

    code = Boolean(code) ? code : Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const schoolData = await funcObj.getUserData("code", code, "news");
        
    if(schoolData) {
        return res.status(409).json({
            status: 409,
            message: `school with Code: ${code} exists`
        });
    }

    const newSchool = {
      name,
      logo: logo ? logo : "",
      code,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
    }

    const insertRes = await sqlPackage.insertData(newSchool, "schools");
    
    return res.status(200).json({
        statusCode: 200,
        statusMessage: "School created successfully",
    })
  }
  catch(err) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500
    })
  }
}

schoolControllerClass.createFaculty = async (req, res) => {
  try {

    const { error, value } = schoolSchema.createFacultySchema.validate(req.body);
              
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { name, school_id, code } = value;

    code = Boolean(code) ? code : Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const facultyData = await funcObj.getUserData("code", code, "faculties");
        
    if(facultyData) {
        return res.status(409).json({
            status: 409,
            message: `school with Code: ${code} exists`
        });
    }

    const newFaculty = {
      name,
      code,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
      school_id
    }

    const insertRes = await sqlPackage.insertData(newFaculty, "faculties");
    
    return res.status(200).json({
        statusCode: 200,
        statusMessage: "Faculty created successfully",
    })
  }
  catch(err) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500
    })
  }
};

schoolControllerClass.createDepartment = async (req, res) => {

  try {

    const { error, value } = schoolSchema.createDepartmentSchema.validate(req.body);
              
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { name, school_id, code, faculty_id } = value;

    code = Boolean(code) ? code : Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const departmentData = await funcObj.getUserData("code", code, "departments");
        
    if(departmentData) {
        return res.status(409).json({
            status: 409,
            message: `department with Code: ${code} exists`
        });
    }

    const newDepartment = {
      name,
      code,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
      school_id,
      faculty_id,
    }

    const insertRes = await sqlPackage.insertData(newDepartment, "departments");
    
    return res.status(200).json({
        statusCode: 200,
        statusMessage: "Department created successfully",
    });

  }
  catch(err) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500
    })
  }
};

schoolControllerClass.createLevel = async (req, res) => {

  try {

    const { error, value } = schoolSchema.createLevelSchema.validate(req.body);
              
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { name, school_id, code } = value;

    code = Boolean(code) ? code : Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const levelData = await funcObj.getUserData("code", code, "levels");
        
    if(levelData) {
        return res.status(409).json({
            status: 409,
            message: `level with Code: ${code} exists`
        });
    }

    const newLevel = {
      name,
      code,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
      school_id,
    }

    const insertRes = await sqlPackage.insertData(newLevel, "levels");
    
    return res.status(200).json({
        statusCode: 200,
        statusMessage: "Levels created successfully",
    });

  }
  catch(err) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500
    })
  }
}

schoolControllerClass.getSchoolElements = async (req, res) => {

  try {

    const { error, value } = schoolSchema.getSchoolElementsSchema.validate(req.body);
              
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { elementType } = value;

    let tableName = ""

    if(elementType == "Department"){ tableName = "departments" }
    else if(elementType == "Level") { tableName = "levels" }
    else if(elementType == "Faculty") { tableName = "faculties" }
    else if(elementType == "School") { tableName = "schools" }
    else { tableName = "schools" }

    const queryResponse = await sqlPackage.fetchData(tableName);

    return res.status(200).json({
      message: "Fetch Successful",
      status: 200,
      data: queryResponse
    });

  }
  catch(err) {
    return res.status(500).json({
      message: "Internal server Error",
      status: 500
    });
  }
};

module.exports = schoolControllerClass;