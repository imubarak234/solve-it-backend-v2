const joiObj = require('../utils/joi.js');
const funcObj = require('../utils/functions.js');
const auth = require('../middlewares/jwt.js');
const bcrypt = require('bcryptjs');
const sqlPackage = require('../config/mysql.js');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const crypto = require('crypto');


let userControllerClass = {};

dayjs.extend(utc);
dayjs.extend(timezone);

userControllerClass.createUser = async (req, res) => {

  try {

    const { error, value } = joiObj.createUserSchema.validate(req.body);
    
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { role_id, name, email, phone, dob, gender, school_id, password } = value;

    const userExist = await funcObj.getUserData("email", email);
        
    if(userExist) {
        return res.status(409).json({
            statusCode: 409,
            statusMessage: `User with email: ${email} exists`
        });
    }

    // .tz('Africa/Lagos').format('DD-MM-YYYY HH:mm:ss A')

    let tempPass = password ? password : Math.random().toString(36).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(tempPass, salt);

    let code = Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    // console.log(tempPass);
    const newUser = {
      role_id,
      name,
      email,
      phone,
      dob,
      gender,
      school_id,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
      password: hashedPassword,
      code,
    }

    // This db call is to the apps table creating the app with the provided details
    const result = await sqlPackage.insertData(newUser, "users")
    
    // This bit of the code sends a mail to the app being created with a default password
    let emailStatus = await funcObj.SendGridEmail();  

    return res.status(200).json({
        statusCode: 200,
        statusMessage: "User created successfully",
    })
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Errors"
    })
  }
}; 

userControllerClass.getUsers = async (req, res) => {

  try {

    const students = await sqlPackage.dbQuery.query(`SELECT * FROM users WHERE deleted_at IS NULL`);
    
    return res.status(200).json({
      status: 200,
      message: "Students retrieved successfully",
      data: students
    })
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    })
  }
}

userControllerClass.getUserProfile = async (req, res) => {

  try {

    const { id } = req.params;

    const user = await funcObj.getUserData("id", id);
    
    if(!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found"
      })
    }

    return res.status(200).json({
      status: 200,
      message: "User retrieved successfully",
      data: user
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    })
  }
};

module.exports = userControllerClass;