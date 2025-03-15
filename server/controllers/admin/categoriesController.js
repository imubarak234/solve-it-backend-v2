const joiObj = require('../../utils/joi.js');
const funcObj = require('../../utils/functions.js');
const sqlPackage = require('../../config/mysql.js');
const crypto = require('crypto');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');


dayjs.extend(utc);
dayjs.extend(timezone);
let categoriesControllerClass = {};

categoriesControllerClass.addCategory = async (req, res) => {
  try {
  
    const { error, value } = joiObj.createNewsCategoriesSchema.validate(req.body);
        
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { school_id, name, code } = value;

    code = Boolean(code) ? code : Math.random().toString(36).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newsData = await funcObj.getUserData("code", code, "news_categories");
        
    if(newsData) {
        return res.status(409).json({
            status: 409,
            message: `News category with Code: ${code} exists`
        });
    }

    const newPostCategory = {
      school_id,
      name,
      created_at: dayjs().tz('Africa/Lagos').format('YY-MM-DD HH:mm:ss'),
      code
    }


    const insertRes = await sqlPackage.insertData(newPostCategory, "news_categories");

    return res.status(200).json({
        statusCode: 200,
        statusMessage: "Category created successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
};


module.exports = categoriesControllerClass;