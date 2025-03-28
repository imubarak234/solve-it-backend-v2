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

marketSchemaClass.updateProductSchema = Joi.object({
  id: Joi.number()
    .required(),
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
    .required()
})

marketSchemaClass.createProductTagsSchema = Joi.object({
  school_id: Joi.number()
    .required(),
  name: Joi.string()
    .required(),
  code: Joi.string(),
});

marketSchemaClass.updateProductTagsSchema = Joi.object({
  id: Joi.number()
    .required(),
  name: Joi.string()
    .required()
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

marketSchemaClass.updateProductCommentSchema = Joi.object({
  id: Joi.number()
    .required(),
  body: Joi.string()
    .required(),
  commentType: Joi.string()
  .valid("Comment", "Reply")
  .required()
  .messages({
    'any.only': '{{#label}} must ne one of Comment, Reply',
    'any.required': '{{#label}} is required'
  }),
})

marketSchemaClass.createProductCommentReplySchema = Joi.object({
  school_id: Joi.number()
    .required(),
  market_product_id: Joi.number(),
  market_product_comment_id: Joi.number(),
  student_id: Joi.number(),
  staff_id: Joi.number(),
  lecturer_id: Joi.number(),
  user_id: Joi.number(),
  body: Joi.string()
    .required(),
  images: Joi.string(),
  code: Joi.string()
});

marketSchemaClass.createProductCommentReactionsSchema = Joi.object({
  school_id: Joi.number()
    .required(),
  market_product_id: Joi.number()
    .required(),
  market_product_comment_id: Joi.number(),
  market_product_comment_reply_id: Joi.number(),
  student_id: Joi.number(),
  staff_id: Joi.number(),
  lecturer_id: Joi.number(),
  user_id: Joi.number(),
  type: Joi.string()
    .valid("Like", "Dislike")
    .required()
    .messages({
      'any.only': '{{#label}} must ne one of "Like", "Dislike"',
      'any.required': '{{#label}} is required'
    }),
  code: Joi.string()
});

marketSchemaClass.updateProductCommentReaction = Joi.object({
  id: Joi.number()
    .required(),
  type: Joi.string()
    .valid("Like", "Dislike")
    .required()
    .messages({
      'any.only': '{{#label}} must ne one of "Like", "Dislike"',
      'any.required': '{{#label}} is required'
    }),
});

module.exports = marketSchemaClass;