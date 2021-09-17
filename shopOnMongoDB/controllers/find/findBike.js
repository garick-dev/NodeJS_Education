const generalModel = require("../../models/bike");

const findObj = async () => {
    
    const findBike = await generalModel.find({}).populate("types").populate("colors").populate("wheels").populate("brends");
    return findBike;   
 }

module.exports = findObj;