const jwt = require("jsonwebtoken");
require('dotenv').config();

const createToken = () => {
  return jwt.sign({ hello: "world" }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = { createToken };
