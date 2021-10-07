const mongoose = require('mongoose');
const db = require('../../storage/db');

const { uri, options } = require('./../../config').db;

const init = () => new Promise((resolve, reject) => {
   mongoose.connect(uri, options);

   db.on('error', (err) => {
      console.log('DB err');
    
   });
   db.once('open', () => {
      console.log('Connected to DB');
   
      resolve();
   });
   db.once('close', () => {
      console.log('Close connection to DB');
      });
});

module.exports = init; 