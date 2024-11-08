const jwt = require("jsonwebtoken");
const jwt_token = process.env.JWT_TOKEN;

function verifyToken(req, res, next) {
  const message = req.header("Authorization");

  if (!message) {
    // console.log("didn't receive any key");
    return res.status(401).json({ message: "No token Received." });
  }

  const token = message.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwt_token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Outdated or Invalid token" });
  }
}

module.exports = verifyToken;
