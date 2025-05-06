const sqlPackage = require('../config/mysql.js');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const crypto = require('crypto');
const chatSchemas = require('../utils/schemas/chatSchemas.js')

let chatControllerClass = {};

dayjs.extend(utc);
dayjs.extend(timezone);

chatControllerClass.createChat = async (data) => {

  try {

    const { school_id, sender_id, receiver_id, message } = data;

    const code = crypto.randomUUID();
    const created_at = dayjs().tz("Africa/Lagos").format("YYYY-MM-DD HH:mm:ss");
    const user_chat_id = crypto.randomUUID();
    const sender_type = "user";

    const sql = `INSERT INTO chat_messages (school_id, user_chat_id, sender_id, receiver_id, code, created_at, message, sender_type) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [school_id, user_chat_id, sender_id, receiver_id, code, created_at, message, sender_type];
    const result = await sqlPackage.dbQuery.query(sql, values);

    if (result[0].affectedRows > 0) {
      return {
        status: 200,
        message: "Chat created successfully",
        data: {
          user_chat_id,
          code,
          created_at,
          message,
          sender_type
        }
      };
    } else {
      return {
        status: 500,
        message: "Failed to create chat"
      };
    }
    
  }
  catch (err) {
    return {
      status: 500,
      message: String(err)
    };
  }
}

chatControllerClass.getChatByIds = async (req, res) => {

  try {

    const { error, value } = chatSchemas.getChatByIdsSchema.validate(req.body);

    if(error) {
      return res.status(400).json({
          status: 400,
          message: error.details
      });
    }

    let { sender_id, receiver_id } = value;

    const sql = `SELECT * FROM chat_messages WHERE (sender_id = ? AND receiver_id = ?) ORDER BY created_at DESC`;
    const values = [sender_id, receiver_id];
    const result = await sqlPackage.dbQuery.query(sql, values);

    return res.status(200).json({
      status: 200,
      message: "Chat fetched successfully",
      data: result[0]
    });
  }
  catch (err) {
    return {
      status: 500,
      message: String(err)
    };
  }
}

module.exports = chatControllerClass;