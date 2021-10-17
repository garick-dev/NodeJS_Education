const mongoose = require("mongoose");
const path = require("path");
const CryptoJS = require("crypto-js");

const { Schema } = mongoose;

const generalSchema = new Schema({
     name: {
        type: Schema.Types.String,
        default: "",
        maxLength: 255,
        require: true,
    },
    auth: {
    login: {
      type: Schema.Types.String,
      maxLength: 255,
      require: true,
      unique: true,
    },
    hashPwd: {
        type: Schema.Types.String,
        require: true,
    }
}
});

generalSchema.virtual("auth.pwd").get(function() {
    return this.auth.pwd;
}).set(function (pwd) {
    const hash = CryptoJS.AES.encrypt(pwd, 'myKeyIsVeryHard').toString();
   this.auth.hashPwd = hash; 
}) 

const modelName = path.basename(__filename, '.js');
const model = mongoose.model(modelName, generalSchema);
module.exports = model
