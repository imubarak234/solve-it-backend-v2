const Joi = require('joi');

let userCategorySchemaClass = {};

userCategorySchemaClass.createUserCategorySchema = Joi.object({
  name: Joi.string()
    .required(),
  code: Joi.string()
})

userCategorySchemaClass.updateUserCategorySchema = Joi.object({
  id: Joi.number()
    .required(),
  name: Joi.string()
    .required(),
})

module.exports = userCategorySchemaClass;