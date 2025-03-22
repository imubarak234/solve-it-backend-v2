const joiObj = require('../utils/joi.js');
const funcObj = require('../utils/functions.js');
const auth = require('../middlewares/jwt.js');
const bcrypt = require('bcryptjs');
const sqlPackage = require('../config/mysql.js');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const crypto = require('crypto');

let chatControllerClass = {};

dayjs.extend(utc);
dayjs.extend(timezone);

chatControllerClass.createChat = async (req, res) => {

  try {}
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}