const express = require('express');

const rateLimit = require('express-rate-limit');

const adminControl = require('../controllers/admin/admin.js');
const admin = require('../middlewares/adminExists.js');

const db = require('../config/pg.js');

const joiObj = require('../utils/joi.js');

const funcObj = require('../utils/functions.js');

const ActiveDirectory = require('activedirectory');

const envObj = require('../env.js');
// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/jwt.js');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const moment = require('moment');


const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // // Limit each IP to specified value per `window` (here, per 1 minute)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const router = express.Router();


router.get('/allAdmin', apiLimiter, auth.verifyToken, async (req, res) => {
    try {

        const username = req.user.username

        await db.pgQuery(`INSERT INTO portfolio_api.audit_logs ("user_id", "user_category", "action") VALUES ($1, $2, $3)`, [username, "Admin", "Get All Admins"])
        .then(result => {})
        .catch(err => {
            return res.status(400).json({
                statusCode: 400,
                errorMessage: String(err)
            })
        })

        //'INSERT INTO portfolio_api.apps ("inst_code", "app_name", "app_id", "api_key", "reg_by") VALUES ($1, $2, $3, $4, $5)', [inst_code, app_name, app_id, hashedPassword, user.username]

        await db.pgQuery('SELECT * FROM portfolio_api.admins')
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                activeAdmins: result.filter(next => !next.del_status),
                inactiveAdmins: result.filter(next => next.del_status)
            });
        }) .catch(err => {
            return res.status(400).json({
                statusCode: 400,
                errorMessage: String(err)
            })
        })
    }
    catch (err) {
        return res.status(500).json({
            statusCode: 500,
            statusMessage: String(err)
        });
    }
});

router.get('/allInstitutions', apiLimiter, auth.verifyToken, async (req, res) => {
    try {
        const username = req.user.username

        await db.pgQuery(`INSERT INTO portfolio_api.audit_logs ("user_id", "user_category", "action") VALUES ($1, $2, $3)`, [username, "Admin", "Get All Institutions"])
        .then(result => {})
        .catch(err => {
            return res.status(400).json({
                statusCode: 400,
                errorMessage: String(err)
            })
        })
        await db.pgQuery('SELECT * FROM portfolio_api.institutions')
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                activeInstitutions: result.filter(next => !next.del_status),
                inactiveInstitutions: result.filter(next => next.del_status)
            });
        }) .catch(err => {
            res.status(400)
        })
    }
    catch (err) {
        return res.status(500).json({
            statusCode: 500,
            statusMessage: String(err)
        });
    }
});

router.get('/allApps', apiLimiter, auth.verifyToken, async (req, res) => {
    try {
        const username = req.user.username

        await db.pgQuery(`INSERT INTO portfolio_api.audit_logs ("user_id", "user_category", "action") VALUES ($1, $2, $3)`, [username, "Admin", "Get All Apps"])
        .then(result => {})
        .catch(err => {
            return res.status(400).json({
                statusCode: 400,
                errorMessage: String(err)
            })
        })

        await db.pgQuery('SELECT * FROM portfolio_api.apps')
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                activeApps: result.filter(next => !next.del_status),
                inactiveApps: result.filter(next => next.del_status)
            });
        }) .catch(err => {
            res.status(400)
        })
    }
    catch (err) {
        return res.status(500).json({
            statusCode: 500,
            statusMessage: String(err)
        });
    }
});

router.put('/deleteApp', apiLimiter, auth.verifyToken, async (req, res) => {
    try {

        const { error, value } = joiObj.deleteAppSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: error.details
            });
        }

        const { app_id, del_status } = value;

        const appExists = await funcObj.getAppDetails(app_id);

        if(!appExists){
            return res.status(409).json({
                statusCode: 409,
                statusMessage: `${app_id} does not exists`
            });
        }

        await db.pgQuery(`UPDATE portfolio_api.apps SET del_status = '${del_status}' WHERE app_id = '${app_id}'`)
        .then(result => {}) 
        .catch (err => {
            return res.status(400).json({
                statusCode: 400,
                errorMessage: String(err),
                error: "Error updating the app"
            })
        })

        let payload = JSON.stringify({
            del_status
        })

        await db.pgQuery(`INSERT INTO portfolio_api.audit_logs ("user_id", "user_category", "action", value, affected_user_id, affected_user_category) VALUES ($1, $2, $3, $4, $5, $6)`, [req.user.username, "Admin", "Delete App", payload, app_id, "App"])
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                statusMessage: "App delete status successfully changed"
            })
        }). catch(err => {
            return res.status(400).json({
                statusCode: 401,
                errorMessage: String(err)
            })
        })
    }
    catch (err) {
        return res.status(500).json({
            statusCode: 500,
            errorMessage: String(err)
        })
    }
});

router.put('/deleteAdmin', apiLimiter, auth.verifyToken, async (req, res) => {
    try {

        const { error, value } = joiObj.deleteAdminSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: error.details
            });
        }

        const { username, del_status } = value;

        const adminExists = await funcObj.getAdminDetails(username);

        if(!adminExists){
            return res.status(409).json({
                statusCode: 409,
                statusMessage: `${username} does not exists in the records`
            });
        }

        await db.pgQuery(`UPDATE portfolio_api.admins SET del_status = '${del_status}' WHERE username = '${username}'`)
        .then(result => {}) .catch (err => {
            return res.status(400).json({
                statusCode: 400,
                errorMessage: String(err),
                error: "Error updating the admin"
            })
        })

        let payload = JSON.stringify({
            del_status
        })

        await db.pgQuery(`INSERT INTO portfolio_api.audit_logs ("user_id", "user_category", "action", value, affected_user_id, affected_user_category) VALUES ($1, $2, $3, $4, $5, $6)`, [req.user.username, "Admin", "Delete Admin", payload, username, "Admin"])
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                statusMessage: "Admin delete status successfully changed"
            })
        }). catch(err => {
            return res.status(400).json({
                statusCode: 401,
                errorMessage: String(err)
            })
        })


    }
    catch (err) {
        return res.status(500).json({
            statusCode: 500,
            errorMessage: String(err)
        })
    }
});

router.put('/deleteInstitution', apiLimiter, auth.verifyToken, async (req, res) => {
    try {
        const { error, value } = joiObj.deleteInstitutionSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: error.details
            });
        }

        const { inst_code, del_status } = value;

        const institutionExist = await funcObj.getInstitutionDetails(inst_code);

        if(!institutionExist) {
            return res.status(409).json({
                statusCode: 409,
                statusMessage: `${inst_code} does not exists in the records`
            });
        }


        await db.pgQuery(`UPDATE portfolio_api.institutions SET del_status = '${del_status}' WHERE inst_code = '${inst_code}'`)
        .then(result => {}) 
        .catch (err => {
            return res.status(400).json({
                statusCode: 400,
                errorMessage: String(err)
            })
        })

        let payload = JSON.stringify({
            del_status
        })

        await db.pgQuery(`INSERT INTO portfolio_api.audit_logs ("user_id", "user_category", "action", value, affected_user_id, affected_user_category) VALUES ($1, $2, $3, $4, $5, $6)`, [req.user.username, "Admin", "Delete Institution", payload, inst_code, "Institution"])
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                statusMessage: "Institution delete status successfully changed"
            })
        }). catch(err => {
            return res.status(400).json({
                statusCode: 401,
                errorMessage: String(err)
            })
        })
    }
    catch (err) {
        return res.status(500).json({
            statusCode: 500,
            errorMessage: String(err)
        })
    }
});

router.put('/resetPasswordAdmin', apiLimiter, auth.verifyToken, async (req, res) => {
    try {

        const { error, value } = joiObj.addAdminSchema.validate(req.body);

        if(error){
            return res.status(400).json({
                statusCode: 400,
                statusMessage: error.details
            })
        };

        let { username } = value;

        const adminExists = await funcObj.getAdminDetails(username);

        if(!adminExists || adminExists.del_status){
            return res.status(409).json({
                statusCode: 409,
                statusMessage: `${username} does not exists or is deleted in the records`
            });
        }

        let tempPass = Math.random().toString(36).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(tempPass, salt);
        console.log(tempPass);
        
        let emailStatus = "";

        try {
            await db.pgQuery(`UPDATE portfolio_api.admins SET password = '${hashedPassword}' WHERE username = '${username}'`)
            .then(result => {
                
            }) .catch (err => {
                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: String(err),
                })
            })

            await funcObj.sendEmail({ email: username, subject: 'Account Creation | ECCI API', 
                message: funcObj.getTemplate(
                    `An account has been created for you on the ECCI API, Kindly use the details below to login
                        <br />
                        Email address: ${username} <br />
                        Password: ${tempPass} <br />
                        You will be prompted to reset password upon first login
                    `,
                ) 
            })
            .then(result => {
                emailStatus = result
            }) .catch(err => {
                emailStatus = err
            })

            let payload = JSON.stringify({
                hashedPassword
            })

            await db.pgQuery(`INSERT INTO portfolio_api.audit_logs ("user_id", "user_category", "action", value, affected_user_id, affected_user_category) VALUES ($1, $2, $3, $4, $5, $6)`, [req.user.username, "Admin", "Reset Password Admin", payload, username, "Admin"])
            .then(result => {
                return res.status(200).json({
                    statusCode: 200,
                    statusMessage: "Admin Password successfully Reset",
                    emailStatus
                })
            }). catch(err => {
                return res.status(400).json({
                    statusCode: 401,
                    errorMessage: String(err)
                })
            })
        }
        catch (err) {
            return res.status(500).json({
                statusCode: 500,
                errorMessage: String(err)
            })
        }
    }
    catch {
        return res.status(500).json({
            statusCode: 500,
            errorMessage: String(err)
        })
    }
});

router.put('/resetPasswordApp', apiLimiter, auth.verifyToken, async (req, res) => {
    
    try{
        const { error, value } = joiObj.resetAppSchema.validate(req.body);

        if(error){
            return res.status(400).json({
                statusCode: 400,
                statusMessage: error.details
            })
        };

        let { app_id } = value;

        let tempPass = Math.random().toString(36).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(tempPass, salt);
        console.log(tempPass);

        const appExists = await funcObj.getAppDetails(app_id)

        if(!appExists || appExists.del_status){
            return res.status(409).json({
                statusCode: 409,
                statusMessage: `${app_id} does not exists in records`
            });
        }


        
        await db.pgQuery(`UPDATE portfolio_api.apps SET api_key = '${hashedPassword}' WHERE app_id = '${app_id}'`)
        .then(result => {
        }) .catch (err => {
            return res.status(400).json({
                statusCode: 400,
                errorMessage: String(err),
            })
        })

        let emailStatus = "";

        await funcObj.sendEmail({ email: app_id, subject: 'Account Creation | ECCI API', 
            message: funcObj.getTemplate(
                `An account has been created for you on the ECCI API, Kindly use the details below to login
                    <br />
                    Email address: ${app_id} <br />
                    Password: ${tempPass} <br />
                    You will be prompted to reset password upon first login
                `,
            ) 
        })
        .then(result => {
            emailStatus = result
        }) .catch(err => {
            emailStatus = err
        })

        let payload = JSON.stringify({
            hashedPassword
        })

        await db.pgQuery(`INSERT INTO portfolio_api.audit_logs ("user_id", "user_category", "action", "value", "affected_user_id", "affected_user_category") VALUES ($1, $2, $3, $4, $5, $6)`, [req.user.username, "Admin", "Reset Password App", payload, app_id, "App"])
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                statusMessage: "App Password successfully Reset",
                emailStatus
            })
        }). catch(err => {
            return res.status(401).json({
                statusCode: 401,
                errorMessage: String(err)
            })
        })

       
    }
    catch {
        return res.status(500).json({
            statusCode: 500,
            errorMessage: String(err)
        })
    }
});

router.put('/updateAdmin', apiLimiter, auth.verifyToken, async (req, res) => {
    try {
        const { error, value } = joiObj.updateAdminSchema.validate(req.body);


        if(error) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: error.details
            });
        }

        let { username, new_username } = value;
        const admin = req.user;

        const adminExists = await funcObj.getAdminDetails(username);

        if(!adminExists || adminExists.del_status){
            return res.status(409).json({
                statusCode: 409,
                statusMessage: `${username} does not exists or is deleted from the records`
            });
        }

        await db.pgQuery(`UPDATE portfolio_api.admins SET username = '${new_username}' WHERE username = '${username}'`)
        .then(result => {

        }) .catch (err => {
            return res.status(400).json({
                statusCode: 400,
                errorMessage: String(err)
            })
        })

        let payload = JSON.stringify({
            new_username
        })

        await db.pgQuery(`INSERT INTO portfolio_api.audit_logs ("user_id", "user_category", "action", value, affected_user_id, affected_user_category) VALUES ($1, $2, $3, $4, $5, $6)`, [admin.username, "Admin", "Update Admin", payload, username, "Admin"])
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                statusMessage: "Admin Updated"
            })
        }). catch(err => {
            return res.status(400).json({
                statusCode: 401,
                errorMessage: String(err)
            })
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            statusCode: 500,
            errorMessage: String(err)
        })
    }
});

router.put('/updateInstitution', apiLimiter, auth.verifyToken, async (req, res) => {
    
    try {
        const { error, value } = joiObj.updateInstitutionSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: error.details
            });
        }

        let new_inst_code = value.new_inst_code ? value.new_inst_code : false;
        let inst_name = value.inst_name ? value.inst_name : false;
        let inst_email = value.inst_email ? value.inst_email : false;
        let inst_phone = value.inst_phone ? value.inst_phone : false;

        let { inst_code } = value;

        const institutionExist = await funcObj.getInstitutionDetails(inst_code);

        if(!institutionExist || institutionExist.del_status) {
            return res.status(409).json({
                statusCode: 409,
                statusMessage: `${inst_code} does not exists or deleted in the records`
            });
        }

        let institutionData = institutionExist;

        if(new_inst_code || inst_email || inst_name || inst_phone){

            if(new_inst_code)
            institutionData.inst_code = new_inst_code;

            if(inst_email)
            institutionData.inst_email = inst_email;

            if(inst_name)
            institutionData.inst_name = inst_name;

            if(inst_phone)
            institutionData.inst_phone = inst_phone;

            let payload = JSON.stringify({
                institutionData
            })

            db.pgQuery(`UPDATE portfolio_api.institutions SET inst_code = '${institutionData.inst_code}', inst_email = '${institutionData.inst_email}', inst_name = '${institutionData.inst_name}', inst_phone = '${institutionData.inst_phone}' WHERE inst_code = '${inst_code}'`)
            .then(result => {
                // return res.status(200).json({
                //     statusCode: 200,
                //     statusMessage: "Institution updated"
                // })
            }).catch(err => {
                return resolveSoa.status(400).json({
                    statusCode: 400,
                    statusMessage: String(err)
                })
            })

            await db.pgQuery(`INSERT INTO portfolio_api.audit_logs ("user_id", "user_category", "action", "value", "affected_user_id", "affected_user_category") VALUES ($1, $2, $3, $4, $5, $6)`, [req.user.username, "Admin", "Update Institution", payload, inst_code, "Institution"])
            .then(result => {
                return res.status(200).json({
                    statusCode: 200,
                    statusMessage: "Institution updated successfully"
                })
            }). catch(err => {
                return res.status(400).json({
                    statusCode: 401,
                    errorMessage: String(err)
                })
            })
        }
        else {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: "No information to update"
            });
        }
    }
    catch(err) {
        return res.status(500).json({
            statusCode: 500,
            errorMessage: String(err)
        })
    }
});

router.put('/updateApp', apiLimiter, auth.verifyToken, async (req, res) => {
    try {
        const { error, value } = joiObj.updateAppSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: error.details
            });
        }

        const new_app_id = value.new_app_id ? value.new_app_id : false;
        const inst_code = value.inst_code ? value.inst_code : false;
        const app_name = value.app_name ? value.app_name : false;
        const api_key = value.api_key ? value.api_key : false;

        const { app_id } = value;

        if(inst_code){
            const institutionExist = await funcObj.getInstitutionDetails(inst_code);

            if(!institutionExist) {
                return res.status(409).json({
                    statusCode: 409,
                    statusMessage: `${inst_code} does not exists in records`
                });
            }
        }

        const appExists = await funcObj.getAppDetails(app_id)

        if(!appExists || appExists.del_status){
            return res.status(409).json({
                statusCode: 409,
                statusMessage: `${app_id} does not exist or is deleted from the records`
            });
        }

        let appData = appExists;

        let hashedPassword; 

        if(new_app_id || inst_code || app_name || api_key){

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

            if(inst_code)
            appData.inst_code = inst_code;

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

            const { username } = req.user;

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

            await db.pgQuery(`INSERT INTO portfolio_api.audit_logs ("user_id", "user_category", "action", "value", "affected_user_id", "affected_user_category") VALUES ($1, $2, $3, $4, $5, $6)`, [username, "Admin", "Update App", payload, app_id, "App"])
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
            return res.status(400).json({
                statusCode: 400,
                statusMessage: "No information to update"
            });
        }
    }
    catch {
        return res.status(500).json({
            statusCode: 500,
            errorMessage: String(err)
        })
    }
});

router.post('/login', apiLimiter, async (req, res) => {
    try {
        const { error, value } = joiObj.loginSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: error.details
            });
        }

        let { username, password } = value;

        username = username.toLowerCase();

        const adUsername = Boolean(username.indexOf('@cbn.gov.ng') > -1) ? username : username + '@cbn.gov.ng';

        const usernameExists = await funcObj.getAdminDetails(adUsername);

        if(!usernameExists || usernameExists.del_status === true) {

            return res.status(404).json({
                statusCode: 404,
                statusMessage: "Invalid domain credentials"
            });
        }

        if(!bcrypt.compareSync(password, usernameExists.password)){
            return res.status(404).json({
                statusCode: 404,
                statusMessage: "Invalid domain credentials"
            });
        };


        const authToken = auth.generateToken({ username: adUsername });

        db.pgQuery(`INSERT INTO portfolio_api.audit_logs ("user_id", "user_category", "action") VALUES ($1, $2, $3)`, [adUsername, "Admin", "Login"])
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                statusMessage: "Login successful",
                token: authToken
            })
        }).catch(err => {
            return resolveSoa.status(400).json({
                statusCode: 400,
                statusMessage: String(err)
            })
        })     

        // const ad = new ActiveDirectory(
        //     "LDAP://172.24.90.152",
        //     "dc=CENBANK,dc=NET",
        //     adUsername, password
        // );

        // ad.authenticate(adUsername, password, (err, auth) => {
        //     if(err) {
        //         return res.status(404).json({
        //             statusCode: 404,
        //             statusMessage: "Invalid domain credentials"
        //         });
        //     }

        //     if(auth) {
        //         ad.findUser(adUsername, async (err, user) => {
        //             if(err) {
        //                 return res.status(500).json({
        //                     statusCode: 500,
        //                     statusMessage: String(err)
        //                 });
        //             }

        //             if(!user) {
        //                 return res.status(404).json({
        //                     statusCode: 404,
        //                     statusMessage: `User ${adUsername} not found`
        //                 });
        //             } else {
        //                 return res.status(200).json({
        //                     statusCode: 200,
        //                     statusMessage: "Login successful",
        //                     token: jwt.sign({
        //                         username: adUsername
        //                     }, envObj.env.jwt_secret, { expiresIn: envObj.env.jwt_expiry })
        //                 });        
        //             }
        //         });
        //     } else {
        //         return res.status(401).json({
        //             statusCode: 401,
        //             statusMessage: "Invalid domain credentials"
        //         });
        //     }
        // });
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            statusMessage: String(err)
        });
    }
});

router.post('/addApp', apiLimiter, auth.verifyToken, async (req, res) => {
    try {
        const { error, value } = joiObj.appSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: error.details
            });
        }

        let { inst_code, app_name, app_id } = value;

        const { username } = req.user;

        const appExist = await funcObj.getAppDetails(app_id);

        const institutionExist = await funcObj.getInstitutionDetails(inst_code);
            
        if(appExist) {
            return res.status(409).json({
                statusCode: 409,
                statusMessage: `${app_id} exists`
            });
        }

        if(!institutionExist) {
            return res.status(409).json({
                statusCode: 409,
                statusMessage: `${inst_code} does not exists in records`
            });
        }

        let tempPass = Math.random().toString(36).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(tempPass, salt);

        console.log(tempPass);

        // This db call is to the apps table creating the app with the provided details
        const insertRes = await db.pgQuery('INSERT INTO portfolio_api.apps ("inst_code", "app_name", "app_id", "api_key", "reg_by") VALUES ($1, $2, $3, $4, $5)', [inst_code, app_name, app_id, hashedPassword, username])
      
        
        // This bit of the code sends a mail to the app being created with a default password
        let emailStatus = await funcObj.sendEmail({ email: app_id, subject: 'Account Creation | ECCI API', 
            message: funcObj.getTemplate(
                `An account has been created for you on the ECCI API, Kindly use the details below to login
                    <br />
                    Email address: ${app_id} <br />
                    Password: ${tempPass} <br />
                    You will be prompted to reset password upon first login
                `,
            ) 
        })

        let payload = JSON.stringify({
            inst_code,
            app_name,
            app_id
        })

        await db.pgQuery(`INSERT INTO portfolio_api.audit_logs ("user_id", "user_category", "action", "value") VALUES ($1, $2, $3, $4)`, [username, "Admin", "Add App", payload])
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                statusMessage: "App created successfully",
                emailStatus
            })
        })
        .catch(err => {
            return res.status(401).json({
                statusCode: 400,
                errorMessage: String(err)
            })
        })
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            statusMessage: String(err)
        });
    }
});

// This endpoint handles the adding institutions to the system
router.post('/addInstitution', apiLimiter, auth.verifyToken, async (req, res) => {
    try {
        // The validation section which validates using a schema
        const { error, value } = joiObj.institutionSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: error.details
            });
        }

        let { inst_code, inst_name, inst_email, inst_phone } = value;

        const { username } = req.user;

        const institutionExist = await funcObj.getInstitutionDetails(inst_code);
            
        // Check if the institution code exists, if not send and error response
        if(institutionExist) {
            return res.status(409).json({
                statusCode: 409,
                statusMessage: `${inst_code} exists`
            });
        }

        // This bit of code inserts the institution details into the table
        await db.pgQuery('INSERT INTO portfolio_api.institutions ("inst_code", "inst_name", "inst_email", "inst_phone", "reg_by") VALUES ($1, $2, $3, $4, $5)', [inst_code, inst_name, inst_email, inst_phone, username])
        .then(result => {})
        .catch(err => {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: String(err)
            });
        });   

        let payload = JSON.stringify({
            inst_code,
            inst_email,
            inst_name,
            inst_phone
        })
        
        // This db call is to the audit trail, logging all the details involved with this end point
        await db.pgQuery(`INSERT INTO portfolio_api.audit_logs ("user_id", "user_category", "action", "value") VALUES ($1, $2, $3, $4)`, [username, "Admin", "Add Institution", payload])
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                statusMessage: "Institution created successfully"
            })
        })
        .catch(err => {
            return res.status(400).json({
                statusCode: 400,
                errorMessage: String(err)
            })
        })
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            statusMessage: String(err)
        });
    }
});

// This endpoint handles the creation of admins on the system
router.post('/addAdmin', apiLimiter, auth.verifyToken, async (req, res) => {
    try {

        // Validate the payload against a specified schema
        const { error, value } = joiObj.addAdminSchema.validate(req.body);


        if(error) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: error.details
            });
        }

        // if(!password) {
        //     return res.status(400).json({
        //         statusCode: 400,
        //         statusMessage: "Invalid domain credentials"
        //     });
        // }

        let { username } = value;

        let admin = req.user;

        username = username.toLowerCase();

        const adUsername = Boolean(username.indexOf('@cbn.gov.ng') > -1) ? username : username + '@cbn.gov.ng';

        const userExist = await funcObj.getAdminDetails(username);
            
        if(userExist) {
            return res.status(409).json({
                statusCode: 409,
                statusMessage: `${username} exists`
            });
        }

        let tempPass = Math.random().toString(36).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(tempPass, salt);
        console.log(tempPass);

        const insertRes = await db.pgQuery('INSERT INTO portfolio_api.admins ("username", "password", "reg_by") VALUES ($1, $2, $3)', [adUsername, hashedPassword, admin.username])

        // This bit of the code sends a mail to the app being created with a default password
        let emailStatus = await funcObj.sendEmail({ email: app_id, subject: 'Account Creation | ECCI API', 
            message: funcObj.getTemplate(
                `An account has been created for you on the ECCI API, Kindly use the details below to login
                    <br />
                    Email address: ${app_id} <br />
                    Password: ${tempPass} <br />
                    You will be prompted to reset password upon first login
                `,
            ) 
        })
                
        let payload = JSON.stringify({
            username
        })
        
        await db.pgQuery(`INSERT INTO portfolio_api.audit_logs ("user_id", "user_category", "action", "value") VALUES ($1, $2, $3, $4)`, [admin.username, "Admin", "Add Admin", payload])
        .then(result => {
            return res.status(200).json({
                statusCode: 200,
                statusMessage: "Admin created successfully"
            })
        })
        .catch(err => {
            return res.status(400).json({
                statusCode: 400,
                errorMessage: String(err)
            })
        })
        // const ad = new ActiveDirectory(
        //     "LDAP://172.24.90.152",
        //     "dc=CENBANK,dc=NET",
        //     admin, password
        // );

        // ad.authenticate(admin, password, (err, auth) => {
        //     if(err) {
        //         return res.status(404).json({
        //             statusCode: 404,
        //             statusMessage: "Invalid domain credentials"
        //         });
        //     }

        //     if(auth) {
        //         ad.findUser(adUsername, async (err, user) => {
        //             if(err) {
        //                 return res.status(500).json({
        //                     statusCode: 500,
        //                     statusMessage: String(err)
        //                 });
        //             }

        //             if(!user) {
        //                 return res.status(404).json({
        //                     statusCode: 404,
        //                     statusMessage: `${adUsername} not found`
        //                 });
        //             } else {
        //                 let tempPass = Math.random().toString(36).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];
        //                 const hashedPassword = funcObj.hashPassword(tempPass);

        //                 await db.pgQuery('INSERT INTO admins ("username", "reg_by") VALUES ($1, $2)', [adUsername, admin])
        //                 .then(result => {
        //                     funcObj.sendEmail({ adUsername, subject: 'Account Creation | ECCI API', 
        //                         message: funcObj.getTemplate(
        //                             `An account has been created for you on the ECCI API, Kindly use the details below to login
        //                                 <br />
        //                                 Email address: ${adUsername} <br />
        //                                 Password: ${tempPass} <br />
        //                                 You will be prompted to reset password upon first login
        //                             `,
        //                         ) 
        //                     });

        //                     return res.status(200).json({
        //                         statusCode: 200,
        //                         statusMessage: "Account successfully created",
        //                     });
        //                 }).catch(err => {
        //                     return res.status(400).json({
        //                         statusCode: 400,
        //                         statusMessage: String(err)
        //                     });
        //                 });        
        //             }
        //         });
        //     } else {
        //         return res.status(401).json({
        //             statusCode: 401,
        //             statusMessage: "Invalid domain credentials"
        //         });
        //     }
        // });
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            statusMessage: String(err)
        });
    }
});

router.post('/setup', apiLimiter, async (req, res) => {
    try {
        const { error, value } = joiObj.setupSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: error.details
            });
        }

        let { username } = value;
        const { password } = value;

        username = username.toLowerCase();

        const adUsername = Boolean(username.indexOf('@cbn.gov.ng') > -1) ? username : username + '@cbn.gov.ng';

        const usernameExist = await funcObj.getAdminDetails(adUsername);

        if(usernameExist) {
            return res.status(409).json({
                statusCode: 409,
                statusMessage: `${adUsername} exists`,
            });
        }

        const ad = new ActiveDirectory(
            "LDAP://172.24.90.152",
            "dc=CENBANK,dc=NET",
            adUsername, password
        );
                
        ad.authenticate(adUsername, password, (err, auth) => {
            if(err) {
                return res.status(404).json({
                    statusCode: 404,
                    statusMessage: "Invalid domain credentials",
                    errorMessage: String(err),
                });
            }

            if(auth) {
                ad.findUser(adUsername, async (err, user) => {
                    if(err) {
                        return res.status(500).json({
                            statusCode: 500,
                            statusMessage: String(err)
                        });
                    }

                    if(!user) {
                        return res.status(404).json({
                            statusCode: 404,
                            statusMessage: "User " + adUsername + " not found"
                        });
                    } else {
                        let tempPass = Math.random().toString(36).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];
                        const salt = bcrypt.genSaltSync(10);
                        const hashedPassword = bcrypt.hashSync(tempPass, salt);

                        await db.pgQuery('INSERT INTO portfolio_api.admins ("username", "password", "reg_by") VALUES ($1, $2, $3)', [adUsername, hashedPassword, adUsername])
                        .then(result => {})
                        .catch(err => {
                            return res.status(400).json({
                                statusCode: 400,
                                statusMessage: String(err)
                            });
                        }); 

                        let emailStatus = "";
                        
                        await funcObj.sendEmail({ email: adUsername, subject: 'Account Creation | ECCI API', 
                            message: funcObj.getTemplate(
                                `An account has been created for you on the ECCI API, Kindly use the details below to login
                                    <br />
                                    Email address: ${adUsername} <br />
                                    Password: ${tempPass} <br />
                                    You will be prompted to reset password upon first login
                                `,
                            ) 
                        })
                        .then(result => {
                            emailStatus = result
                        })
                        .catch(err => {
                            emailStatus = err
                        })

                        let payload = JSON.stringify({
                            adUsername,
                            hashedPassword
                        });

                        await db.pgQuery(`INSERT INTO portfolio_api.audit_logs ("user_id", "user_category", "action", "value") VALUES ($1, $2, $3, $4)`, [adUsername, "Admin", "Setup Admin", payload])
                        .then(result => {
                            return res.status(201).json({
                                statusCode: 201,
                                statusMessage: "User account created",
                                emailStatus
                            });
                        })
                        .catch(err => {
                            return res.status(400).json({
                                statusCode: 400,
                                errorMessage: String(err)
                            })
                        })
                    }
                });
            } else {
                return res.status(401).json({
                    statusCode: 401,
                    statusMessage: "Invalid domain credentials"
                });
            }
        });
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            statusMessage: String(err)
        });
    }
});



module.exports = router;