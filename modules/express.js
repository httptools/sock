const express = require("express");
const cors = require("cors");

const app = express();

// CORS Access
app.use(cors());

// Load static files
app.use(express.static(`${__dirname}/../public`));

module.exports = app;