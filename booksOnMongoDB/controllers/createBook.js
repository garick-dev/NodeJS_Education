const bookModel = require("../models/book");

const createObjInDB = async (name, year, location, publisher, authors, genres) => {
    const book = new bookModel;
    book.name = name;
    book.publish.year = year;
    book.publish.location = location;
    book.publish.publisher = publisher;
    book.authors = authors;
    book.genres = genres;
    try {
        const doc = await book.save();
        const { id } = doc;
        return { status: "ok", result: { id }};
    }
    catch (err) {
        return { status: "Invalid data"};
    }
  }
  
  module.exports = createObjInDB;