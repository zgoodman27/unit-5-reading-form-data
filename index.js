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

// Middleware to read the URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the Public directory
app.use(express.static("Public"));

// Route to serve the first word page
app.get("/first-word", (req, res) => {
  res.send(`<form method="POST" action="/first-word">
        <label for="noun">Enter a noun:</label>
        <input type="text" id="noun" name="noun" placeholder="e.g., cat">
        <input type="submit" value="submit">)
        </form>`);
});

app.post("/second-word", (req, res) => {
  const noun = req.body.noun;
  console.log(`Received noun: ${noun}`);
});
// Route to handle form submission

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
