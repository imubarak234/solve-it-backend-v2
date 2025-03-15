// import Pg from 'pg';
const Pg = require('pg');
// import env from '../env.js';
const env = require('../env.js');

const pool = new Pg.Pool({
    connectionString: env.pg_db_url
});

// pool.connect()
// .then(client => {
//     console.log('PG database connected');
//     client.release();
// })
// .catch(error => {
//     console.error('PG database err: ', error);
// });

let dbConfig = {}

dbConfig.pgQuery = (query, values = []) => {
    return new Promise(async (resolve, reject) => {//
        const client = await pool.connect();
        try {
            const { rows } = await client.query(query, values);
            resolve(rows);
        } catch (err) {
            reject(err);
        } finally {
            client.release();
        }
    });
}

module.exports = dbConfig;