import Joi from "joi";


export const SignInSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Not a valid email format",
        "any.required": "Email is required",
    }),
    password: Joi.string().min(4).required().messages({
        "string.min": "Password must be at least 4 characters long",
        "any.required": "Password is required",
    }),
});


export const UserSchema = Joi.object({
    name: Joi.string().min(2).required().messages({
        "string.min": "Name must be at least 2 characters long",
        "any.required": "Name is required",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Not a valid email format",
        "any.required": "Email is required",
    }),
    password: Joi.string().min(4).required().messages({
        "string.min": "Password must be at least 4 characters long",
        "any.required": "Password is required",
    }),
});


export const UrlSchema = Joi.object({
    baseUrl: Joi.string().uri().required().messages({
        "string.min": "Name must be at least 2 characters long",
        "uri": "Base url must be a valid URL",
        "any.required": "Name is required",
    })
});