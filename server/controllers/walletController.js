const funcObj = require('../utils/functions.js');

const sqlPackage = require('../config/mysql.js');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const crypto = require('crypto');   

const walletSchema = require('../utils/schemas/walletSchema.js')

let walletControllerClass = {};

dayjs.extend(utc);
dayjs.extend(timezone);

walletControllerClass.createBankAccount = async (req, res) => {

  try {

    const { error, value } = walletSchema.createBankAccountSchema.validate(req.body);
            
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { bank, number, user_id, name } = value;

    code = Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newBankAccount = {
      bank,
      number,
      user_id,
      name,
      code,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
    };

    const insertRes = await sqlPackage.insertData(newPost, "bank_accounts");
    
    return res.status(201).json({
        statusCode: 201,
        statusMessage: "Post created successfully",
    })
    
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

walletControllerClass.updateBankAccount = async (req, res) => {

  try {

    const { error, value } = walletSchema.updateBankAccountSchema.validate(req.body);

    if(error) {
      return res.status(400).json({
          status: 400,
          message: error.details
      });
    }

    let { id, bank, number, name } = value;

    
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}