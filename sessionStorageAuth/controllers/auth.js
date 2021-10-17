const generalModel = require("../models/user");
const CryptoJS = require("crypto-js");

const createUser = async (name, login, pwd) => {
     try {
        const doc = await generalModel.create({
            name, 
            auth: {
                login,
                pwd,
            }
                 
        });        
        return { status: "OK", id: doc._id};
    }
          
    catch (err) {
        return { status: "Invalid data"};
    }
}

const authUser = async (login, pwd) => {
    const user = await generalModel.findOne({ "auth.login" : login});
    const bytes  = CryptoJS.AES.decrypt(user.auth.hashPwd, 'myKeyIsVeryHard');
    const originalPwd = bytes.toString(CryptoJS.enc.Utf8);

    if (pwd === originalPwd) {
        return { status: "OK",  id: user._id};
    }
    else {
        return { status: "Invalid data"};
    }

}
module.exports = { createUser, authUser };
 


  
