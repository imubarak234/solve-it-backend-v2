
const Joi = require('joi');

let forumSchemaClass = {};

forumSchemaClass.createForumSchema = Joi.object({
  school_id: Joi.number()
    .required(),
  forum_category_id: Joi.number()
    .required(),
  user_id: Joi.number()
    .required(),
  title: Joi.string()
    .required(),
  description: Joi.string()
    .required(),
  photo: Joi.string()
    .optional()
    .allow(null, ''),
  comment: Joi.string()
    .optional()
    .allow(null, ''),
})

forumSchemaClass.updateForumSchema = Joi.object({
  id: Joi.number()
    .required(),
  title: Joi.string()
    .required(),
  description: Joi.string()
    .required(),
  photo: Joi.string()
    .optional()
    .allow(null, ''),
  comment: Joi.string()
    .optional()
    .allow(null, ''),
})

forumSchemaClass.createForumCategorySchema = Joi.object({
  school_id: Joi.number()
    .required(),
  name: Joi.string()
    .required(),
});

forumSchemaClass.updateForumCategorySchema = Joi.object({
  id: Joi.number()
    .required(),
  name: Joi.string()
    .required(),
});

forumSchemaClass.createForumJoinRequestSchema = Joi.object({
  school_id: Joi.number()
    .required(),
  forum_id: Joi.number()
    .required(),
  user_id: Joi.number()
    .required(),
});

forumSchemaClass.updateForumJoinRequestSchema = Joi.object({
  id: Joi.number()
    .required(),
  status: Joi.string()
    .valid("Accepted", "Rejected")
    .required()
    .messages({
      'any.only': '{{#label}} must be one of "Accepted", "Rejected"',
      'any.required': '{{#label}} is required'
    }),
});

forumSchemaClass.leaveForumSchema = Joi.object({
  id: Joi.number()
    .required(),
  user_id: Joi.number()
    .required(),
  forum_id: Joi.number()
    .required(),
  status: Joi.string()
    .valid("Kicked Out", "Left")
    .required()
    .messages({
      'any.only': '{{#label}} must be one of "Kicked Out", "Left"',
      'any.required': '{{#label}} is required'
    }),
})