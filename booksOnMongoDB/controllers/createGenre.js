const genreModel = require("../models/genre");

const createObjInDB = async (name) => {
    const genre = new genreModel;
    genre.name = name;
    try {
    const doc = await genre.save();
    const { id } = doc;
     return { status: "ok" , result: { id } };
    }
    catch (err) {
        return { status: "Invalid data" };
    }
  }
  
  module.exports = createObjInDB;