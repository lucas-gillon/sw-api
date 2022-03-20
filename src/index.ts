import express from "express";
import nunjucks from "nunjucks";
import fetch from "node-fetch";
import moment from "moment";

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

// Home
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
        release_date: moment(data.release_date).format("MMMM Do YYYY"),
      }),
    );
});

// List all species
app.get("/species", (res, response) => {
  fetch(`https://swapi.dev/api/species`)
    .then((response) => response.json())
    .then((data) =>
      response.render("all-species", {
        species: data.results,
      }),
    );
});

// Display a specific specie infos
app.get("/species/:id", (req, response) => {
  const id = req.params.id;
  fetch(`https://swapi.dev/api/species/${id}`)
    .then((response) => response.json())
    .then((data) =>
      response.render("one-specie", {
        specie: data,
        eye_colors: data.eye_colors.split(" "),
        hair_colors: data.hair_colors.split(" "),
      }),
    );
});

// List all vehicles
app.get("/vehicles", (res, response) => {
  fetch(`https://swapi.dev/api/vehicles`)
    .then((response) => response.json())
    .then((data) => {
      const splitUrls = (): void => {
        data.results.map((element: { url: string }) => {
          console.log(element.url.split("/")[5]);
        });
      };
      const patate = splitUrls();
      console.log(patate);
      response.render("all-vehicles", {
        vehicles: data.results,
        url_splitted: data.results[0].url.split("/")[5],
      });
    });
});

// Display a specific vehicle infos
app.get("/vehicles/:id", (req, response) => {
  const id = req.params.id;
  fetch(`https://swapi.dev/api/vehicles/${id}`)
    .then((response) => response.json())
    .then((data) =>
      response.render("one-vehicle", {
        vehicle: data,
      }),
    );
});

app.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});
