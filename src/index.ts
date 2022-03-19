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
        links: Object.values(data),
      }),
    );
});

app.get("/person/:id", (req, response) => {
  const id = req.params.id;
  fetch(`https://swapi.dev/api/people/${id}`)
    .then((response) => response.json())
    .then((data) =>
      // console.log(data)
      response.render("person", {
        name: data.name,
        height: data.height,
      }),
    );
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
