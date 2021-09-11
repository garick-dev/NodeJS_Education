const genreModel = require("../models/genre");

const createObjInDB = async (name) => {
    const genre = new genreModel;
    genre.name = name;
    const doc = await genre.save();
     console.log(doc._id);
  }
  
  module.exports = createObjInDB;