// import express, { response } from 'express';
const express = require('express');
// import rateLimit from 'express-rate-limit';
const rateLimit = require('express-rate-limit');
// import { hello } from '../controllers/app.js';
// import { logRequest, processRequest, responseRequest, bulk_upload_institution } from '../controllers/request.js';
const requestObj = require('../controllers/request.js');
// import { pgQuery } from '../config/pg.js';
const db = require('../config/pg.js');
// import { requestSchema } from '../utils/joi.js';
const joiObj = require('../utils/joi.js');
const funcObj = require('../utils/functions.js');
const mssql = require('../config/mssql.js');
const auth = require('../middlewares/jwt.js');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // // Limit each IP to specified value per `window` (here, per 1 minute)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const router = express.Router();

// router.get('/send_mail', apiLimiter, async (req, res) => {
//     try {
//         const response = await funcObj.sendEmail({ 
//             email: 'maibrahim4@cbn.gov.ng', 
//             subject: 'Test Email from FICRP', 
//             message: funcObj.getTemplate('Hello MB <br/> Nice to meet you <br /> Regards.') 
//         })
//         return res.status(200).send(response);
//     }
//     catch(err) {
//         return res.status(500).send({
//             error: String(err),
//             message: 'An error occurred Error from here'

//         })
        
//     }
// });

router.get('/request_data', apiLimiter, auth.verifyTokenApp, async (req, res) => {
    try {

        const { app_id, inst_code } = req.user;

        console.log(inst_code);

        // let records = await db.pgQuery(`SELECT * FROM portfolio_api.request_data WHERE "InstCode" = '${inst_code}'`)

        let records = await db.pgQuery(`SELECT * FROM portfolio_api.request_data`)
        

        let app = req.user;
        const appInfo = await funcObj.getAppDetails(app.app_id);
        try {
            await db.pgQuery('INSERT INTO portfolio_api.request_log ("inst_code", "app_id") VALUES ($1, $2)', [appInfo.inst_code, appInfo.app_id])
            .then(result => {
                return res.status(200).json({
                    statusCode: 200,
                    data: records
                });
            }) .catch(err => {
                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: String(err)
                })
            })
        }
        catch (err){
            return res.status(500).json({
                statusCode: 500,
                statusMessage: String(err)
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            statusCode: 500,
            statusMessage: String(err)
        });
    }
});

// This endpoint handles the login for apps returning a jwt token, with duration 1 hour
router.post('/login', apiLimiter, async (req, res) => {
    try {
        // Validates the payload with a schema
        const { error, value } = joiObj.appLoginSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: error.details
            });
        }

        let { app_id, api_key } = value;

        const appExists = await funcObj.getAppDetails(app_id);
        // console.log(appExists)

        // Necessary checks if the app id and password match
        if(!appExists) {
            return res.status(404).json({
                statusCode: 404,
                statusMessage: "Invalid domain credentials exists"
            });
        };

        if(!bcrypt.compareSync(api_key, appExists.api_key)){
            return res.status(404).json({
                statusCode: 404,
                statusMessage: "Invalid domain credentials password"
            });
        };

        // The token is generated
        const authToken = auth.generateToken({ username: app_id });
        
        let payload = JSON.stringify({})

        // This bit of code updates the audit logs with details of the endpoint 
        db.pgQuery(`INSERT INTO portfolio_api.audit_logs ("user_id", "user_category", "action", "value") VALUES ($1, $2, $3, $4)`, [app_id, "App", "Login", payload])
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                statusMessage: "Login successful",
                token: authToken
            })
        }).catch(err => {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: String(err)
            })
        }) 
    }
    catch (err){
        return res.status(500).json({
            statusCode: 500,
            statusMessage: String(err)
        })
    }
})

// // This endpoint handles the pull of app/user cci data from the staging table.
// router.post('/addToRequest', apiLimiter, async (req, res) => {
//     const { data } = req.body

//     await db.pgQuery(`INSERT INTO portfolio_api.request_data ("CCINumber", "Purpose", "CapitalType", "CurrencyUSDEquivalent", "NGNAmount", "LoanBalance", "InflowDate", "TypeName", "ClientName", "Address", "BeneficiaryCode", "SectorName", "StateName") VALUES ( '${data["CCINumber"]}', '${data["Purpose"]}', '${data["CapitalType"]}', '${data["CurrencyUSDEquivalent"]}', '${data["NGNAmount"]}', '${data["LoanBalance"]}', '${data["InflowDate"]}', '${data["TypeName"]}', '${data["ClientName"]}', '${data["Address"]}', '${data["BeneficiaryCode"]}', '${data["SectorName"]}', '${data["StateName"]}')`)
//     .then(result => {
//         return res.status(200).json({
//             statusCode: 200
//         })
//     }) .catch(err => {
//         res.status(400).json({
//             statusCode: 400,
//             errorMessage: String(err)
//         })
//     });
// });

// This endpoint handles the update of app/user details 
router.put('/updateApp', apiLimiter, auth.verifyTokenApp, async (req, res) => {
    try {

        // The payload is validated against a predefined schema
        const { error, value } = joiObj.updateAppUserSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: error.details
            })
        }

        // Checks the for inputs
        const new_app_id = value.new_app_id ? value.new_app_id : false;
        const app_name = value.app_name ? value.app_name : false;
        const api_key = value.api_key ? value.api_key : false;

        const { app_id } = req.user;

        let { appData } =  req.user;

        let hashedPassword;

        if(new_app_id || app_name || api_key){
            if(new_app_id){
                const newAppExists = await funcObj.getAppDetails(new_app_id);
                if(newAppExists){
                    return res.status(409).json({
                        statusCode: 409,
                        statusMessage: `${new_app_id} already exists in our record`
                    })
                }
                else {
                    appData.app_id = new_app_id;
                }
            }

            if(app_name)
            appData.app_name = app_name;

            if(api_key){
                let response = funcObj.passwordValidation(api_key);

                if(response.status == "Valid"){
                    const salt = bcrypt.genSaltSync(10);
                    hashedPassword = bcrypt.hashSync(api_key, salt);
                    console.log(api_key)
                }
                else {
                    return res.status(401).json({
                        statusCode: 401,
                        errorMessage: response.errorMessage
                    })
                }
            }

            db.pgQuery(`UPDATE portfolio_api.apps SET inst_code = '${appData.inst_code}', app_name = '${appData.app_name}', app_id = '${appData.app_id}', api_key = '${appData.api_key}' WHERE app_id = '${app_id}'`)
            .then(result => {})
            .catch(err => {
                return resolveSoa.status(400).json({
                    statusCode: 400,
                    statusMessage: String(err)
                })
            })

            let payload = JSON.stringify({
                appData
            })

            await db.pgQuery(`INSERT INTO portfolio_api.audit_logs ("user_id", "user_category", "action", "value") VALUES ($1, $2, $3, $4)`, [app_id, "App", "Update App", payload])
            .then(result => {
                return res.status(200).json({
                    statusCode: 200,
                    statusMessage: "App updated successfully"
                })
            }). catch(err => {
                return res.status(400).json({
                    statusCode: 401,
                    errorMessage: String(err)
                })
            })

        }
        else {
            return res.status(404).json({
                statusCode: 400,
                statusMessage: "No information to update"
            });
        }
    }
    catch(err){
        return res.status(500).json({
            statusCode: 500,
            errorMessage: String(err)
        })
    }
});

// router.get('/test_send_mail', apiLimiter, async (req, res) => {
//     await funcObj.sendEmail({ email: "ibrahim27752@cbn.gov.ng", subject: 'Testing mailing API', 
//             message: "Empty Message"
//         })
//         .then(result => {
//             console.log(result)
//             return res.status(200).json({
//                 statusCode: 200,
//                 statusMessage: "Mail Sent"
//             })
//             return
//         }) .catch(err => {
//             console.log(err)
//             return res.status(400).json({
//                 statusCode: 400,
//                 errorMessage: String(err)
//             })
//         })
// })

module.exports = router;