const informationModule = require('../modules/informationModule')



const create = async(body) =>{
    const information = await informationModule.create(body)
    return information
    }
    
    const getAll = async(req,res) =>{
        const information = await informationModule.find()
        return information
    }
    
    const getOne = async(id) =>{ 
        const information = await informationModule.findById(id)
        return information
    }
    
    const updateinformation = async(id,newBody) =>{
        const information = await informationModule.findByIdAndUpdate(id, newBody, {
            new: true,
            runValidators: true,
          });
          return information;
    }
    
    const deleteinformation = async(id) =>{
        const information = await informationModule.findByIdAndDelete(id);
          return information;
    }
    
    module.exports = {
    create,
    getAll,
    getOne,
    updateinformation,
    deleteinformation
    }