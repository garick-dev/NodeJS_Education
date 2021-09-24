const generalModel = require("../../models/bike");

const createObjInDB = async (data) => {
    const bike = new generalModel;
   
    const arr = [];
    for (let key in data) {
        console.log(key);
    if ( key.includes("spec-")) {
        const newKey = key.replace("spec-", "");
        bike.specifications[newKey] = data[key];
    }
    else {
    bike[key] = data[key];
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