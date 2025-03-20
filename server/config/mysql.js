// import { logger } from '../utils/logger.js';
const dotenv = require('dotenv');
const mysql = require('mysql2');
const mssql = require('mssql');

let sqlPackage = {}

sqlPackage.mssqlQuery = async (query, values = []) => {
    try {
        // Connect to the database
        const pool = await mssql.connect(ENVIRONMENT.DB.URL);

        // Create a prepared statement
        const ps = new mssql.PreparedStatement(pool);

        // Input parameters
        values.forEach(val => {
            ps.input(val.name, val.type);
        });

        // Create parameter object
        let params = {};
        values.forEach(val => {
            params[val.name] = val.value;
        });
        
        // Prepare the query
        await ps.prepare(query);

        // Execute the prepared statement with the provided values
        const result = await ps.execute(params);

        // Close the prepared statement
        await ps.unprepare();

        // Return the result
        return result.recordset;
    } catch (err) {
        logger.error({ message: err });
        throw err;
    }
}

const pool = mysql.createPool({
    host: process.env.DB_HOST,      
    user: process.env.DB_USER,          
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE, 
    waitForConnections: true,
    connectionLimit: 10,    
    queueLimit: 3
});

// Get a promise-based interface for the pool
const promisePool = pool.promise();

sqlPackage.dbQuery = promisePool;

// Test the connection
(async () => {
    try {
        const [rows] = await promisePool.query('SELECT 1 + 1 AS result');
        console.log('Database connection successful. Result:', rows[0]?.result);
    } catch (err) {
        console.error('Database connection failed:', err);
    }
})();


sqlPackage.fetchData = async (tableName, value = "", column = "", isWhere = false) => {
    try {
      const [rows] = isWhere ? await promisePool.query(`SELECT * FROM ${tableName} WHERE ${column} = ?`, value) :  await promisePool.query(`SELECT * FROM ${tableName}`);
      return rows;
    } catch (err) {
      console.error('Error fetching data:', err);
      throw err;
    }
}

sqlPackage.insertData = async (data, tableName) => {
    try {
        const [result] = await promisePool.query(`INSERT INTO ${tableName} SET ?`, data);
        return result;
    }
    catch (err) {
        console.error("Error inserting data:", err);
        throw err
    }
};

// sqlPackage.mysqlQuery();

const init = async () => {
    try {
      console.log("***********************")
        await mssqlQuery("SELECT 1");
        console.log('MSSQL database connection successful');
    } catch (err) {
        logger.error({ message: err });
        console.log('MSSQL database connection error: ', err);
    }
}

// init();


module.exports = sqlPackage;