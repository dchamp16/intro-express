const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: false }));
app.use(getWeather);
app.use(express.static(path.join(__dirname, "public"))); //for style.css

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

function getWeather(req, res, next) {
  req.visitorWeather = false;
  if (req.visitorWeather) {
    res.send("Please come back to our app when it is not raining");
  } else {
    next();
  }
}

app.get("/", (req, res) => {
  res.render("home", {
    isRaining: req.visitorWeather,
    pets: [
      { name: "Meowsalot", species: "cat" },
      { name: "Barksalot", species: "dog" },
    ],
  });
});

app.get("/about", (req, res) => {
  res.send("Thanks for leaning more about us");
});

app.get("/result", (req, res) => {
  res.send("Why are you vising thi URL?");
});

app.get("/api/pets", (req, res) => {
  res.json([
    { name: "Meowsalot", species: "cat" },
    { name: "Barksalot", species: "dog" },
  ]);
});

app.post("/result", (req, res) => {
  let inputColor = req.body.color.trim().toUpperCase(); //to turn on the req.body need this app.use(express.urlencoded({ extended: false }));
  inputColor === "BLUE"
    ? res.send(`Yes! the sky is ${inputColor}`)
    : res.send(`NO!! its not ${inputColor}`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
