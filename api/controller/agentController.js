 const agentModule = require("../modules/agentModule");
const catchAsync = require("../utils/catchAsync");
const service = require("../services/agentSerives");

const pick = require("../utils/pick");

const createAgent = catchAsync(async (req, res) => {
  const agent = await service.create(req.body);
  res.send(agent);
});

const getAll = catchAsync(async (req, res) => {
  
  const agent = await service.getAll();
  res.status(200).json({
    status: "sucess",
    length: agent.length,
    data: {
      agent,
    },
  });
});

 
const getAgentsByAddressId = catchAsync(async (req, res, next)=> {

  const agent = await service.getAgentsByAddressId(req.params.addressId);
  res.send(agent); 
 }  
)

const getOne = catchAsync(async (req, res, next) => {
  const Agent = await service.getOne(req.params.id);
  if (!Agent) {
    return next(new AppError("No agent found with that ID", 404));
  }
  res.send(Agent);
});

const update = catchAsync(async (req, res, next) => {
   const Agent = await service.update(req.params.id, req.body);
  if (!Agent) {
    return next(new AppError("No agent found with that ID", 404));
  } 
  res.send(Agent);
});

const deleteAgent = catchAsync(async (req, res, next) => {
  const Agent = await service.deleteAgent(req.params.id);
  if (!Agent) {
    return next(new AppError("No agent found with that ID", 404));
  }
  res.send(Agent);
}); 


 

module.exports = {
  createAgent,
  getAll,
  getOne,
  update,
  deleteAgent,
  getAgentsByAddressId
};
