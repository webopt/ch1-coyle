var express = require("express");
var app = express();

// Run static server
app.use(express.static(__dirname));
app.listen(8080);