import express from "express";
import nunjucks from "nunjucks";
import fetch from "node-fetch";

const app = express();

app.use(express.static("public"));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");

app.get("/", (res, response) => {
  response.redirect("/home");
});

app.get("/home", (request, response) => {
  fetch("https://swapi.dev/api/")
    .then((response) => response.json())
    .then((data) =>
      response.render("home", {
        categories: Object.keys(data),
      }),
    );
});

// List all people
app.get("/people", (req, response) => {
  fetch(`https://swapi.dev/api/people/`)
    .then((response) => response.json())
    .then((data) =>
      response.render("all-people", {
        people: data.results,
      }),
    );
});

// Display a specific person infos
app.get("/people/:id", (req, response) => {
  const id = req.params.id;
  fetch(`https://swapi.dev/api/people/${id}`)
    .then((response) => response.json())
    .then((data) =>
      response.render("one-person", {
        person: data,
      }),
    );
});

// List all planets
app.get("/planets", (res, response) => {
  fetch(`https://swapi.dev/api/planets`)
    .then((response) => response.json())
    .then((data) =>
      response.render("all-planets", {
        planets: data.results,
      }),
    );
});

// Display a specific planet infos
app.get("/planets/:id", (res, response) => {
  const id = res.params.id;
  fetch(`https://swapi.dev/api/planets/${id}`)
    .then((response) => response.json())
    .then((data) =>
      response.render("one-planet", {
        planet: data,
      }),
    );
});

// List all films
app.get("/films", (res, response) => {
  fetch(`https://swapi.dev/api/films`)
    .then((response) => response.json())
    .then((data) =>
      response.render("all-films", {
        films: data.results,
      }),
    );
});

// Display a specific film infos
app.get("/films/:id", (req, response) => {
  const id = req.params.id;
  fetch(`https://swapi.dev/api/films/${id}`)
    .then((response) => response.json())
    .then((data) =>
      response.render("one-film", {
        film: data,
      }),
    );
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
