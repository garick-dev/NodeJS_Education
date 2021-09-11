const mongoose = require("mongoose");
const path = require("path");

require("./author");
require("./genre");

const { Schema } = mongoose;

const generalSchema = new Schema({
  name: {
    type: Schema.Types.String,
    default: "",
    maxLength: 255,
    unique: true,
  },
  publish: {
    year: {
      type: Schema.Types.Date,
     },
    location: {
      type: Schema.Types.String,
      default: "",
      maxLength: 255,
    },
    publisher: {
      type: Schema.Types.String,
    },
  },
  authors: [{
    type: Schema.Types.ObjectId, ref: "author",
    }],
  genres: [{
    type: Schema.Types.ObjectId, ref: "genre",
    }],
});
const modelName = path.basename(__filename, '.js');
const model = mongoose.model(modelName, generalSchema);
module.exports = model
