const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
require('./app/routes')(app, {});
app.listen(port, () => {
  console.log('We are live on ' + port);
});

// let MongoClient = require('mongodb').MongoClient,
//     assert = require('assert');
//
// let url = 'mongodb://localhost:27017/nodeserver';
//
// MongoClient.connect(url, (err, db) => {
//   assert.equal(null, err);
//   console.log("Connected");
//   const collection1 = db.collection('users');
//   collection1.insert({
//     id: '1',
//     name: 'Libhendeuz'
//   });
//   const collection = db.collection('users');
//   const response = collection.find();
//   console.log(response);
//   db.close();
// });