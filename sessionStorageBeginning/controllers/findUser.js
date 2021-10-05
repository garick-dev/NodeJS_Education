const generalModel = require("../models/user");

const findObj = async () => {
  
    const find = await generalModel.find({});
    
    return find;

}

module.exports = findObj;