const joiObj = require('../utils/joi.js');
const funcObj = require('../utils/functions.js');
const auth = require('../middlewares/jwt.js');
const bcrypt = require('bcryptjs');
const sqlPackage = require('../config/mysql.js');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const crypto = require('crypto');

let authControllerClass = {};

dayjs.extend(utc);
dayjs.extend(timezone);

authControllerClass.loginEmail = async (req, res) => {
    try {
        // Validates the payload with a schema
        const { error, value } = joiObj.emailLoginSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: error.details
            });
        }

        let { email, password } = value;

        const userExist = await funcObj.getUserData("email", email);

        // console.log({ email, password });

        if(!userExist) {
            return res.status(404).json({
                status: 404,
                message: "Invalid email credentials user does not exist"
            });
        };

        if(!bcrypt.compareSync(password, userExist.password)){
            return res.status(404).json({
                status: 404,
                message: "Invalid domain credentials password"
            });
        };

        // The token is generated

        const authToken = auth.generateToken({ user_id: userExist.id });

        // let payload = JSON.stringify({})

        return res.status(200).json({
            status: 200,
            message: "Login successful",
            token: authToken
        })

    }
    catch (err){
        return res.status(500).json({
            status: 500,
            message: String(err)
        })
    }
};

authControllerClass.loginPhone = async (req, res) => {

  try {

    // Validates the payload with a schema
    const { error, value } = joiObj.phoneLoginSchema.validate(req.body);

    if(error) {
        return res.status(400).json({
            statusCode: 400,
            statusMessage: error.details
        });
    }

    let { phone, password } = value;

    const userExist = await funcObj.getUserData("phone" ,phone);

    // Necessary checks if the app id and password match
    if(!userExist) {
        return res.status(404).json({
            statusCode: 404,
            statusMessage: "Invalid domain credentials exists"
        });
    };

    if(!bcrypt.compareSync(password, userExist.password)){
        return res.status(404).json({
            statusCode: 404,
            statusMessage: "Invalid domain credentials password"
        });
    };

    // The token is generated
    const authToken = auth.generateToken({ user_id: userExist.user_id });
    
    // let payload = JSON.stringify({})

    return res.status(200).json({
        statusCode: 200,
        statusMessage: "Login successful",
        token: authToken
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err),
    });
  }
};

authControllerClass.resendToken = async (req, res) => {
  try {

    // Validates the payload with a schema
    const { error, value } = joiObj.resendTokenSchema.validate(req.body);

    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { email } = value;

    const userExist = await funcObj.getUserData("email" ,email);

    // Necessary checks if the app id and password match
    if(!userExist) {
        return res.status(404).json({
            statusCode: 404,
            statusMessage: "User Not Found"
        });
    };

    return res.status(200).json({
      status: 200,
      message: "Token Resent Not Implemented"
    });
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err),
    })
  }
};

authControllerClass.verifyEmail = async (req, res) => {

  try{

    // Validates the payload with a schema
    const { error, value } = joiObj.emailVerify.validate(req.body);

    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { email, token } = value;

    const userExist = await funcObj.getUserData("email" ,email);

    const tokenData = await sqlPackage.fetchData("otps", token, "code", true);

    if(userExist?.id != tokenData?.user_id) return res.status(400).json({
      status: 400,
      message: "opt not found in opt table"
    });
    
    // Necessary checks if the app id and password match
    if(!userExist) {
      return res.status(404).json({
          statusCode: 404,
          statusMessage: "User Not Found"
      });
    };

    if(!funcObj.isExpired(tokenData)) {
      return res.status(400).json({
        status: 400,
        message: "OTP Expired"
      })
    }

    // The token is generated
    const authToken = auth.generateToken({ user_id: userExist.user_id });

    res.status(200).json({
        status: true,
        message: 'Email Verified Successfully',
        token: authToken,
    })

    // remember_token

  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    })
  }
};

authControllerClass.forgottenPassword = async (req, res) => {

  try {

    // Validates the payload with a schema
    const { error, value } = joiObj.resendTokenSchema.validate(req.body);

    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { email } = value;

    const userExist = await funcObj.getUserData("email" ,email);

    // Necessary checks if the app id and password match
    if(!userExist) {
        return res.status(404).json({
            statusCode: 404,
            statusMessage: "User Not Found"
        });
    };

    let tempPass = Math.random().toString(36).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(tempPass, salt);

    await sqlPackage.dbQuery.query(`UPDATE users SET password = ${hashedPassword} WHERE id = ${userExist?.id}`);

    let emailStatus = await funcObj.sendEmail({ email: username, subject: 'Forget Password | Solve It App', 
        message: funcObj.getTemplate(
            `Your Password has been reset successfully
                <br />
                Email address: ${email} <br />
                Temporary Password: ${tempPass} <br />
                You will be prompted to reset password upon first login
            `,
        )
    })

    return res.status(200).json({
      status: 200,
      message: "User password reset",
      emailStatus,
    });

  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    });
  }
};

authControllerClass.resetPassword = async(req, res) => {
  try {

    // Validates the payload with a schema
    const { error, value } = joiObj.passwordReset.validate(req.body);

    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { email, oldPassword, newPassword  } = value;

    const userExist = await funcObj.getUserData("email" ,email);

    // Necessary checks if the app id and password match
    if(!userExist) {
        return res.status(404).json({
            statusCode: 404,
            statusMessage: "User Not Found"
        });
    };

    if(userExist?.password != oldPassword) return res.status(400).json({
      status: 400,
      message: "Old Password not correct"
    })
    
    let tempPass = Math.random().toString(36).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(tempPass, salt);

    await sqlPackage.dbQuery.query(`UPDATE users SET password = ${hashedPassword} WHERE id = ${userExist?.id}`);

    let emailStatus = await funcObj.sendEmail({ email: username, subject: 'Reset Password | Solve It App', 
        message: funcObj.getTemplate(
            `Your Password has been reset successfully
                <br />
                Email address: ${email} <br />
                Temporary Password: ${tempPass} <br />
                You will be prompted to reset password upon first login
            `,
        )
    })

    return res.status(200).json({
      status: 200,
      message: "User password reset",
      emailStatus,
    });


  }
  catch(err){
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};



module.exports = authControllerClass;