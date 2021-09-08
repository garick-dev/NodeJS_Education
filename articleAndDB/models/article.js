const mongoose = require("mongoose");
const path = require("path");

const { Schema } = mongoose;

const generalSchema = new Schema({
  title: {
    type: Schema.Types.String,
    default: "",
    maxLength: 255,
    unique: true,
  },
  author: {
    name: {
      type: Schema.Types.String,
      default: "",
      maxLength: 255,
    },
    gender: {
      type: Schema.Types.String,
      enum: ["male", "famale", "other"],
    },
    birthday: {
      type: Schema.Types.Date,
    },
  },
  text: {
    type: Schema.Types.String,
    default: "",
    maxLength: 1000,
  },
});
const modelName = path.basename(__filename, '.js');
const model = mongoose.model(modelName, generalSchema);
module.exports = model
