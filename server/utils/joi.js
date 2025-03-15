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
        .length(11)
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
    media: Joi.string(),
    video: Joi.string(),
    tags: Joi.string(),
    faculties: Joi.string(),
    departments: Joi.string(),
    levels: Joi.string(),
    code: Joi.string(),
});

joiObj.createNewsReactionsSchema = Joi.object({
    school_id: Joi.number()
        .required(),
    news_id: Joi.number()
        .required(),
    student_id: Joi.number(),
    staff_id: Joi.number(),
    lecturer_id: Joi.number(),
    user_id: Joi.number(),
    type: Joi.string()
        .required(),
    code: Joi.string(),
});

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
    student_id: Joi.number(),
    staff_id: Joi.number(),
    lecturer_id: Joi.number(),
    user_id: Joi.number(),
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
    student_id: Joi.number(),
    staff_id: Joi.number(),
    lecturer_id: Joi.number(),
    user_id: Joi.number(),
    body: Joi.string()
        .required(),
    images: Joi.string(),
    code: Joi.string(),
});

joiObj.getPostElementsSchema = Joi.object({
    postElement: Joi.string()
        .required(),
    searchCriteria: Joi.string()
        .required(),
    searchValue: Joi.string()
        .required()
});

joiObj.deletePostElementSchema = Joi.object({
    postElement: Joi.string()
        .required(),
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
    password: Joi.string()
});

joiObj.updateInstitutionSchema = Joi.object({
    inst_code: Joi.string()
        .length(5)
        .required(),
    inst_name: Joi.string(),
    inst_email: Joi.string()
        .email(),
    inst_phone: Joi.string(),
    new_inst_code: Joi.string()
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

joiObj.appSchema = Joi.object({
    inst_code: Joi.string()
        .length(5)
        .required(),
    app_name: Joi.string()
        .required(),
    app_id: Joi.string()
        .email()
        .required()
});

// This schema is for validation the payload for updating the user/app information from admin routes
joiObj.updateAppSchema = Joi.object({
    inst_code: Joi.string()
        .length(5),
    app_name: Joi.string(),
    app_id: Joi.string()
        .email()
        .required(),
    new_app_id: Joi.string()
        .email(),
    api_key: Joi.string()
});

// This schema is for validating the payload for updating app/user information form app routes
joiObj.updateAppUserSchema = Joi.object({
    app_name: Joi.string(),
    new_app_id: Joi.string()
        .email(),
    api_key: Joi.string()
})

joiObj.addAdminSchema = Joi.object({
    username: Joi.string()
        .email()
        .required()
})

joiObj.resetAppSchema = Joi.object({
    app_id: Joi.string()
        .required()
});

joiObj.deleteAppSchema = Joi.object({
    app_id: Joi.string()
        .required(),
    del_status: Joi.bool()
        .required()
})

joiObj.deleteAdminSchema = Joi.object({
    username: Joi.string()
        .required()
        .email(),
    del_status: Joi.bool()
        .required()
})

joiObj.deleteInstitutionSchema = Joi.object({
    inst_code: Joi.string()
        .required(),
    del_status: Joi.bool()
        .required()
})

joiObj.updateAdminSchema = Joi.object({
    username: Joi.string()
        .email()
        .required(),
    new_username: Joi.string()
        .email()
        .required()
})

module.exports = joiObj;