const generalModel = require("../../models/bike");

const createObjInDB = async (data, imageName) => {
    const bike = new generalModel;
   
    const arr = [];
    for (let key in data) {
    if ( key.includes("spec-")) {
        const newKey = key.replace("spec-", "");
        bike.specifications[newKey] = data[key];
    }
    else {
    bike[key] = data[key];
    bike.image = `upload/${imageName}`;
    } 
}   
    try {
        const doc = await bike.save();
        const { id } = doc;
        return { status: "ok", result: { id }};
    }
    catch (err) {
        return { status: "Invalid data"};
    }
  }
  
  module.exports = createObjInDB;