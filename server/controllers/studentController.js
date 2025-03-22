const joiObj = require('../utils/joi.js');
const funcObj = require('../utils/functions.js');
const auth = require('../middlewares/jwt.js');
const bcrypt = require('bcryptjs');
const sqlPackage = require('../config/mysql.js');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const crypto = require('crypto');


dayjs.extend(utc);
dayjs.extend(timezone);

const studentControllerClass = {};

studentControllerClass.createStudent = async (req, res) => {

  try {

    const { error, value } = joiObj.createStudentSchema.validate(req.body);
        
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { role_id, name, email, phone, dob, gender, school_id, interests, faculty_id, department_id, level_id, password, matric_number, image } = value;

    // funcObj.upload.single("image")
    console.log(image)

    const studentData = await funcObj.getUserData("email", email, "students");
        
    if(studentData) {
        return res.status(409).json({
            statusCode: 409,
            statusMessage: `${email} exists`
        });
    }

    let tempPass = password ? password : Math.random().toString(36).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(tempPass, salt);

    let code = Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const imagePath = req?.file?.path || "";
    const newStudent = {
      role_id,
      name,
      email,
      phone,
      dob,
      gender,
      school_id,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
      interests,
      faculty_id,
      department_id,
      password: hashedPassword,
      code,
      level_id,
      dfsdasdeder: "Much",
      matric_number,
      avatar: imagePath
    }

    // This db call is to the apps table creating the app with the provided details
    const insertRes = await sqlPackage.insertData(newStudent, "students")
  
    
    // This bit of the code sends a mail to the app being created with a default password
    // let emailStatus = await funcObj.sendEmail({ email: app_id, subject: 'Account Creation | Solve it App', 
    //     message: funcObj.getTemplate(
    //         `An account has been created for you on the Solve It, Kindly use the details below to login
    //             <br />
    //             Email address: ${email} <br />
    //             Password: ${tempPass} <br />
    //             You will be prompted to reset password upon first login
    //         `,
    //     ) 
    // });

    return res.status(200).json({
        status: 200,
        message: "Student created successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
};

studentControllerClass.getStudents = async (req, res) => {

  try {

    const students = await sqlPackage.dbQuery.query(`SELECT * FROM students WHERE deleted_at IS NULL`);

    return res.status(200).json({
      status: 200,
      message: "Students retrieved successfully",
      data: students
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    })
  }
}

module.exports = studentControllerClass;