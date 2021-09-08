const articleModule = require("../models/article");

const saveArticle = async (title, name, gender, birthday, text) => {
    const article = new articleModule;
    article.title = title;
    article.author.name = name;
    article.author.gender = gender;
    article.author.birthday = birthday;
    article.text = text;
    const doc = await article.save();
     console.log(doc._id);
  }
  
  module.exports = saveArticle;