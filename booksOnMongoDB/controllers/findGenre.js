const genreModel = require("../models/genre");

const findObj = async () => {
    let arr = [];
  
    const find = await genreModel.find({});
    
    for (let i = 0; i < find.length; i++) {
        arr.push(find[i]);
    }
    return arr;

}

module.exports = findObj;