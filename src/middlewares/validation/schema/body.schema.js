import Joi from '@hapi/joi';

// const date = Joi.date();

const string = Joi.string()
  .regex(/^\D+$/);

const email = Joi.string()
  .email()
  .lowercase()
  .required();

const password = Joi.string()
  .min(6)
  .required()
  .strict();


// const id = Joi.number().integer().positive().min(1)
//   .required();

const createUserSchema = Joi.object({
  firstname: string.required(),
  middlename: string.required(),
  lastname: string.required(),
  userType: string.required(),
  role: string.required(),
  phone: Joi.string().trim().regex(/^[0-9]{7,10}$/).required(),
  email,
  password,
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .strict()
    .error(new Error('Your password and confirm password do not match'))
});

const signinUserSchema = Joi.object({
  email,
  password
});

export default {
  '/auth/signup': createUserSchema,
  '/auth/signin': signinUserSchema
};