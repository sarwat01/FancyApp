const addressModule = require("../modules/addressModule");
 
const create = async(body) =>{
const address = await addressModule.create(body)
return address
}

const getAll = async(req,res) =>{
    const address = await addressModule.find()
    return address
}

const getOne = async(id) =>{ 
    const address = await addressModule.findById(id)
    return address
}

const updateAddress = async(id,newBody) =>{
    const address = await addressModule.findByIdAndUpdate(id, newBody, {
        new: true,
        runValidators: true,
      });
      return address;
}

const deleteAddress = async(id) =>{
    const address = await addressModule.findByIdAndDelete(id);
      return address;
}

module.exports = {
create,
getAll,
getOne,
updateAddress,
deleteAddress
}