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

let funcObj = {};

dayjs.extend(utc);
dayjs.extend(timezone);

sgMail.setApiKey(env?.sendgrid_api_key)

// Get admin details by username
funcObj.getAdminDetails = (username) => {
    return new Promise(async (resolve, reject) => {
        await db.pgQuery("SELECT * FROM portfolio_api.admins WHERE username= $1", [username])
        .then(result => {
            resolve(result[0]);
        }).catch(err => {
            reject(err);
        });
    });
};

funcObj.getInstitutionDetails = (inst_code) => {
    return new Promise(async (resolve, reject) => {
        await db.pgQuery("SELECT * FROM portfolio_api.institutions WHERE inst_code= $1", [inst_code])
        .then(result => {
            resolve(result[0]);
        }).catch(err => {
            reject(err);
        });
    });
};

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
        // console.log(getAppPropsQuery, values);
        const res = await db.pgQuery(getAppPropsQuery, values);

        // console.log(res)
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

funcObj.getTemplate = (message = '', action = null) => {
    return `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:Arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
            <head>
                <meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport">
                <meta name="x-apple-disable-message-reformatting">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta content="telephone=no" name="format-detection">
                <title>New email template 2021-02-21</title> 
                <!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]--> <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
                <!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]-->
                <style type="text/css">
                    #outlook a {    padding:0;}.ExternalClass { width:100%;}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {  line-height:100%;}.es-button {  mso-style-priority:100!important;   text-decoration:none!important;}
                    a[x-apple-data-detectors] { color:inherit!important;    text-decoration:none!important; font-size:inherit!important;    font-family:inherit!important;  font-weight:inherit!important;  line-height:inherit!important;}.es-desk-hidden {    display:none;   float:left; overflow:hidden;    width:0;    max-height:0;   line-height:0;  mso-hide:all;}
                    @media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:30px!important } h2 a { font-size:26px!important } h3 a { font-size:20px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, 
                    .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width: 55px !important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-width:10px 20px 10px 20px!important } }
                </style>
            </head>
            <body style="width:100%;font-family:Arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
                <div class="es-wrapper-color" style="background-color:#555555"> 
                    <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#555555"></v:fill> </v:background><![endif]-->
                    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
                        <tr style="border-collapse:collapse">
                            <td valign="top" style="padding:0;Margin:0">
                                <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                                    <tr style="border-collapse:collapse">
                                        <td align="center" style="padding:0;Margin:0">
                                            <table class="es-content-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#F8F8F8;width:600px">
                                                <tr style="border-collapse:collapse">
                                                    <td style="Margin:0;padding-left:10px;padding-right:10px;padding-top:20px;padding-bottom:20px;background-color:#03a54f" bgcolor="#191919" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr style="border-collapse:collapse">
                                                                <td valign="top" align="center" style="padding:0;Margin:0;width:580px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr style="border-collapse:collapse">
                                                                            <td align="center" style="padding:0;Margin:0;font-size:0;width:55px">
                                                                                <a target="_blank" href="#" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Arial, sans-serif;font-size:14px;text-decoration:none;color:#3CA7F1;width:55px">
                                                                                    <img class="adapt-img" src="https://upload.wikimedia.org/wikipedia/en/d/d2/Central_Bank_of_Nigeria_%28emblem%29.png?20100926042746" alt width="55" height="60" style="border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                                                                                </a>
                                                                            </td>
                                                                        </tr>
                                                                        <tr style="border-collapse:collapse">
                                                                            <td align="center" style="padding:0;Margin:0;font-size:0">
                                                                                <h2 style="display:inline;Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:Arial, sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#fff">
                                                                                    <span style="font-size:20px">
                                                                                        <strong>ECCI Portfolio APIs</strong>
                                                                                    </span>
                                                                                    <br>
                                                                                </h2>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr style="border-collapse:collapse">
                                                    <td style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-color:#fff" bgcolor="#ffcc99" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr style="border-collapse:collapse">
                                                                <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr style="border-collapse:collapse">
                                                                            <td style="padding:0;Margin:0;padding-left:10px">
                                                                                <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#242424">
                                                                                    ${message}
                                                                                    <br>
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                        ${
                                                                            action ?
                                                                            `
                                                                                <tr style="border-collapse:collapse">
                                                                                    <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px">
                                                                                        <span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#191919 none repeat scroll 0% 0%;border-width:0px;display:inline-block;border-radius:20px;width:auto">
                                                                                            
                                                                                            ${
                                                                                                action ?
                                                                                                ` 
                                                                                                    <a href="${action.link}" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'lucida sans unicode', 'lucida grande', sans-serif;font-size:18px;color:#FFFFFF;border-style:solid;border-color:#191919;border-width:10px 35px;display:inline-block;background:#191919 none repeat scroll 0% 0%;border-radius:20px;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center">
                                                                                                        ${action.label}
                                                                                                    </a>
                                                                                                `
                                                                                                :
                                                                                                ''
                                                                                            }
                                                                                        </span>
                                                                                    </td>
                                                                                </tr>
                                                                            `
                                                                            :
                                                                            ''
                                                                        }
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr style="border-collapse:collapse">
                                                    <td style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px;background-color:#F8F8F8" bgcolor="#f8f8f8" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr style="border-collapse:collapse">
                                                                <td valign="top" align="center" style="padding:0;Margin:0;width:580px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr style="border-collapse:collapse">
                                                                            <td bgcolor="#f8f8f8" align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:20px;padding-bottom:13px;font-size:0">
                                                                                <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                                    <tr style="border-collapse:collapse">
                                                                                        <td style="padding:0;Margin:0;border-bottom:1px solid #191919;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px">
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr style="border-collapse:collapse">
                                                                            <td align="center" style="padding:0;Margin:0;padding-left:10px;padding-bottom: 10px">
                                                                                <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#222">
                                                                                    <a href="#" style=" color:#000;mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'lucida sans unicode', 'lucida grande', sans-serif;display:inline-block;font-weight:normal;font-style:normal;">Home</a>
                                                                                    <br>
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                                    <tr style="border-collapse:collapse">
                                        <td align="center" style="padding:0;Margin:0">
                                            <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#03a54f;width:600px">
                                                <tr style="border-collapse:collapse">
                                                    <td align="left" style="padding:20px;Margin:0">
                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr style="border-collapse:collapse">
                                                                <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr style="border-collapse:collapse">
                                                                            <td align="center" style="padding:0;Margin:0;display:none"></td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr style="border-collapse:collapse">
                                                                <td align="center" style="padding:0;Margin:0;padding-left:10px">
                                                                    <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#222">
                                                                            &copy; ${new Date().getFullYear()} <a style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'lucida sans unicode', 'lucida grande', sans-serif;display:inline-block;font-weight:normal;font-style:normal;">ECCI Portfolio APIs</a> | All rights reserved | Powered by ITD AMD
                                                                        <br>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                                    <tr style="border-collapse:collapse">
                                        <td align="center" style="padding:0;Margin:0">
                                            <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
                                                <tr style="border-collapse:collapse">
                                                    <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr style="border-collapse:collapse">
                                                                <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr style="border-collapse:collapse">
                                                                            <td align="center" style="padding:0;Margin:0;display:none"></td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </body>
        </html>
   ` 
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

funcObj.getRecords = () => {
    return new Promise(async (resolve, reject) => {
        await mssql.msQuery('SELECT * FROM production.eCCI_sample_data')
        .then(result => {
            console.log("Records Pull Successful " + moment().format("YYYY-MM-DD HH:mm:ss"))
            resolve(result);
        }).catch(err => {
            console.log(String(err))
            reject(err);
        });
    });
};



funcObj.bulkToDB = (list) => {
    return new Promise(async (resolve, reject) => {
        await db.pgQuery("TRUNCATE TABLE portfolio_api.request_data RESTART IDENTITY")
        .then(result => {
            console.log("DB has been flushed " + moment().format("YYYY-MM-DD HH:mm:ss"))
            //console.log()
        }) .catch (err => {
            console.log(String(err) + " " + moment().format("YYYY-MM-DD HH:mm:ss"))
        })
        let queries = [];

        if(list?.length > 0){
            for (let i = 0; i < list.length; i++){
                queries.push([list[i]["CCINumber"], list[i]["Purpose"], list[i]["CapitalType"], list[i]["CurrencyUSDEquivalent"], list[i]["NGNAmount"], list[i]["LoanBalance"], list[i]["InflowDate"], list[i]["TypeName"], list[i]["ClientName"], list[i]["Address"], list[i]["BeneficiaryCode"], list[i]["SectorName"], list[i]["StateName"], list[i]["InstCode"]])
            }
        };

        // console.log(queries);
        const queriesJoined = format('INSERT INTO portfolio_api.request_data ("CCINumber", "Purpose", "CapitalType", "CurrencyUSDEquivalent", "NGNAmount", "LoanBalance", "InflowDate", "TypeName", "ClientName", "Address", "BeneficiaryCode", "SectorName", "StateName", "InstCode") VALUES %L', queries);

        if(queries.length > 0){
            await db.pgQuery(queriesJoined)
            .then(result => {
                console.log("Bulk Upload to db Successful " + moment().format("YYYY-MM-DD HH:mm:ss"))
                resolve("successful")
            }).catch(err => {
                console.log(String(err) + " " + moment().format("YYYY-MM-DD HH:mm:ss"))
                reject(err)
            })
        }
        else {
            reject("No entries submitted")
        }
    });
};

// Function that validates the passwords according to CBN standards
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