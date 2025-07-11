const express = require("express");
const app = express();

const PORT = 3000;

// Global variables
let madlibs = {
  adjective1: "",
  noun: "",
  verb: "",
  adverb: "",
  adjective2: "",
};

//DOM elements
const startBtn = document.getElementById("startBtn");

// Event listener for the start button:
startBtn.addEventListener("click", () => {window.location.href = "/first-word";});

// Middleware to read the URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the Public directory
app.use(express.static("Public"));

// Route to get the first word page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Public/index.html");
});

// Route to handle the first word page
app.post("/first-word", (req, res) => {
  const noun = req.body.noun;
  console.log(`Received first-word: ${noun}`);
  res.send(`<form method="POST" action="/first-word">
        <label for="noun">Enter a noun:</label>
        <input type="text" id="noun" name="noun" placeholder="e.g., cat">
        <input type="submit" value="submit">)
        </form>`);
});

// Route to handle the second word page
app.post("/second-word", (req, res) => {
  const verb = req.body.verb;
  console.log(`Received second-word: ${verb}`);
  madlibs.verb = req.body.verb;
  res.send(`<form method="POST" action="/second-word">
        <label for="verb">Enter a verb:</label>
        <input type="text" id="verb" name="verb" placeholder="e.g., run">
        <input type="submit" value="submit">
        </form>`);
});

// Route to handle the third word page
app.post("/third-word", (req, res) => {
  const adverb = req.body.adverb;
  console.log(`Received third-word: ${adverb}`);
  madlibs.adverb = req.body.adverb;
  res.send(`<form method="POST" action="/third-word">
        <label for="adverb">Enter an adverb:</label>
        <input type="text" id="adverb" name="adverb" placeholder="e.g., quickly">
        <input type="submit" value="submit">
        </form>`);
});

// Route to handle the fourth word page
app.post("/fourth-word", (req, res) => {
  const adjective1 = req.body.adjective1;
  console.log(`Received fourth-word: ${adjective1}`);
  madlibs.adjective1 = req.body.advjective1;
  res.send(`<form method="POST" action="/fourth-word">
        <label for="adjective1">Enter an adjective:</label>
        <input type="text" id="adjective" name="adjective" placeholder="e.g., happy">
        <input type="submit" value="submit">
        </form>`);
});
// Route to handle the fifth word page
app.post("/fifth-word", (req, res) => {
  const adjective2 = req.body.adjective2;
  console.log(`Received fifth-word: ${adjective2}`);
  madlibs.adjective2 = req.body.advjective2;
  res.send(`<form method="POST" action="/fifth-word">
        <label for="adjective2">Enter an adjective:</label>
        <input type="text" id="adjective" name="adjective" placeholder="e.g., sad">
        <input type="submit" value="submit">
        </form>`);
});
// Route to display the story
app.post("/story", (req, res) => {
  const story = `Once upon a time, there was a ${madlibs.adjective1} ${madlibs.noun} that loved to ${madlibs.verb} ${madlibs.adverb}. It was a ${madlibs.adjective2} day!`;
  console.log(`Generated story: ${story}`);
  res.send(`<h1>Your MadLibs Story</h1><p>${story}</p>`);
});

// reset the madlibs object
app.get("/reset", (req, res) => {
  madlibs = {
    adjective1: "",
    noun: "",
    verb: "",
    adverb: "",
    adjective2: "",
  };
  console.log("MadLibs reset");
  res.redirect("/");
});


app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
