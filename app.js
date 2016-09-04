
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var express = require('express');
var app = express();

app.use('/node_modules', express.static('node_modules'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/controller.js', function (req, res) {
  res.sendFile(__dirname + '/controller.js');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

var url = 'mongodb://localhost:27017/test';

var insertDocument = function(db, callback) {
   db.collection('restaurants').insertOne( {
      "address" : {
         "street" : "2 Avenue",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ]
      },
      "borough" : "Manhattan",
      "cuisine" : "Italian",
      "grades" : [
         {
            "date" : new Date("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
         },
         {
            "date" : new Date("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
         }
      ],
      "name" : "Vella",
      "restaurant_id" : "41704620"
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});