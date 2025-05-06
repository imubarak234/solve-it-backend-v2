const Joi = require('joi');

let chatSchemaClass = {};

chatSchemaClass.getChatByIdsSchema = Joi.object({
  sender_id: Joi.number()
    .required(),
  receiver_id: Joi.number()
    .required(),
})

module.exports = chatSchemaClass;