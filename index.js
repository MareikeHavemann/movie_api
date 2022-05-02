const express = require("express");
const app = express();

const morgan = require("morgan");
const bodyParser = require("body-parser");
 const uuid = require('uuid');
 app.use(morgan("common"));

 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 const mongoose = require('mongoose');
 const Models = require('./models.js');

 app.use(express.static('public'));

// mongoose models
const Movies = Models.Movie;
const Users = Models.User;

// connects to local dev MongoDB
  mongoose.connect('mongodb://localhost:27017/myFlixDB', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

// endpoints for API
app.get("/", (req, res) => {
  res.send("Welcome to my movies club!");
});

// documentation.html file from public folder
app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

});


// error-handling function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
