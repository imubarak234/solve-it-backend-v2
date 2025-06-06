const Joi = require('joi');

let roleSchemaClass = {};

roleSchemaClass.createRoleSchema = Joi.object({
  name: Joi.string()
    .required(),
  slug: Joi.string()
    .required()
});

roleSchemaClass.createPermissionsSchema = Joi.object({
  name: Joi.string()
    .required(),
  slug: Joi.string()
    .required()
});

roleSchemaClass.updateRoleSchema = Joi.object({
  id: Joi.number()
    .required(),
  name: Joi.string()
    .required(),
  slug: Joi.string()
    .required()
});

roleSchemaClass.mapRolePermissionSchema = Joi.object({
  role_id: Joi.number()
    .required(),
  permission_list: Joi.array()
    .required(),
})

module.exports = roleSchemaClass;