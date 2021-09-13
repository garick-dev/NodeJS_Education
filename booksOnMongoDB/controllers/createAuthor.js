const authorModel = require("../models/author");

const createObjInDB = async (name, short_name) => {
    const author = new authorModel;
    author.name = name;
    author.short_name = short_name;
    try {
        const doc = await author.save();
        const { id } = doc;
        return { status: "ok", result: { id }};
    }
    catch (err) {
        return { status: "Invalid data"};
    }
  }
  
  module.exports = createObjInDB;