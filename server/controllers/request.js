const db = require('../config/pg.js');
const joiObj = require('../utils/joi.js');
const uuidv4 = require('uuid');

let requestObj = {};

requestObj.logRequest = async (req, res, next) => {

    try {
        const { error, value } = joiObj.requestSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: error.details
            });
        }

        let { inst_code, req_payload, callback_url } = value;
        let request_id = uuidv4();

        await db.pgQuery('INSERT INTO public.requests ("inst_code", "callback_url", "req_payload", req_id) VALUES ($1, $2, $3, $4)', [inst_code, callback_url, req_payload, request_id])
        .then(result => {
            res.status(201).json({
                statusCode: 201,
                statusMessage: "Request Successfully Received",
                requestId: request_id
            });
            next();
        }).catch(err => {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: String(err)
            });
        });
    } catch(err) {
        return res.status(500).json({
            statusCode: 500,
            statusMessage: String(err)
        });
    }
};

// Makes a call to the ecci database to retrive the data
requestObj.processRequest = async (req, res) => {
    
};

// requestObj.getAllInstitution = () => {
//     return new Promise(async (resolve, reject) => {
//         await db.pgQuery("SELECT * FROM institutions")
//         .then(result => {
//             resolve(result);
//         }).catch(err => {
//             reject(err)
//         });
//     });
// };

// requestObj.bulkToDB = (list) => {
//     return new Promise(async (resolve, reject) => {
//         let queries = [];

//         if (list.length > 0){
//             for (let i = 0; i < list.length; i++){
//                 queries.push(`INSERT INTO public.institutions (inst_code, inst_name, inst_email, inst_phone, reg_by) VALUES ( '${list[i]["inst_code"]}', '${list[i]["inst_name"]}', '${list[i]["inst_email"]}', '${list[i]["inst_phone"]}', '${list[i]["reg_by"]}')`)
//             }
//         }
        
//         if (queries.length > 0){
//             await db.pgQuery(queries.join(";"))
//             .then(result => {
//                 resolve("succesful")
//             }).catch(err => {
//                 reject(err)
//             });
//         }
//         else {
//             reject("No entires submitted")
//         }
//     });
// };

// Searches throw the files in a folder and pipes the data to the application
// export const responseRequest = async (req, res) => {

//     try {

//         let { req_id } = req.body;

//         await db.pgQuery(`SELECT * FROM public.requests WHERE req_id = '${req_id}'`)
//             .then(result => {
//                 if(result.length > 0){
//                     lib.read('test', req_id, (err, data) => {
//                         if(!err && data){
//                             return res.status(200).json({
//                                 requestData: data 
//                             })
//                         }
//                         else {
//                             return res.status(400).json({
//                                 errorMessage: String(err)
//                             })
//                         }
//                     });
//                 }
//                 else {
//                     return res.status(400).json({ 
//                         errorMessage: "request does not exsit"
//                      })
//                 }
//             }) .catch (err => {
//                 res.status(400).json({
//                     errorMessage: String(err)
//                 })
//             })
//     }
//     catch(err){
//         return res.status(500).json({
//             statusCode: 500,
//             statusMessage: String(err)
//         });
//     }
// };

requestObj.bulk_upload_institution = async (req, res, next) => {
    let queries = [];

    if (req.body.list.length > 0) {
        for (let i = 0; i < req.body.list.length; i++) {
            queries.push(`INSERT INTO public.institutions (inst_code, inst_name, inst_email, inst_phone, reg_by) VALUES ( '${req.body.list[i]["inst_code"]}', '${req.body.list[i]["inst_name"]}', '${req.body.list[i]["inst_email"]}', '${req.body.list[i]["inst_phone"]}', '${req.body.list[i]["reg_by"]}')`)
        }
    }
    try {
        if (queries.length > 0) {
            await db.pgQuery(queries.join(";"))
            .then(result => {
                return res.status(201).json({
                    statusCode: 201,
                    statusMessage: "Request Succesfully"
                });
            }).catch(err => {
                return res.status(400).json({
                    statusCode: 400,
                    statusMessage: String(err)
                });
            })
        } else {
            return res.status(500).json({
                statusCode: 500,
                statusMessage: "No elements on the array"
            })
        }

    } catch (e) {
        res.status(500).json({ "message": String(e?.message) || "An error occurred", error: String(e) });
    }
};

module.exports = requestObj;
