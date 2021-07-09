const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AuthenticationError } = require("apollo-server-express");

const authorize = (req) => {
  const authorizationHeader = req.headers.authorization || "";
  if (!authorizationHeader) {
    req.isAuth = false;
    throw new AuthenticationError("You are not auth 1");
  }


  const token = authorizationHeader.replace("Bearer ", "");
  if (!token || token === "") {
    req.isAuth = false;
    throw new AuthenticationError("You are not auth 2");
  }


  let decodedJWT;
  try {
    decodedJWT = jwt.verify(token, process.env.SECRET);
    if (!decodedJWT) {
      req.isAuth = false;
      throw new AuthenticationError("You are not auth 3");
    }
    req.isAuth = true;
    req._id = decodedJWT._id;
    req.email = decodedJWT.email;
  } catch (err) {
    req.isAuth = false;
    throw new AuthenticationError("You are not auth 4");
  }

  
  return req;
};

module.exports = { authorize };
