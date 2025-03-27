
const sqlPackage = require('../config/mysql.js');
const crypto = require('crypto');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const marketSchema = require('../utils/schemas/marketSchemas.js');
const { table } = require('console');

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
      student_id, 
      staff_id, 
      lecturer_id, 
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
      student_id,
      staff_id,
      lecturer_id,
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
    
    return res.status(200).json({
        statusCode: 200,
        statusMessage: "Product created successfully",
    })
  }
  catch(err) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500
    });
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

    const products = await sqlPackage.dbQuery.query(`SELECT * FROM ${tableName} WHERE deleted_at IS NULL`);
    
    return res.status(200).json({
      status: 200,
      message: "Market place retrieved successfully",
      data: products
    })
  }
  catch(err) {
    return res.status(500).json({
      message: "Internal Server Error",
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
      message: "Internal Server Error",
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
        statusCode: 200,
        statusMessage: "Product Tag created successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500
    })
  }
}


module.exports = marketPlaceControllerClass;