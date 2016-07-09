var express = require("express");
var compression = require("compression");
var app = express();

// Run static server
app.use(compression());
app.use(express.static(__dirname));
app.listen(8080);