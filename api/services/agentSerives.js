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

const getAgentsByAddressId = async (filter)  =>{
  console.log('asd');
    const getAgents = await agentModule.aggregate([
    { $match: filter },
     {
      $lookup: {
        from: 'addressId',
        localField: 'address',
        foreignField: '_id',
        as: 'addressId',
      },
    },
    {
      $unwind: {
        path: '$addressId',
        preserveNullAndEmptyArrays: true,
      },
    },
  ]).exec();
  return getAgents;
 
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
