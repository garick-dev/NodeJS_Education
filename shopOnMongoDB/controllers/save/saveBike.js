const generalModel = require("../../models/bike");

const createObjInDB = async (name, brend, model, wheels, year, color, type, brakes, price, about, img) => {
    const bike = new generalModel;
    bike.name = name;
    bike.brand.brend = brend;
    bike.brand.model = model;
    bike.wheels = wheels;
    bike.year = year;
    bike.color = color;
    bike.type = type;
    bike.breakes = brakes;
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