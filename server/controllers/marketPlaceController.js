
const sqlPackage = require('../config/mysql.js');
const crypto = require('crypto');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const marketSchema = require('../utils/schemas/marketSchemas.js');
const { table } = require('console');
const funcObj = require('../utils/functions.js')

dayjs.extend(utc);
dayjs.extend(timezone);

let marketPlaceControllerClass = {};

marketPlaceControllerClass.createProduct = async (req, res) => {

  try {

    const { error, value } = marketSchema.createProductSchema.validate(req.body);
                  
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { 
      school_id, 
      market_product_tag_id, 
      user_id,
      title,
      description,
      images,
      amount,
      cost,
      location,
      phone,
      whatsapp,
      comment,
      code
    } = value;

    code = Boolean(code) ? code : Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newProduct = {
      school_id,
      market_product_tag_id,
      user_id,
      title,
      description,
      images,
      amount,
      cost,
      location,
      phone,
      whatsapp,
      comment,
      code,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
    }

    await sqlPackage.insertData(newProduct, "market_products");
    
    return res.status(201).json({
        status: 201,
        message: "Product created successfully",
    })
  }
  catch(err) {
    return res.status(500).json({
      message: String(err),
      status: 500
    });
  }
}

marketPlaceControllerClass.updateProduct = async (req, res) => {

  try {

    const { error, value } = marketSchema.updateProductSchema.validate(req.body);
                  
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { id, title, description, images, amount, cost, location, phone } = value;

    const productData = await funcObj.getUserData("id", id, "market_products");
                
    if(!productData) {
        return res.status(409).json({
            status: 409,
            message: `product does not exist`
        });
    }


    await sqlPackage.dbQuery.query(`UPDATE market_products SET title = '${title}', description = '${description}', images = '${images}', amount = '${amount}', cost = '${cost}', location = '${location}', phone = '${phone}', updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);
        
    return res.status(200).json({
        status: 200,
        message: "Product updated successfully",
    })
  }
  catch(err) {
    return res.status(500).json({
      message: String(err),
      status: 500
    })
  }
}

marketPlaceControllerClass.getMarketElements = async (req, res) => {

  try {

    const { error, value } = marketSchema.getMarketElements.validate(req.body);
                  
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { elementType } = value;
    let tableName = ""; 

    if(elementType == "Products") tableName = "market_products"
    else if(elementType == "Tags") tableName = "market_product_tags"
    else if(elementType == "Comments") tableName = "market_product_comments"
    else if(elementType == "Comment Replies") tableName = "market_product_comment_replies"
    else if(elementType == "Comment Reactions") tableName = "market_product_comment_reactions"
    else tableName = "market_products"

    const [products] = await sqlPackage.dbQuery.query(`SELECT * FROM ${tableName} WHERE deleted_at IS NULL`);
    
    return res.status(200).json({
      status: 200,
      message: "Market place retrieved successfully",
      data: products
    })
  }
  catch(err) {
    return res.status(500).json({
      message: String(err),
      status: 500
    });
  }
}

marketPlaceControllerClass.deleteProductElement = async (req, res) => {

  try {

    const { error, value } = marketSchema.deleteMarketElement.validate(req.body);
                  
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { elementType, elementId } = value;
    let tableName = ""; 

    if(elementType == "Products") tableName = "market_products"
    else if(elementType == "Tags") tableName = "market_product_tags"
    else if(elementType == "Comments") tableName = "market_product_comments"
    else if(elementType == "Comment Replies") tableName = "market_product_comment_replies"
    else if(elementType == "Comment Reactions") tableName = "market_product_comment_reactions"
    else tableName = "market_products";

    await sqlPackage.dbQuery.query(`UPDATE ${tableName} SET deleted_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}' WHERE id = ${elementId}`);
    
    return res.status(200).json({
      status: 200,
      message: "Delete successfully",
    })
  }
  catch(err){
    return res.status(500).json({
      message: String(err),
      status: 500
    })
  }
}

marketPlaceControllerClass.createProductTags = async (req, res) => {

  try {

    const { error, value } = marketSchema.createProductTagsSchema.validate(req.body);
                  
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { 
      school_id, 
      name,
      code
    } = value;

    code = Boolean(code) ? code : Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newProductTag = {
      school_id,
      name,
      code,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
    }

    await sqlPackage.insertData(newProductTag, "market_product_tags");
    
    return res.status(200).json({
        status: 200,
        message: "Product Tag created successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      message: String(err),
      status: 500
    })
  }
}

marketPlaceControllerClass.updateTags = async (req, res) => {

  try {

    const { error, value } = marketSchema.updateProductTagsSchema.validate(req.body);
                  
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { id, name } = value;

    const tagData = await funcObj.getUserData("id", id, "market_product_tags");
                
    if(!tagData) {
        return res.status(409).json({
            status: 409,
            message: `tags does not exist`
        });
    }
    

    await sqlPackage.dbQuery.query(`UPDATE market_product_tags SET name = '${name}', updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);
        
    return res.status(200).json({
        status: 200,
        message: "Product Tag updated successfully",
    })
  }
  catch(err) {
    return res.status(500).json({
      message: String(err),
      status: 500
    })
  }
}

marketPlaceControllerClass.createProductComment = async (req, res) => {

  try {

    const { error, value } = marketSchema.createProductCommentsSchema.validate(req.body);
            
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { school_id, market_product_id, user_id, body, images, code } = value;

    code = Boolean(code) ? code : Math.random().toString(36).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newComment = {
      school_id,
      market_product_id,
      user_id,
      body,
      images,
      code,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
    }

    await sqlPackage.insertData(newComment, "market_product_comments");
    
    return res.status(200).json({
        status: 200,
        message: "Product Comment created successfully",
    })

  }
  catch(err) {
    return res.status(500).json({
      message: String(err),
      status: 500
    })
  }
}

marketPlaceControllerClass.updateProductComment = async (req, res) => {

  try {

    const { error, value } = marketSchema.updateProductCommentSchema.validate(req.body);
                  
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { id, body, commentType } = value;

    let tableName = "";

    if(commentType == "Comment") tableName = "market_product_comments"
    else if(commentType == "Reply") tableName = "market_product_comment_replies"
    else tableName = "market_product_comments" 

    const commentData = await funcObj.getUserData("id", id, tableName);
                
    if(!commentData) {
      return res.status(409).json({
          status: 409,
          message: `comment does not exist`
      });
    }

    await sqlPackage.dbQuery.query(`UPDATE ${tableName} SET body = '${body}', updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);
        
    return res.status(200).json({
        status: 200,
        message: "Product Comment/Reply updated successfully",
    })
  }
  catch(err) {
    return res.status(500).json({
      message: String(err),
      status: 500
    })
  }
}

marketPlaceControllerClass.createProductCommentReply = async (req, res) => {

  try {

    const { error, value } = marketSchema.createProductCommentReplySchema.validate(req.body);
            
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { school_id, market_product_id, market_product_comment_id, student_id, staff_id, lecturer_id, user_id, body, images, code } = value;

    code = Boolean(code) ? code : Math.random().toString(36).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newCommentReply = {
      school_id,
      market_product_id,
      student_id,
      staff_id,
      lecturer_id,
      user_id,
      body,
      images,
      code,
      market_product_comment_id,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
    }

    await sqlPackage.insertData(newCommentReply, "market_product_comment_replies");

    return res.status(200).json({
      status: 200,
      message: "Product Comment Reply created successfully",
    })
  }
  catch(err) {
    return res.status(500).json({
      message: String(err),
      status: 500
    })
  }
}

marketPlaceControllerClass.createProductCommentReaction = async (req, res) => {

  try {

    const { error, value } = marketSchema.createProductCommentReactionsSchema.validate(req.body);
            
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { school_id, market_product_id, market_product_comment_id, market_product_comment_reply_id, student_id, staff_id, lecturer_id, user_id, type, code } = value;

    code = Boolean(code) ? code : Math.random().toString(36).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newCommentReaction = {
      school_id,
      market_product_id,
      student_id,
      staff_id,
      lecturer_id,
      user_id,
      code,
      market_product_comment_id,
      market_product_comment_reply_id,
      type,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
    }

    await sqlPackage.insertData(newCommentReaction, "market_product_comment_reactions");

    return res.status(200).json({
      status: 200,
      message: "Product Comment created successfully",
    })
  }
  catch(err) {
    return res.status(500).json({
      message: String(err),
      status: 500
    });
  }
}

marketPlaceControllerClass.updateProductCommentReaction = async (req, res) => {

  try {

    const { error, value } = marketSchema.updateProductCommentReaction.validate(req.body);
                  
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { id, type } = value;

    const commentData = await funcObj.getUserData("id", id, "market_product_comment_reactions");
                
    if(!commentData) {
      return res.status(409).json({
          status: 409,
          message: `comment does not exist`
      });
    }

    await sqlPackage.dbQuery.query(`UPDATE market_product_comment_reactions SET type = '${type}', updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);
        
    return res.status(200).json({
        status: 200,
        message: "Comment Reaction updated successfully",
    })
  }
  catch(err) {
    return res.status(500).json({
      message: String(err),
      status: 500
    });
  }
}


module.exports = marketPlaceControllerClass;