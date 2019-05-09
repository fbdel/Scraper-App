var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");


var PORT = 3000;

// Initialize Express
var app = express();


// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// "mongodb://admin:password123@ds229701.mlab.com:29701/scraper-123"
 

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const routes = require("./controllers/scraper-controller.js");
app.use(routes);



// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
