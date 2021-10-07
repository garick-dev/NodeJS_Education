const mongoose = require("mongoose");
const path = require("path");

const { Schema } = mongoose;

const generalSchema = new Schema({
    sessionID: {
        type: Schema.Types.String,
        maxLength: 255,
        unique: true,
    },
    login: {
      type: Schema.Types.String,
      maxLength: 255,
      unique: true,
    },  

});
const modelName = path.basename(__filename, '.js');
const model = mongoose.model(modelName, generalSchema);
module.exports = model