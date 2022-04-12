const express = require("express");
const app = express();

let topMovies = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    year: "2001"
  },
  {
    title: "Harry Potter and the Chamber of Secrets",
    year: "2002"
  },
  {
    title: "Harry Potter and the Prisoner of Azkaban ",
    year: "2004"
  },
  {
    title: "Harry Potter and the Goblet of Fire",
    year: "2005"
  },
  {
    title: "Harry Potter and the Order of the Phoenix ",
    year: "2007"
  },
  {
    title: "3.6	Harry Potter and the Half-Blood Prince",
    year: "2009"
  },
  {
    title: "Harry Potter and the Deathly Hallows – Part 1",
    year: "2010"
  },
  {
    title: "Harry Potter and the Deathly Hallows – Part 2 ",
    year: "2011"
  },
  {
    title: "Harry Potter and the first example",
    year: "2022"
  },
  {
    title: "Harry Potter and the second example",
    year: "2022"
  }
];

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my movie club!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
