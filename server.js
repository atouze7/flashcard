const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

//const projects = require('./routes/api/projects')

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//Use Routes
app.use("/", require("./routes/api/projects"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server started on port ${port}`));
