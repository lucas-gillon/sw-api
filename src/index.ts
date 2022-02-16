import express from "express";
import nunjucks from "nunjucks";
import fewlRequest from "@fewlines-education/request";

const app = express();

app.use(express.static("public"));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");

// function getCategories(): void {
//   fewlRequest("https://swapi.dev/api/", (error, body) => {
//     if (error) {
//       console.error(error);
//     } else {
//       const data = JSON.parse(body);
//       const patate = Object.keys(data);
//       console.log("patate      ", patate);
//     }
//   });
// }
// console.log(getCategories());

app.get("/", (request, response) => {
  fewlRequest("https://swapi.dev/api/", (error, body) => {
    if (error) {
      console.error(error);
      response.render("home");
    } else {
      const data = JSON.parse(body);
      response.render("home", { categories: Object.keys(data) });
      // const patate = Object.keys(data);
      // console.log("patate      ", patate);
    }
  });
  response.render("home");
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
