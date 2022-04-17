const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(422).json({ error: "Please Login First" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    res.status(422).json({ error: error.stack });
  }
};

module.exports = isAuthenticated;
