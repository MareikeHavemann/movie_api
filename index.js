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

// Mongoose models
const Movies = Models.Movie;
const Users = Models.User;

// Connects to local dev MongoDB
  mongoose.connect('mongodb://localhost:27017/myFlixDB', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

// Endpoints for API
app.get("/", (req, res) => {
  res.send("Welcome to my movies club!");
});

// documentation.html file from public folder
app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

// Adds user
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Gets all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Gets a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Delete a user by username
app.delete('/users/:Username', (req, res) => {
  Users.findoneAndRemove({ Username: req.params.Username })
  .then ((user) => {
    if (!user) {
      res.status(400).send(reg.params.Username
+ ' was not found');
    } else {
      res.status(200).send(reg.params.Username
+ ' was deleted.');
    }
  })
  .catch((err) => {
    console.error(err);
    res. status(500) . send( 'Error: ' + err);
    });
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Deletes movie from user
app.delete(
  '/users/:Username/favorites/:MovieID',
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $pull: {
          FavoriteMovies: req.params.MovieID,
        },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.log(err);
          res.status(500).send(`Error: ${err}`);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// Returns list of all movies
app.get(
  '/movies',
  (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(`Error: ${error}`);
      });
  }
);

// Get movies by title
app.get(
  '/movies/:title',
  (req, res) => {
    Movies.findOne({ Title: req.params.title }).then((movie) => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(400).send('Movie not found');
      }
    });
  }
);

// Get movies by genre
app.get(
  '/movies/genre/:title',
  (req, res) => {
    Movies.findOne({ Title: req.params.title }).then((movie) => {
      if (movie) {
        res.status(200).send(`${req.params.title} is a ${movie.Genre.Name}`);
      } else {
        res.status(400).send('Movie not found');
      }
    });
  }
);

// Get infos about director
app.get(
  '/directors/:name',
  (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.name }).then((movie) => {
      if (movie) {
        res.status(200).json(movie.Director);
      } else {
        res.status(400).send('Director not found');
      }
    });
  }
);

// error-handling function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
