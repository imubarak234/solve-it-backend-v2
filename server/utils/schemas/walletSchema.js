const Joi = require('joi');

let walletSchemaClass = {};

walletSchemaClass.createBankAccountSchema = Joi.object({
  bank: Joi.string()
    .required(),
  number: Joi.string()
      .required(),
  user_id: Joi.number()
      .required(),
  name: Joi.string()
      .required(),
})

walletSchemaClass.updateBankAccountSchema = Joi.object({
  id: Joi.number()
    .required(),
  bank: Joi.string()
      .required(),
  number: Joi.string()
      .required(),
  name: Joi.string()
      .required(),
})

walletSchemaClass.createWalletSchema = Joi.object({
  user_id: Joi.number()
    .required(),
  balance: Joi.number()
    .required(),
  school_id: Joi.number()
    .required(),
  bank_account_id: Joi.number()
    .required(),
})

walletSchemaClass.updateWalletSchema = Joi.object({
  user_id: Joi.number()
    .required(),
  amount: Joi.number()
    .required(),
  transaction_type: Joi.string()
    .valid('Credit', 'Debit').messages({
      'any.only': '{{#label}} must be one of Credit or Debit',
      'any.required': '{{#label}} is required'
    })
    .required(),
})

module.exports = walletSchemaClass;