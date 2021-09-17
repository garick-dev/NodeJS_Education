const generalModel = require("../../models/bike");

const createObjInDB = async (name, brend, model, wheels, year, color, type, brake, price, about, img) => {
    const bike = new generalModel;
    bike.name = name;
    bike.brends = brend;
    bike.model = model;
    bike.wheels = wheels;
    bike.year = year;
    bike.colors = color;
    bike.types = type;
    bike.breake = brake;
    bike.price = price;
    bike.about = about;
    bike.image = img;
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