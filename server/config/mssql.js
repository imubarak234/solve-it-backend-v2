// import sql from 'mssql';
const sql = require('mssql');
const env = require('../env.js');

let mssqlConfig = {};

mssqlConfig.msQuery = async (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            await sql.connect(env.mssql_db_url);
            const { recordset } = await sql.query(query);
            resolve(recordset);
        } catch(err) {
            reject(err);
        }
    });
}

const init = async () => {
    try {
        await mssqlConfig.msQuery('SELECT 1');
        console.log("MSSQL database connected");
    } catch(err) {
        console.log("MSSQL database err: ", err);
    }
}

// init();

module.exports = mssqlConfig;