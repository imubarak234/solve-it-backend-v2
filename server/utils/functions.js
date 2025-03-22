// import { pgQuery } from '../config/pg.js';
const db = require('../config/pg.js');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const env = require('../env.js');
const mssql = require('../config/mssql.js');
// var format = require('pg-format');
const moment = require('moment');
const aws = require("@aws-sdk/client-ses");
const { get } = require('https');
const sqlPackage = require('../config/mysql.js')
// import { getAllInstitution } from '../controllers/request.js';
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const { table } = require('console');
const sgMail = require('@sendgrid/mail')
const multer = require("multer");
const path = require("path");
const fs = require("fs");

let funcObj = {};

dayjs.extend(utc);
dayjs.extend(timezone);

sgMail.setApiKey(env?.sendgrid_api_key)



funcObj.getAppDetails = (app_id) => {
    return new Promise(async (resolve, reject) => {
        await db.pgQuery("SELECT * FROM portfolio_api.apps WHERE app_id= $1", [app_id])
        .then(result => {
            resolve(result[0]);
        }).catch(err => {
            reject(err);
        });
    });
};

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = "uploads/";
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

funcObj.upload = multer({ storage });

funcObj.getUserData = async (column, value, tableName = "users") => {
    return await new Promise(async (resolve, reject) => {
        try {
            const [row] = await sqlPackage.dbQuery.query(`SELECT * FROM ${tableName} WHERE ?? = ?`, [column, value]);
            resolve(row[0]);
        }
        catch(err) {
            reject(err);
        }
    });
};

funcObj.isExpired = (dateTime) => {

    const inputDate = dayjs(dateTime);

    const currentDate = dayjs();

    return inputDate.isBefore(currentDate);
};

funcObj.checkEmailStructure = (email) => {
    // Regular expression pattern for validating email structure
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    // Test the email input against the pattern
    return emailPattern.test(email)
}

/**
   * Get Property Value
   * @param {object} propName
   * @returns {object} Property Response
*/
const getPropertyValue = async (propName) => {
    const getAppPropsQuery = "SELECT \"PROP_VALUE\" FROM portfolio_api.app_properties where \"PROP_NAME\" = $1";
    const values = [
        propName
    ];
    try {
        const res = await db.pgQuery(getAppPropsQuery, values);

        const dbResponse = res[0];
        return dbResponse.PROP_VALUE;
    } catch (error) {
        return 'Error Retrieving Property Value. Reason: ' + String(error);
    }
}

funcObj.SendGridEmail = async () => {
    try {

        const msg = {
            to: 'm.bthedon@yahoo.com', // Change to your recipient
            from: 'imubarak2424@gmail.com', // Change to your verified sender
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        
        const response = await sgMail.send(msg);

        console.log(response, 'Email sent')
    }
    catch(err){
        console.error(err)
        throw err;
    }
}

funcObj.sendEmail = async ({ email, subject, message, html, documents = [] }) => {
    return new Promise(async (resolve, reject) => {
        try { 
            const docs = documents.map((doc) => {
                return { filename: doc.title + '.pdf', path: doc.file }
            });
            let transport = nodemailer.createTransport({
                SES: {
                    ses: new aws.SES({
                        region: await getPropertyValue('AWS_SES_REGION'),
                        credentials: {
                            accessKeyId: await getPropertyValue('AWS_SES_ACCESS_KEY_ID'),
                            secretAccessKey: await getPropertyValue('AWS_SES_SECRET_ACCESS_KEY'),
                        }
                    }),
                    aws
                }
            });
            const htmlMessage = message;
            const msg = {
                from: await getPropertyValue('EMAIL_FROM'),
                to: email.trim(),
                subject: subject,
                html: htmlMessage,
                attachments: [ ...docs ]
            };

            await transport.sendMail(msg, function (err, info) {
                if (err) {
                    console.log('failed to send email to ' + email + ' ' + String(err))
                    // reject(err)
                    reject({ message: 'failed to send email to ' + email, error: err })
                } else {
                    resolve(info);
                }
            });
        } catch (error) {
            console.log(error)
            reject(String(error))
        } 
    })
};


funcObj.getTemplateTwo = (code, userName) => {
    return `
    <body
    style="
      font-family: Arial, sans-serif;
      background-color: #901952;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    "
  >
    <div
      style="
        width: 100%;
        max-width: 400px;
        text-align: center;
        color: #ffffff;
        padding: 20px;
      "
    >
      <!-- Logo Section -->
      <img
        src="https://res.cloudinary.com/dnz4clv0s/image/upload/v1731054576/ankp7ojqdnngneotrbao.png"
        alt="SolveIT Logo"
        style="width: 100px; margin-bottom: 20px"
      />

      <!-- OTP Request Box -->
      <div
        style="
          background-color: #ffffff;
          color: #333333;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
        "
      >
        <h2 style="font-size: 24px; margin: 0">OTP Request</h2>
        <p style="font-size: 14px; margin: 10px 0">Hello, ${userName},</p>
        <p style="font-size: 14px; margin: 10px 0">
          We received your request for a one-time-use code to use with your
          Solve-IT account.
        </p>
        <div
          style="
            font-size: 24px;
            color: #901952;
            font-weight: bold;
            padding: 10px;
            border: 1px solid #901952;
            border-radius: 5px;
            display: inline-block;
            margin: 10px 0;
          "
        >
          ${code}
        </div>
        <p style="font-size: 12px; margin: 10px 0">
          If you didn’t request this code, you can safely ignore this email.
          Someone else might have typed your email address by mistake.
        </p>
      </div>

      <!-- App Download Section -->
      <div
        style="
          background-color: #ffffff;
          color: #333333;
          padding: 20px;
          border-radius: 10px;
        "
      >
        <h2 style="font-size: 18px; margin: 0">Get the Solve-IT app!</h2>
        <p style="font-size: 12px; margin: 10px 0">
          Help students find suitable lodging options near their universities.
        </p>
        <div style="display: flex; justify-content: center; gap: 10px">
          <img
            src="https://res.cloudinary.com/dnz4clv0s/image/upload/v1731054684/k2qw49g21qvmdzflf4io.png"
            alt="Google Play"
            style="width: 120px"
          />
          <img
            src="https://res.cloudinary.com/dnz4clv0s/image/upload/v1731054793/cetdlgfukaujmfowqn8g.png"
            alt="App Store"
            style="width: 120px"
          />
        </div>
      </div>

      <!-- Footer Section -->
      <div style="margin-top: 20px">
        <a href="#" style="color: #ffffff; margin: 0 10px"
          ><img src="https://res.cloudinary.com/dnz4clv0s/image/upload/v1731054946/g06cowuvadihsanla5t8.png" alt="Facebook" style="width: 24px"
        /></a>
        <a href="#" style="color: #ffffff; margin: 0 10px"
          ><img src="https://res.cloudinary.com/dnz4clv0s/image/upload/v1731054993/dpt5yxcipk4wjq5koczy.png" alt="LinkedIn" style="width: 24px"
        /></a>
        <a href="#" style="color: #ffffff; margin: 0 10px"
          ><img src="https://res.cloudinary.com/dnz4clv0s/image/upload/v1731055023/wklmh0xsnhudzxbpg7fo.png" alt="Instagram" style="width: 24px"
        /></a>
      </div>

      <p style="font-size: 12px; color: #ffffff; margin-top: 10px">
        &copy; 2024
      </p>
    </div>
  </body>`
} 

funcObj.hashPassword = (str) => {
    if(typeof(str) == 'string' && str.length > 0){
        let hash = crypto.createHmac('sha256', env.jwt_secret).update(str).digest('hex');
        return hash;
    }
    else {
        return false
    }
};

funcObj.comparePassword = (hashpass, password) => {
    return Boolean(funcObj.hashPassword(password) === hashpass)
}

funcObj.passwordValidation = (str) => {

    let isEightCharacters = str.length >= 8 ? true : false;
    let regexCheck = /[^A-Za-z0-9_ ]/g;
    let isUpperCase = false;
    let isLowerCase = false;
    let isNumber = false;
    let isSpecialNumber = regexCheck.test(str);
  
    let strArray = str.split('');
    let nums = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ]
  
    for(let x = 0; x < strArray.length; x++){
  
      if(strArray[x] === strArray[x].toUpperCase())
      isUpperCase = true;
  
      if(strArray[x] === strArray[x].toLowerCase())
      isLowerCase = true;
  
      if(nums.indexOf(strArray[x]) >= 0)
      isNumber = true;
    }
  
    let errors = `${!isEightCharacters ? "The characters should be at least 8 characters long," : ""} ${!isUpperCase ? "The password needs one uppercase," : ""} ${!isLowerCase ? "The password should have at least one lowercase," : ""} ${!isNumber ? "The password should have at least one number," : ""} ${!isSpecialNumber ? "The password should contain at least one special character" : ""}`
  
    return {
      status: Boolean(isEightCharacters && isUpperCase && isLowerCase && isNumber && isSpecialNumber) ? "Valid" : "Invalid",
      errorMessage: errors
    }
  }

  

module.exports = funcObj;