// import Joi from 'joi';
const Joi = require('joi');

let marketSchemaClass = {};

marketSchemaClass.createProductSchema = Joi.object({
  school_id: Joi.number()
    .required(),
  market_product_tag_id: Joi.number()
    .required(),
  student_id: Joi.number(),
  staff_id: Joi.number(),
  lecturer_id: Joi.number(),
  user_id: Joi.number(),
  title: Joi.string()
    .required(),
  description: Joi.string()
    .required(),
  images: Joi.string()
    .required(),
  amount: Joi.string()
    .required(),
  cost: Joi.string()
    .required(),
  location: Joi.string()
    .required(),
  phone: Joi.string()
    .required(),
  whatsapp: Joi.string()
    .required(),
  comment: Joi.string(),
  active: Joi.boolean(),
  code: Joi.string(),
});

marketSchemaClass.createProductTagsSchema = Joi.object({
  school_id: Joi.number()
    .required(),
  name: Joi.string()
    .required(),
  code: Joi.string(),
});

marketSchemaClass.getMarketElements = Joi.object({
  elementType: Joi.string()
  .valid("Products", "Tags", "Comments", "Comment Replies", "Comment Reactions")
  .required()
  .messages({
    'any.only': '{{#label}} must ne one of Products, Tags, Comments, Comment Replies or Comment Reactions',
    'any.required': '{{#label}} is required'
  })
})

marketSchemaClass.deleteMarketElement = Joi.object({
  elementType: Joi.string()
  .valid("Products", "Tags", "Comments", "Comment Replies", "Comment Reactions")
  .required()
  .messages({
    'any.only': '{{#label}} must ne one of Products, Tags, Comments, Comment Replies or Comment Reactions',
    'any.required': '{{#label}} is required'
  }),
  elementId: Joi.number()
    .required()
})



marketSchemaClass.createProductCommentsSchema = Joi.object({
  school_id: Joi.number()
    .required(),
  market_product_id: Joi.number(),
  student_id: Joi.number(),
  staff_id: Joi.number(),
  lecturer_id: Joi.number(),
  user_id: Joi.number(),
  body: Joi.string()
    .required(),
  images: Joi.string(),
  code: Joi.string(),
});

marketSchemaClass.createProductCommentReplySchema = Joi.object({
  school_id: Joi.number()
    .required(),
  market_product_id: Joi.number(),
  market_product_comment_id: Joi.number(),
  student_id: Joi.number(),
  staff_id: Joi.number(),
  lecturer_id: Joi.number(),
  user_id: Joi.number(),
  body: Joi.string(),
  images: Joi.string(),
  code: Joi.string()
});

marketSchemaClass.createProductCommentReactionsSchema = Joi.object({
  school_id: Joi.number()
    .required(),
  market_product_id: Joi.number(),
  market_product_comment_id: Joi.number(),
  market_product_comment_reply_id: Joi.number(),
  student_id: Joi.number(),
  staff_id: Joi.number(),
  lecturer_id: Joi.number(),
  user_id: Joi.number(),
  type: Joi.string()
    .required(),
  code: Joi.string()
});

module.exports = marketSchemaClass;