const fancyService = require("../models/fancyService");

exports.createfancyService = async (req, res) => {
  try {
    const newService = await fancyService.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newService,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllFancyServices = async (req, res) => {
  try {
    const fancyServices = await fancyService.find();

    res.status(200).json({
      status: "success",
      length: fancyServices.length,
      data: {
        fancyServices,
      },
    });
  } catch (err) {
    res.status(201).json({
      status: "failed",
      message: "data not found!",
    });
  }
};


exports.getfancyService = async (req, res) => {
try{
const oneFancyService = await fancyService.findById(req.params.id)
 
res.status(200).json({
  status: 'success',
  data : {
    oneFancyService
  }
})
}catch (err) {
  res.status(404).json({
    status: 'failed',
    message: 'data not found!'
  })
}


}