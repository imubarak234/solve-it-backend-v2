const Joi = require('joi');

let schoolSchemaClass = {};

schoolSchemaClass.createSchoolSchema = Joi.object({
  name: Joi.string()
    .required(),
  logo: Joi.string(),
  code: Joi.string()
});

schoolSchemaClass.createFacultySchema = Joi.object({
  name: Joi.string()
    .required(),
  school_id: Joi.number()
    .required(),
  code: Joi.string(), 
});

schoolSchemaClass.createDepartmentSchema = Joi.object({
  name: Joi.string()
    .required(),
  school_id: Joi.number()
    .required(),
  faculty_id: Joi.number()
    .required(),
  code: Joi.string(),
});

schoolSchemaClass.createLevelSchema = Joi.object({
  name: Joi.string()
    .required(),
  school_id: Joi.number()
    .required(),
  code: Joi.string()
})

schoolSchemaClass.getSchoolElementsSchema = Joi.object({
  elementType: Joi.string()
    .valid("Department", "Faculty", "Level", "School")
    .required()
    .messages({
      'any.only': '{{#label}} must ne one of Department, Faculty, Level, or School',
      'any.required': '{{#label}} is required'
    })
})

module.exports = schoolSchemaClass;