const authorModel = require("../models/author");

const findObj = async () => {
    let arr = [];
  
    const find = await authorModel.find({});
    
    for (let i = 0; i < find.length; i++) {
        arr.push(find[i]);
    }
    return arr;

}

module.exports = findObj;