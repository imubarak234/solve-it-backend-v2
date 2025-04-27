

const funcObj = require('../utils/functions.js');
const sqlPackage = require('../config/mysql.js');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const crypto = require('crypto');
const forumsSchemas = require('../utils/schemas/forumSchema.js')


let forumsControllerClass = {};

dayjs.extend(utc);
dayjs.extend(timezone);

forumsControllerClass.createForum = async (req, res) => {

  try {

    const { error, value } = forumsSchemas.createForumSchema.validate(req.body);
                          
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { school_id, forum_category_id, user_id, title, description, photo, comment } = value;

    let code = Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newForum = { 
      school_id,
      forum_category_id, 
      user_id, 
      title, 
      description, 
      photo, 
      comment, 
      code,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
    }

    await sqlPackage.insertData(newForum, "forums");
    
    return res.status(201).json({
        status: 201,
        message: "Forum created successfully",
    });
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}


forumsControllerClass.updateForum = async (req, res) => {

  try {

    const { error, value } = forumsSchemas.updateForumSchema.validate(req.body);
                          
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { id, title, description, photo, comment } = value;

    const forumData = await funcObj.getUserData("id", id, "forums");
                
    if(!forumData) {
        return res.status(409).json({
            status: 409,
            message: `Forum does not exist`
        });
    }


    await sqlPackage.dbQuery.query(`UPDATE forums SET title = '${title}', description = '${description}', photo = '${photo}', price = '${price}', comment = '${comment}', updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);
        
    return res.status(200).json({
        status: 200,
        message: "Forum updated successfully",
    })
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

forumsControllerClass.getForums = async (req, res) => {

  try {
    const filters = Object.entries(req.query).reduce((acc, [key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});


  let query = 'SELECT * FROM forums';
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

  const [forums] = await sqlPackage.dbQuery.query(query, values);
      
  return res.status(200).json({
    status: 200,
    message: "Forums retrieved successfully",
    data: forums,
    count: forums?.length
  })
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

forumsControllerClass.createForumCategory = async (req, res) => {

  try {

    const { error, value } = forumsSchemas.createForumCategorySchema.validate(req.body);
                          
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { school_id, name } = value;

    let code = Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newForumCategory = { 
      school_id,
      name,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
      code
    }

    await sqlPackage.insertData(newForumCategory, "forum_categories");
    
    return res.status(201).json({
        status: 201,
        message: "Forum category created successfully",
    });
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

forumsControllerClass.updateForumCategory = async (req, res) => {

  try {

    const { error, value } = forumsSchemas.updateForumCategorySchema.validate(req.body);
                          
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { id, name } = value;

    const forumCategoryData = await funcObj.getUserData("id", id, "forum_categories");
                
    if(!forumCategoryData) {
        return res.status(409).json({
            status: 409,
            message: `Forum category does not exist`
        });
    }
    await sqlPackage.dbQuery.query(`UPDATE forum_categories SET name = '${name}', updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);

    return res.status(200).json({
        status: 200,
        message: "Forum category updated successfully",
    })
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

forumsControllerClass.getForumCategories = async (req, res) => {

  try {

    const [forumCategoryList] = await sqlPackage.dbQuery.query(`SELECT * FROM forum_categories WHERE deleted_at IS NULL`);
        
    return res.status(200).json({
      status: 200,
      message: "Forum Category retrieved successfully",
      data: forumCategoryList
    });

  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

forumsControllerClass.  createForumJoinRequest = async (req, res) => {

  try {

    const { error, value } = forumsSchemas.createForumJoinRequestSchema.validate(req.body);
                          
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { school_id, forum_id, user_id } = value;

    code = Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newForumJoinRequest = { 
      school_id,
      forum_id,
      user_id,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
      code,
    }

    await sqlPackage.insertData(newForumJoinRequest, "forum_join_requests");
    
    return res.status(201).json({
        status: 201,
        message: "Forum join request created successfully",
    });
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

forumsControllerClass.updateForumJoinRequest = async (req, res) => {

  try {

    const { error, value } = forumsSchemas.updateForumJoinRequestSchema.validate(req.body);

    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { id, status } = value;

    const forumJoinRequestData = await funcObj.getUserData("id", id, "forum_join_requests");

    if(!forumJoinRequestData) {
        return res.status(409).json({
            status: 409,
            message: `Forum join request does not exist`
        });
    }

    if(status == "Accepted"){
      await sqlPackage.dbQuery.query(`UPDATE forum_join_requests SET accepted = TRUE, accepted_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}' updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);

      code = Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

      const forumUserEntry = {
        school_id: forumJoinRequestData.school_id,
        forum_id: forumJoinRequestData.forum_id,
        user_id: forumJoinRequestData.user_id,
        created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
        forum_join_request_id: id,
        code,
      }; 

      await sqlPackage.insertData(forumUserEntry, "user_forums");
    }
    else {
      await sqlPackage.dbQuery.query(`UPDATE forum_join_requests SET accepted = FALSE, accepted_at = NULL deleted_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);
  }

    res.status(200).json({
        status: 200,
      message: "Forum join request updated successfully",
    })
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

forumsControllerClass.getForumJoinRequests = async (req, res) => {

  try {

    const filters = Object.entries(req.query).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});
  
  
    let query = 'SELECT * FROM forum_join_requests';
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
  
    const [forumJoinRequest] = await sqlPackage.dbQuery.query(query, values);
        
    return res.status(200).json({
      status: 200,
      message: "retrieve successfully",
      data: forumJoinRequest,
      count: forumJoinRequest?.length
    })
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

forumsControllerClass.leaveForum = async (req, res) => {

  try {

    const { error, value } = forumsSchemas.leaveForumSchema.validate(req.body);
                          
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { id, user_id, forum_id, status } = value;

    const forumJoinRequestData = await funcObj.getUserData("id", id, "user_forums");

    if(!forumJoinRequestData) {
        return res.status(409).json({
            status: 409,
            message: `Forum join request does not exist`
        });
    }

    if(status == "Kicked Out") {
      await sqlPackage.dbQuery.query(`UPDATE user_forums SET kicked_out = TRUE, kicked_out_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}' updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);
    }
    else if(status == "Left") {
      await sqlPackage.dbQuery.query(`UPDATE user_forums SET left = TRUE, left_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}' updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);
    }
    else {
      return res.status(409).json({
        status: 409,
        message: `Invalid status`
      });
    }


    res.status(200).json({
        status: 200,
      message: `Forum ${status} successfully`,
    })
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}


module.exports = forumsControllerClass;