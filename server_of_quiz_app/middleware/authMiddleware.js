const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel
        .findOne({ _id: decoded._id })
        .select("-password");
      next();
    } catch (error) {
      return res.status(400).json({
        message: "token verification failed",
      });
    }
  } else {
    return res.status(403).json({
      message: "Token is not present",
    });
  }
};

module.exports = { protect };
