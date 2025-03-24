
const Joi = require('joi');

let postSchemaClass = {};

postSchemaClass.updatePostSchema = Joi.object({
  title: Joi.string()
    .required(),
  excerpt: Joi.string()
    .required(),
  body: Joi.string()
    .required(),
  media: Joi.string(),
  id: Joi.number()
    .required() 
});

module.exports = postSchemaClass;