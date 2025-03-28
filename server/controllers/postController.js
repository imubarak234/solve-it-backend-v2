const joiObj = require('../utils/joi.js');
const funcObj = require('../utils/functions.js');
const auth = require('../middlewares/jwt.js');
const bcrypt = require('bcryptjs');
const sqlPackage = require('../config/mysql.js');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const crypto = require('crypto');
const { stat } = require('fs');

let postControllerClass = {};

dayjs.extend(utc);
dayjs.extend(timezone);

postControllerClass.createPost = async (req, res) => {

  try {

    const { error, value } = joiObj.createNewsSchema.validate(req.body);
        
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { school_id, news_category_id, title, excerpt, body, media, video, tags, faculties, departments, levels, code } = value;

    code = Boolean(code) ? code : Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newsData = await funcObj.getUserData("code", code, "news");
        
    if(newsData) {
        return res.status(409).json({
            status: 409,
            message: `news with Code: ${code} exists`
        });
    }


    const newPost = {
      school_id,
      news_category_id,
      title,
      excerpt,
      body,
      media,
      video,
      tags,
      faculties,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
      departments,
      levels,
      code
    }


    const insertRes = await sqlPackage.insertData(newPost, "news");

    return res.status(200).json({
        statusCode: 200,
        statusMessage: "Post created successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    });
  }
};

postControllerClass.createPostCategory = async (req, res) => {

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
        statusMessage: "Post created successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    });
  }
};

postControllerClass.createPostCommentReply = async (req, res) => {
  try {

    const { error, value } = joiObj.createNewsCommentReplySchema.validate(req.body);
        
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { school_id, news_id, news_comment_id, student_id, staff_id, lecturer_id, user_id, body, images, code } = value;

    code = Boolean(code) ? code : Math.random().toString(36).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newsCommentReply = await funcObj.getUserData("code", code, "news_comment_replies");
        
    if(newsCommentReply) {
        return res.status(409).json({
            status: 409,
            message: `news comment reply with Code: ${code} exists`
        });
    }

    const newPostCommentReply = {
      school_id,
      news_id,
      news_comment_id,
      student_id,
      staff_id,
      lecturer_id,
      user_id,
      body,
      images,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
      code
    }


    const insertRes = await sqlPackage.insertData(newPostCommentReply, "news_comment_replies");

    return res.status(200).json({
        statusCode: 200,
        statusMessage: "News Comment Reply created successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    });
  }
};

postControllerClass.createPostComments = async (req, res) => {

  try {

    const { error, value } = joiObj.createNewsCommentSchema.validate(req.body);
        
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { school_id, news_id, student_id, staff_id, lecturer_id, user_id, body, images, code } = value;

    code = Boolean(code) ? code : Math.random().toString(36).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newPostComment = {
      school_id,
      news_id,
      student_id,
      staff_id,
      lecturer_id,
      user_id,
      body,
      images,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
      code
    }


    const insertRes = await sqlPackage.insertData(newPostComment, "news_comment_replies");

    return res.status(200).json({
        statusCode: 200,
        statusMessage: "News Comment Reply created successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    });
  }
};

postControllerClass.createPostReaction = async (req, res) => {

  try {

    const { error, value } = joiObj.createNewsReactionsSchema.validate(req.body);
        
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { school_id, news_id, student_id, staff_id, lecturer_id, user_id, type, code } = value;

    code = Boolean(code) ? code : Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const postReactions = await funcObj.getUserData("code", code, "news_reactions");
        
    if(postReactions) {
        return res.status(409).json({
            status: 409,
            message: `post reaction with Code: ${code} exists`
        });
    }

    const newPostReactions = {
      school_id,
      news_id,
      student_id,
      staff_id,
      lecturer_id,
      user_id,
      type,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
      code
    }


    const insertRes = await sqlPackage.insertData(newPostReactions, "news_reactions");

    return res.status(200).json({
        statusCode: 200,
        statusMessage: "Post reaction created successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    });
  }
};

postControllerClass.getPostElements = async (req, res) => {

  try {

    const { error, value } = joiObj.getPostElementsSchema.validate(req.body);
        
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { postElement, searchCriteria, searchValue } = value;

    let tableName = ""

    if(postElement == "Posts"){ tableName = "news" }
    else if(postElement == "Post Comments") { tableName = "news_comments" }
    else if(postElement == "Comment Replies") { tableName = "news_comment_replies" }
    else if(postElement == "Post Reactions") { tableName = "news_reactions" }
    else if(postElement == "Post Categories") { tableName = "news_categories" }
    else { tableName = "news" }
    console.log(postElement, searchCriteria, searchValue)

    const queryResponse = await sqlPackage.fetchData(tableName, searchValue, searchCriteria, true);

    return res.status(200).json({
      status: 200,
      message: "Fetch Successful",
      data: queryResponse,
    });

    // getPostElementsSchema
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    })
  }
};

postControllerClass.deletePostElement = async (req, res) => {

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

    if(postElement.toLowerCase() == "Posts"){ tableName = "news" }
    else if(postElement.toLowerCase() == "Post Comments") { tableName = "news_comments" }
    else if(postElement.toLowerCase() == "Comment Replies") { tableName = "news_comment_replies" }
    else if(postElement.toLowerCase() == "Post Reactions") { tableName = "news_reactions" }
    else if(postElement.toLowerCase() == "Post Categories") { tableName = "news_categories" }
    else { tableName = "news" }

    const postElementExists = await funcObj.getUserData("id", element_id, tableName);
        
    if(!postElementExists) {
        return res.status(409).json({
            status: 409,
            message: `Post Element with ID: ${element_id} does not exist`
        });
    }
    
    await sqlPackage.dbQuery.query(`UPDATE ${tableName} SET deleted_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}' WHERE id = ${element_id}`);

    return res.status(200).json({
      status: 200,
      message: "Post Element Deleted"
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Errors"
    });
  }
};

module.exports = postControllerClass;
