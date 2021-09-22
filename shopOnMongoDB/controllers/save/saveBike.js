const generalModel = require("../../models/bike");

const createObjInDB = async (data) => {
    const bike = new generalModel;
   
    console.log(data);
    const arr = [];
    for (let key in data) {
  
   const prefix = key.substring(0, 5);
    if ( prefix === "spec-") {
        // console.log(data[key]);
        arr.push(data[key]);
        bike.specifications = arr;
        // const newKey = (key.replace("spec-", ""));         
    }
    else {
    bike.name = data.name;
    bike.brends = data.brend;
    bike.model = data.model;
    bike.wheels = data.wheels;
    bike.year = data.year;
    bike.colors = data.color;
    bike.types = data.type;
    bike.breake = data.brakes;
    bike.price = data.price;
    bike.about = data.about;
    bike.image = data.img;
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