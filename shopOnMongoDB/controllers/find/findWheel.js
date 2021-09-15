const generalModel = require("../../models/wheel");

const findObj = async () => {
    let arr = [];
  
    const find = await generalModel.find({});
    
    for (let i = 0; i < find.length; i++) {
        arr.push(find[i]);
    }
    return arr;

}

module.exports = findObj;