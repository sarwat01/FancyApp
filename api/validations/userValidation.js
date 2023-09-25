const Joi = require('joi');
const { password, objectId } = require('./customValidation');

const create = {
  body: Joi.object().keys({
    username: Joi.string(),
    role: Joi.string().required().valid("developer", "manager", "agentPart"),
    password: Joi.string().custom(password),
    passwordChangedAt: Joi.string()
  }),
};

const getAll = {
  query: Joi.object().keys({
    username: Joi.string(),
    code: Joi.string().required(),
    role: Joi.string(),
    image: Joi.any(),
    passwordChangedAt: Joi.string()
  }),
};

const getOne = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const update = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      note: Joi.string(),
    })
    .min(1),
};

const deleteInfo = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};
module.exports = {
  create,
  getOne,
  update,
  deleteInfo,
  getAll,
};
