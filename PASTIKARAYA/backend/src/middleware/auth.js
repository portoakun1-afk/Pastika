const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decode = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    req.user = decode;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Token tidak valid",
    });
  }
};