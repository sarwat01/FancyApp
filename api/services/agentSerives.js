const mongoose = require('mongoose');
const agent = require("../modules/agentModule");
const agentModule = require("../modules/agentModule");

const create = async (body) => {
  if (body !== undefined) {
    const newAgent = await agent.create(body);
    return newAgent;
  }
};
const getAll = async (req, res) => {
  const Agent = agentModule.find().populate("addressId")
  return Agent;
};

const getAgentsByAddressId = async (id)  =>{
  
  const Agents = await agentModule.aggregate([
    { $match: { addressId:new mongoose.Types.ObjectId(id) } },
       {
      $lookup:{
        from:"addresses",
        localField: "addressId",
        foreignField:"_id",
        as:"addressId"
      } 
     },
     {
      $unwind: {
        path: '$addressId',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id:1,
        name:1,
        phone1:1,
        phone2:1,
       addressId:1
      },
    },
  ]) .exec();
  return  Agents ;
 
}
 
const getOne = async (id) => {
  const Agent = agentModule.findById(id).populate("addressId")
  return Agent;
};

const update = async (id, newBody) => {
  const agent = await agentModule.findByIdAndUpdate(id, newBody, {
    new: true,
    runValidators: true,
  }); 
  return agent;
};

const deleteAgent = async (id) => { 
  const agent = await agentModule.findByIdAndDelete(id);
  return agent;
};
module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteAgent,
  getAgentsByAddressId
};
