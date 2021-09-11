const mongoose = require("mongoose");
const path = require("path");

const { Schema } = mongoose;

const generalSchema = new Schema({
  name: {
    type: Schema.Types.String,
    default: "",
    maxLength: 255,
    unique: true,
  },
  short_name: {
    type: Schema.Types.String,
    default: "",
    maxLength: 155,
    unique: true,
  },
});
const modelName = path.basename(__filename, '.js');
const model = mongoose.model(modelName, generalSchema);
module.exports = model
