const express = require("express");
const app = express();

const PORT = 3000;

// Global variables
let adjective1 = "";
let noun = "";
let verb = "";
let adverb = "";
let adjective2 = "";

// Middleware to read the URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the Public directory
app.use(express.static("Public"));

// Route to get the first word page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Public/index.html");
});

// Route to handle the first word page
app.get("/first-word", (req, res) => {
  res.send(`Give me a noun!<form method="POST" action="/second-word">
        <label for="noun">Enter a noun:</label>
        <input type="text" id="noun" name="noun" placeholder="e.g., cat">
        <input type="submit" value="submit">
        </form>`);
});

// Route to handle the second word page
app.post("/second-word", (req, res) => {
  noun = req.body.noun;
  console.log(`Received first-word: ${noun}`);
  res.send(`<form method="POST" action="/third-word">
        <label for="verb">Enter a verb:</label>
        <input type="text" id="verb" name="verb" placeholder="e.g., run">
        <input type="submit" value="submit">
        </form>`);
});

// Route to handle the third word page
app.post("/third-word", (req, res) => {
  verb = req.body.verb;
  console.log(`Received second-word: ${verb}`);
  res.send(`<form method="POST" action="/fourth-word">
        <label for="adverb">Enter an adverb:</label>
        <input type="text" id="adverb" name="adverb" placeholder="e.g., quickly">
        <input type="submit" value="submit">
        </form>`);
});

// Route to handle the fourth word page
app.post("/fourth-word", (req, res) => {
  adverb = req.body.adverb;
  console.log(`Received third-word: ${adverb}`);
  res.send(`<form method="POST" action="/fifth-word">
        <label for="adjective1">Enter an adjective:</label>
        <input type="text" id="adjective1" name="adjective1" placeholder="e.g., happy">
        <input type="submit" value="submit">
        </form>`);
});
// Route to handle the fifth word page
app.post("/fifth-word", (req, res) => {
  adjective1 = req.body.adjective1;
  console.log(`Received fourth-word: ${adjective1}`);
  res.send(`Give me another adjective!<form method="POST" action="/story">
        <label for="adjective2">Enter another adjective:</label>
        <input type="text" id="adjective2" name="adjective2" placeholder="e.g., sad">
        <input type="submit" value="submit">
        </form>`);
});
// Route to display the story
app.post("/story", (req, res) => {
  adjective2 = req.body.adjective2;
  console.log(`received fifth-word: ${adjective2}`);
  const story = `Once upon a time, there was a ${adjective1} ${noun} that loved to ${verb} ${adverb}. It was a ${adjective2} day!`;
  console.log(`Generated story: ${story}`);
  res.send(`<h1>Your MadLibs Story</h1><p>${story}</p>
    <form method="GET" action="/reset"><input type="submit" value="reset">`);
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
