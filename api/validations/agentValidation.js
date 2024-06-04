const Joi = require("joi");
const { objectId } = require("./customValidation");

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    phone1: Joi.string().required(),
    phone2: Joi.string(), 
    addressId:Joi.string().required(),
    note: Joi.string(), 
  }),
};

const getAll = {
  query: Joi.object().keys({
    name: Joi.string(),
    phone1: Joi.string(),
    phone2: Joi.string(), 
    addressId:Joi.string(),
    note: Joi.string(),
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
      phone1: Joi.string(),
      phone2: Joi.string(), 
      addressId:Joi.string().required(),
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
