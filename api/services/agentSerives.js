const agent = require("../modules/agentModule");
const agentModule = require("../modules/agentModule");

const create = async (body) => {
  if (body !== undefined) {
    const newAgent = await agent.create(body);
    return newAgent;
  }
};
const getAll = async (req, res) => {
  const Agent = agentModule.find()
  return Agent;
};
 
const getOne = async (id) => {
  const Agent = agentModule.findById(id)
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
};
