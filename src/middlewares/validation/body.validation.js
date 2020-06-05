import Schemas from './schema/body.schema';


const bodyValidation = (req, res, next) => {
  // enabled HTTP methods for request data validation
  const supportedMethods = ['post', 'put', 'patch'];

  // Joi validation options
  const validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  };

  // return the validation middleware
  const route = req.route.path;
  const method = req.method.toLowerCase();

  if (supportedMethods.includes(method) && route in Schemas) {
    const schema = Schemas[route];
    if (schema) {
      // Validate req.body using the schema and validation options
      const { error, value } = schema.validate(req.body, validationOptions);
      if (error) {
        const SimplifiedError = {
          status: 400,
          error: error.details
            ? error.details.map((detail) => detail.message.replace(/['"]/g, ''))
            : error.message
        };
        // Send back the JSON error response
        return res.status(400).json(SimplifiedError);
      }
      req.body = value;
      return next();
    }
  }
  return next();
};

export default bodyValidation;
