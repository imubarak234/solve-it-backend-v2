const joiObj = require('../../utils/joi.js');
const funcObj = require('../../utils/functions.js');
const postSchema = require('../../utils/schemas/postSchemas.js')
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const jwt = require('jsonwebtoken');
const sqlPackage = require('../../config/mysql.js');
const crypto = require('crypto');


dayjs.extend(utc);
dayjs.extend(timezone);
let adminPostClass = {};


adminPostClass.deletePost = async (req, res) => {
  
  try {
      
      const { error, value } = joiObj.deletePostElementSchema.validate(req.body);
          
      if(error) {
          return res.status(400).json({
              status: 400,
              message: error.details
          });
      }
  
      let { postElement, element_id } = value;
  
      let tableName = ""
  
      if(postElement.toLowerCase() == "posts"){ tableName = "news" }
      else if(postElement.toLowerCase() == "post comments") { tableName = "news_comments" }
      else if(postElement.toLowerCase() == "comment replies") { tableName = "news_comment_replies" }
      else if(postElement.toLowerCase() == "post reactions") { tableName = "news_reactions" }
      else if(postElement.toLowerCase() == "post categories") { tableName = "news_categories" }
      else { tableName = "news" }
  
      const postElementExists = await funcObj.getUserData("id", element_id, tableName);
          
      if(!postElementExists) {
          return res.status(409).json({
              status: 409,
              message: `Post Element with ID: ${element_id} does not exist`
          });
      }
  
      const queryResponse = await sqlPackage.dbQuery.query(`UPDATE ${tableName} SET deleted_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}' WHERE id = ${element_id}`);
  
      return res.status(200).json({
        status: 200,
        message: "Post Element Deleted"
      })
    }
    catch (err) {
      return res.status(500).json({
        status: 500,
        message: String(err)
      });
    }
}

adminPostClass.updatePost = async (req, res) => {
  try {

    // postSchema
    const { error, value } = postSchema.updatePostSchema.validate(req.body);
          
      if(error) {
          return res.status(400).json({
              status: 400,
              message: error.details
          });
      }
  
      let { title, excerpt, body, media, id } = value;

      const postData = await funcObj.getUserData("id", id, "news");

      if(!postData) {
        return res.status(409).json({
            statusCode: 409,
            statusMessage: `Post with ID: ${id} does not exists`
        });
    }

    await sqlPackage.dbQuery.query(`UPDATE news SET title = '${title}', excerpt = '${excerpt}', body = '${body}', media = '${media}' where id = ${id}`);

    return res.status(200).json({
      status: 200,
      message: "Post Updated Successfully"
    })

  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    })
  }
}; 

module.exports = adminPostClass;