const bookModel = require("../models/book");

const createObjInDB = async (name, year, location, publisher, authors, genres) => {
    const book = new bookModel;
    book.name = name;
    book.publish.year = year;
    book.publish.location = location;
    book.publish.publisher = publisher;
    book.authors = authors;
    book.genres = genres;
    const doc = await book.save();
     console.log(doc._id);
  }
  
  module.exports = createObjInDB;