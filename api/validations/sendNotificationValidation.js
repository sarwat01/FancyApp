const Joi = require("joi");
const { objectId } = require("./customValidation");

const create = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    detail: Joi.string().required(),
  }),
};

const getAll = {
  query: Joi.object().keys({
    title: Joi.string(),
    detail: Joi.string(),
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
      title: Joi.string().required(),
      detail: Joi.string().required(),
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
