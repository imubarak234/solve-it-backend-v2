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

    let { school_id, news_category_id, title, excerpt, body, video, tags, faculties, departments, code, user_id } = value;

    code = Boolean(code) ? code : Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newsData = await funcObj.getUserData("code", code, "news");
        
    if(newsData) {
        return res.status(409).json({
            status: 409,
            message: `news with Code: ${code} exists`
        });
    }

    const imagePath = req?.file?.path || "";
    const newPost = {
      school_id,
      news_category_id,
      title,
      excerpt,
      body,
      media: imagePath,
      video,
      tags,
      faculties,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
      departments,
      code,
      user_id
    }


    const insertRes = await sqlPackage.insertData(newPost, "news");

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

    let { school_id, news_id, news_comment_id, user_id, body, images, code } = value;

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
      user_id,
      body,
      images,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
      code
    }


    const insertRes = await sqlPackage.insertData(newPostCommentReply, "news_comment_replies");

    return res.status(201).json({
        statusCode: 201,
        statusMessage: "News Comment Reply created successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
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

    let { school_id, news_id, user_id, body, images, code } = value;

    code = Boolean(code) ? code : Math.random().toString(36).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newPostComment = {
      school_id,
      news_id,
      user_id,
      body,
      images,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
      code
    }


    const insertRes = await sqlPackage.insertData(newPostComment, "news_comments");

    return res.status(200).json({
        status: 200,
        message: "News Comment created successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
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

    let { school_id, news_id, user_id, type, code } = value;

    code = Boolean(code) ? code : Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newPostReactions = {
      school_id,
      news_id,
      user_id,
      type,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
      code
    }


    const insertRes = await sqlPackage.insertData(newPostReactions, "news_reactions");

    return res.status(201).json({
        status: 201,
        message: "Post reaction created successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
};

postControllerClass.createPostCommentReaction = async (req, res) => {

  try {

    const { error, value } = joiObj.createNewsCommentReactionsSchema.validate(req.body);
        
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { school_id, news_id, news_comment_id, news_comment_reply_id, user_id, type, code } = value;

    code = Boolean(code) ? code : Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newPostReactions = {
      school_id,
      news_id,
      news_comment_id,
      news_comment_reply_id,
      user_id,
      type,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
      code
    }


    const insertRes = await sqlPackage.insertData(newPostReactions, "news_comment_reactions");

    return res.status(201).json({
        status: 201,
        message: "Post Comment reaction created successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

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
    // console.log(postElement, searchCriteria, searchValue)

    // const queryResponse = await sqlPackage.fetchData(tableName, searchValue, searchCriteria, true);

    const [postsList] = await sqlPackage.dbQuery.query(`SELECT * FROM ${tableName} WHERE deleted_at IS NULL`);

    return res.status(200).json({
      status: 200,
      message: "Fetch Successful",
      data: postsList,
    });

    // getPostElementsSchema
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    })
  }
};

postControllerClass.getCommentsReplies = async (req, res) => {
  try {

    const filters = Object.entries(req.query).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    let query = 'SELECT * FROM news_comment_replies';
    const values = [];
    const conditions = [];

    Object.entries(filters).forEach(([key, value], index) => {
      conditions.push(`${key} = ?`);
      values.push(value);
    });

    if (conditions.length) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    if(query.includes("AND")){
      query += ' AND deleted_at IS NULL';
    }
    else if(query.includes("WHERE")){
      query += ' AND deleted_at IS NULL';
    }
    else {
      query += ' WHERE deleted_at IS NULL';
    }

    const [news_comments] = await sqlPackage.dbQuery.query(query, values);
        
    return res.status(200).json({
      status: 200,
      message: "Post Comments Replies retrieved successfully",
      data: news_comments,
      count: news_comments?.length
    })
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

postControllerClass.getComments = async (req, res) => {

  try {

    const filters = Object.entries(req.query).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});


    let query = 'SELECT * FROM news_comments';
    const values = [];
    const conditions = [];

    Object.entries(filters).forEach(([key, value], index) => {
      conditions.push(`${key} = ?`);
      values.push(value);
    });

    if (conditions.length) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    if(query.includes("AND")){
      query += ' AND deleted_at IS NULL';
    }
    else if(query.includes("WHERE")){
      query += ' AND deleted_at IS NULL';
    }
    else {
      query += ' WHERE deleted_at IS NULL';
    }

    const [news_comments] = await sqlPackage.dbQuery.query(query, values);
        
    return res.status(200).json({
      status: 200,
      message: "Post Comments retrieved successfully",
      data: news_comments,
      count: news_comments?.length
    })
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

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
      message: String(err)
    });
  }
};

module.exports = postControllerClass;
