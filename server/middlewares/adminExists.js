// import { pgQuery } from '../config/pg.js';
const db = require('../config/pg.js');

let adminMid = {};

adminMid.adminExists = async (req, res, next) => {
    await db.pgQuery('SELECT COUNT(*) FROM portfolio_api.admins WHERE del_status= FALSE')
    .then(result => {
        if(result[0].count !== '0') {
            return res.status(409).json({
                statusCode: "409",
                statusMessage: "Master Admin Exists"
            });
        } else {
            next();
        }
    }).catch(err => {
        return res.status(500).json({
            statusCode: "500",
            statusMessage: String(err)
        });
    });        
}

module.exports = adminMid;