const Notification = require("../modules/sendNotification");

const create = async (body) => {
   const notification = await Notification.create(body);
  return notification;
};

const getAll = async(req, res)=>{
    const notification = await Notification.find();
    return notification;
}


const getOne = async(id)=>{
     const notification = await Notification.findById(id);
    return notification;
}
 
const update = async(id,newBody) =>{
    
    const notification = await Notification.findByIdAndUpdate(id, newBody, {
        new: true,
        runValidators: true,
      });
      return notification;
}

const deleteinfo = async(id) =>{
    const notification = await Notification.findByIdAndDelete(id);
      return notification;
}

module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteinfo
};
