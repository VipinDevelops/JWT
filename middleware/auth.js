const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A toke is required for Authentication");
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
