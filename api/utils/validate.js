const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('./pick');
const ApiError = require('./appError');

const validate = (schema) => (req, res, next) => {
   
  const object = pick(req, Object.keys());
  const { value, error } = Joi.compile()
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
