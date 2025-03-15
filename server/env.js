const dotenv = require('dotenv');

dotenv.config();

const production = false;

const env =  {
    pg_db_url: production ? process.env.PG_PROD_DATABASE_URL : process.env.PG_DEV_DATABASE_URL,
    mssql_db_url: production ? process.env.MSSQL_PROD_DATABASE_URL : process.env.MSSQL_DEV_DATABASE_URL,
    port: production ? process.env.PROD_PORT : process.env.DEV_PORT,
    jwt_expiry: process.env.JWT_EXPIRY,
    jwt_secret: process.env.JWT_SECRET,
    sendgrid_email: process.env.SENDGRID_EMAIL,
    sendgrid_api_key: process.env.SENDGRID_API_KEY
};

module.exports = env;