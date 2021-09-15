const generalModel = require("../../models/wheel");

const createObjInDB = async (name) => {
    const object = new generalModel;
    object.name = name;
    try {
        const doc = await object.save();
        const { id } = doc;
        return { status: "ok", result: { id }};
    }
    catch (err) {
        return { status: "Invalid data"};
    }
  }
  
  module.exports = createObjInDB;