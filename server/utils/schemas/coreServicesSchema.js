
const Joi = require('joi');

let coreServicesSchemaClass = {};

coreServicesSchemaClass.createCoreServicesSchema = Joi.object({
  school_id: Joi.number()
    .required(),
  provider_id: Joi.number()
    .required(),
  core_service_category_id: Joi.number()
    .required(),
  title: Joi.string()
    .required(),
  description: Joi.string()
    .required(),
  price: Joi.number()
    .required(),
  images: Joi.string(),
  availability: Joi.string()
    .valid("Available", "Sold Out", "Almost Sold Out")
    .required()
    .messages({
      'any.only': '{{#label}} must be one of "Available", "Sold Out", "Almost Sold Out"',
      'any.required': '{{#label}} is required'
    }),
  code: Joi.string(),
});

coreServicesSchemaClass.updateCoreServicesSchema = Joi.object({
  id: Joi.number()
    .required(),
  title: Joi.string()
    .required(),
  description: Joi.string()
    .required(),
  price: Joi.number()
    .required(),
  images: Joi.string(),
  availability: Joi.string()
    .valid("Available", "Sold Out", "Almost Sold Out")
    .required()
    .messages({
      'any.only': '{{#label}} must be one of "Available", "Sold Out", "Almost Sold Out"',
      'any.required': '{{#label}} is required'
    })
});



coreServicesSchemaClass.createCoreServicesRatingSchema = Joi.object({
  school_id: Joi.number()
    .required(),
  provider_id: Joi.number()
    .required(),
  core_service_id: Joi.number()
    .required(),
  core_service_booking_id: Joi.number()
    .required(),
  user_id: Joi.number()
    .required(),
  rating: Joi.number()
    .required(),
  body: Joi.string()
    .required(), 
  code: Joi.string(),
});

coreServicesSchemaClass.updateCoreServicesRatingSchema = Joi.object({
  id: Joi.number()
    .required(),
  rating: Joi.number()
    .required(),
  body: Joi.string()
    .required(), 
});



coreServicesSchemaClass.createCoreServicePaymentSchema = Joi.object({
  school_id: Joi.number()
    .required(),
  provider_id: Joi.number()
    .required(),
  core_service_id: Joi.number()
    .required(),
  core_service_booking_id: Joi.number()
    .required(),
  user_id: Joi.number()
    .required(),
  core_service_escrow_id: Joi.number(),
  amount: Joi.number()
    .required(),
  reference: Joi.string()
    .required(),
  status: Joi.string()
    .valid("Pending", "Completed", "Failed")
    .required()
    .messages({
      'any.only': '{{#label}} must be one of "Pending", "Completed", "Failed"',
      'any.required': '{{#label}} is required'
    }),
  code: Joi.string(),
});

coreServicesSchemaClass.updateCoreServicesPaymentSchema = Joi.object({
  id: Joi.number()
    .required(),
  amount: Joi.number()
    .required(),
  reference: Joi.string()
    .required(),
});

coreServicesSchemaClass.servicesPaymentStatusUpdateSchema = Joi.object({
  id: Joi.number()
    .required(),
  status: Joi.string()
    .valid("Pending", "Completed", "Failed")
    .required()
    .messages({
      'any.only': '{{#label}} must be one of "Pending", "Completed", "Failed"',
      'any.required': '{{#label}} is required'
    }),
});



coreServicesSchemaClass.createServicesEscrowsSchema = Joi.object({
  school_id: Joi.number()
    .required(),
  provider_id: Joi.number()
    .required(),
  core_service_id: Joi.number()
    .required(),
  core_service_booking_id: Joi.number()
    .required(),
  user_id: Joi.number()
    .required(),
  core_service_payment_id: Joi.number()
    .required(),
  amount: Joi.number()
    .required(),
  status: Joi.string()
    .valid("Ongoing", "Completed", "Failed")
    .required()
    .messages({
      'any.only': '{{#label}} must be one of "Pending", "Completed", "Failed"',
      'any.required': '{{#label}} is required'
    }),
  code: Joi.string(),
})

coreServicesSchemaClass.updateCoreServicesEscrowsSchema = Joi.object({
  id: Joi.number()
    .required(),
  amount: Joi.number()
    .required(),
})

coreServicesSchemaClass.servicesEscrowsStatusUpdateSchema = Joi.object({
  id: Joi.number()
    .required(),
  status: Joi.string()
    .valid("Ongoing", "Completed", "Failed")
    .required()
    .messages({
      'any.only': '{{#label}} must be one of "Ongoing", "Completed", "Failed"',
      'any.required': '{{#label}} is required'
    }),
});


coreServicesSchemaClass.createCoreServicesCategorySchema = Joi.object({
  name: Joi.string()
    .required(),
  code: Joi.string(),
});

coreServicesSchemaClass.updateCoreServicesCategorySchema = Joi.object({
  id: Joi.number()
    .required(),
  name: Joi.string()
    .required(),
});


coreServicesSchemaClass.createCoreServicesBookingSchema = Joi.object({
  school_id: Joi.number()
    .required(),
  provider_id: Joi.number()
    .required(),
  core_service_id: Joi.number()
    .required(),
  user_id: Joi.number()
    .required(),
  core_service_escrow_id: Joi.number(),
  core_service_payment_id: Joi.number(),
  amount: Joi.number()
    .required(),
  status: Joi.string()
    .valid("Enquiry", "Completed", "Delivered", "Cancelled")
    .required()
    .messages({
      'any.only': '{{#label}} must be one of "Pending", "Completed", "Delivered", "Cancelled"',
      'any.required': '{{#label}} is required'
    }),
  code: Joi.string(),
});

coreServicesSchemaClass.updateCoreServicesBookingSchema = Joi.object({
  id: Joi.number()
    .required(),
  amount: Joi.number()
    .required(),  
});

coreServicesSchemaClass.BookingStatusUpdateSchema = Joi.object({
  id: Joi.number()
    .required(),
  status: Joi.string()
    .valid("Enquiry", "Completed", "Delivered", "Cancelled")
    .required()
    .messages({
      'any.only': '{{#label}} must be one of "Pending", "Completed", "Delivered", "Cancelled"',
      'any.required': '{{#label}} is required'
    }),
});

coreServicesSchemaClass.createCoreServicesBookingMessage = Joi.object({
  school_id: Joi.number()
    .required(),
  provider_id: Joi.number()
    .required(),
  core_service_id: Joi.number()
    .required(),
  core_service_booking_id: Joi.number()
    .required(),
  user_id: Joi.number()
    .required(),
  message: Joi.string()
    .required(),
  media: Joi.string(),
  videos: Joi.string(),
  documents: Joi.string(),
  voice_notes: Joi.string(),
  sender: Joi.string()
    .valid("Provider", "User")
    .required()
    .messages({
      'any.only': '{{#label}} must be one of "Provider", "User"',
      'any.required': '{{#label}} is required'
    }),
});


module.exports = coreServicesSchemaClass;
