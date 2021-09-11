const authorModel = require("../models/author");

const createObjInDB = async (name, short_name) => {
    const author = new authorModel;
    author.name = name;
    author.short_name = short_name;
    const doc = await author.save();
     console.log(doc._id);
  }
  
  module.exports = createObjInDB;