const articleModule = require("../models/article");

const findArt = async () => {
    let artArr = [];
  
    const find = await articleModule.find({});
    
    for (let i = 0; i < find.length; i++) {
    artArr.push(find[i].title);
    }
    return artArr;

}

module.exports = findArt;