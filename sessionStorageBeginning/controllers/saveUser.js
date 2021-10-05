const generalModel = require("../models/user");

const createObjInDB = async (data, id) => {

    const user = new generalModel;
     
    user.sessionID = id;
    user.login = data.login;
    user.password = data.password;
    
    try {
        const doc = await user.save();
        const { id } = doc;
        return { status: "ok", result: { id }};
    }
    catch (err) {
        return { status: "Invalid data"};
    }
  };
  
  module.exports = createObjInDB;