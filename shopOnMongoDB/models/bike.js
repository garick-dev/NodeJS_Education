const mongoose = require("mongoose");
const path = require("path");

require("./brend");
require("./type");
require("./color");
require("./wheel");

const { Schema } = mongoose;

const generalSchema = new Schema({
  name: {
    type: Schema.Types.String,
    default: "",
    maxLength: 255,
    },
    brends: {
      type: Schema.Types.ObjectId, ref: "brend",
      },
    model: {
      type: Schema.Types.String,
      default: "",
      maxLength: 255,
    },
  
  wheels: {
    type: Schema.Types.ObjectId, ref: "wheel",
    },
  year: {
    type: Schema.Types.String,
      default: "",
      maxLength: 4,
    },  
  colors: {
    type: Schema.Types.ObjectId, ref: "color",
    },
  types: {
    type: Schema.Types.ObjectId, ref: "type",
    },
  brakes: {
    type: Schema.Types.String,
  },
  price: {
    type: Schema.Types.String,
      default: "",
      maxLength: 500,
    },  
  about: {
    type: Schema.Types.String,
      default: "",
      maxLength: 500,
    },  
  image: {
    type: Schema.Types.String,
      default: "",
      maxLength: 500,
    }, 
  specifications: {
    type: Schema.Types.Mixed,
    default: {},
  }   
});
const modelName = path.basename(__filename, '.js');
const model = mongoose.model(modelName, generalSchema);
module.exports = model
