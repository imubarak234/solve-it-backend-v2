// import Joi from 'joi';
const Joi = require('joi');
const { search } = require('../routes/admin');

let joiObj = {};

joiObj.setupSchema = Joi.object({
    username: Joi.string()
        .required(),
    password: Joi.string()
        .required()
});

joiObj.loginSchema = Joi.object({
    username: Joi.string()
        .required(),
    password: Joi.string()
        .required()
});

joiObj.passwordReset = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    oldPassword: Joi.string()
        .required(),
    newPassword: Joi.string()
        .required()
});

joiObj.appLoginSchema = Joi.object({
    app_id: Joi.string()
        .required(),
    api_key: Joi.string()
        .required()
});

joiObj.emailLoginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .required()
});

joiObj.phoneLoginSchema = Joi.object({
    phone: Joi.string()
        .required(),
    password: Joi.string()
        .required()
});

joiObj.resendTokenSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
});

joiObj.emailVerify = Joi.object({
    email: Joi.string()
        .required()
        .email(),
    token: Joi.string()
        .required()
})

joiObj.institutionSchema = Joi.object({
    inst_code: Joi.string()
        .length(5)
        .required(),
    inst_name: Joi.string()
        .required(),
    inst_email: Joi.string()
        .email()
        .required(),
    inst_phone: Joi.string()
        .required()
});

joiObj.createUserSchema = Joi.object({
    role_id: Joi.number()
        .required(),
    name: Joi.string()
        .required(),
    email: Joi.string()
        .required()
        .email(),
    phone: Joi.string()
        .required(),
    dob: Joi.string()
        .required(),
    gender: Joi.string()
        .required(),
    school_id: Joi.number()
        .required(),
    password: Joi.string(),
    faculty_id: Joi.number(),
    department_id: Joi.number(),
    level_id: Joi.number(),
    matric_number: Joi.string()
});

///////////////////////////   News Section ////////////////////////////////

joiObj.createNewsSchema = Joi.object({
    school_id: Joi.number(),
    news_category_id: Joi.number(),
    title: Joi.string()
        .required(),
    excerpt: Joi.string(),
    body: Joi.string()
        .required(),
    user_id: Joi.number()
        .required(),
    video: Joi.string(),
    tags: Joi.string(),
    code: Joi.string(),
    departments: Joi.string(),
    faculties: Joi.string(),
});

joiObj.createNewsReactionsSchema = Joi.object({
    school_id: Joi.number()
        .required(),
    news_id: Joi.number()
        .required(),
    user_id: Joi.number()
        .required(),
    type: Joi.string()
        .valid("Like", "Dislike")
        .required()
        .messages({
          'any.only': '{{#label}} must ne one of "Like", "Dislike"',
          'any.required': '{{#label}} is required'
        }),
    code: Joi.string(),
});

joiObj.createNewsCommentReactionsSchema = Joi.object({
    school_id: Joi.number()
        .required(),
    news_id: Joi.number()
        .required(),
    user_id: Joi.number()
        .required(),
    type: Joi.string()
        .valid("Like", "Dislike")
        .required()
        .messages({
          'any.only': '{{#label}} must ne one of "Like", "Dislike"',
          'any.required': '{{#label}} is required'
        }),
    code: Joi.string(),
    news_comment_id: Joi.number(),
    news_comment_reply_id: Joi.number(),
})

joiObj.createNewsCategoriesSchema = Joi.object({
    school_id: Joi.number()
        .required(),
    name: Joi.string()
        .required(),
    code: Joi.string(),
});

joiObj.createNewsCommentReplySchema = Joi.object({
    school_id: Joi.number()
        .required(),
    news_id: Joi.number()
        .required(),
    news_comment_id: Joi.number()
        .required(),
    user_id: Joi.number()
        .required(),
    body: Joi.string()
        .required(),
    images: Joi.string(),
    code: Joi.string(),
});

joiObj.createNewsCommentSchema = Joi.object({
    school_id: Joi.number()
        .required(),
    news_id: Joi.number()
        .required(),
    user_id: Joi.number()
        .required(),
    body: Joi.string()
        .required(),
    images: Joi.string(),
    code: Joi.string(),
});

joiObj.getPostElementsSchema = Joi.object({
    postElement: Joi.string()
        .required(),
        postElement: Joi.string()
      .valid("Posts", "Post Comments", "Comment Replies", "Post Reactions", "Post Categories")
      .required()
      .messages({
        'any.only': '{{#label}} must ne one of Posts, Post Comments, Comment Replies, Post Reactions or Post Categories',
        'any.required': '{{#label}} is required'
      }),
});

joiObj.deletePostElementSchema = Joi.object({
    postElement: Joi.string()
        .required(),
        postElement: Joi.string()
      .valid("Posts", "Post Comments", "Comment Replies", "Post Reactions", "Post Categories")
      .required()
      .messages({
        'any.only': '{{#label}} must ne one of Posts, Post Comments, Comment Replies, Post Reactions or Post Categories',
        'any.required': '{{#label}} is required'
      }),
    element_id: Joi.number()
        .required(),
});

joiObj.createStudentSchema = Joi.object({
    role_id: Joi.number()
        .required(),
    name: Joi.string()
        .required(),
    email: Joi.string()
        .required(),
    phone: Joi.string()
        .required(),
    interests: Joi.string()
        .required(),
    dob: Joi.date()
        .required(),
    gender: Joi.string()
        .required(),
    school_id: Joi.number()
        .required(),
    faculty_id: Joi.number()
        .required(),
    department_id: Joi.number()
        .required(),
    level_id: Joi.number()
        .required(),
    password: Joi.string(),
    matric_number: Joi.string()
        .required()
});


joiObj.requestSchema = Joi.object({
    inst_code: Joi.string()
        .length(5)
        .required(),
    callback_url: Joi.string()
        .required(),
    req_payload: Joi.object()
        .required(),
});


module.exports = joiObj;