const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Username atau password salah",
      });
    }

    if (password !== user.password) {
      return res.status(401).json({
        message: "Username atau password salah",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        nama: user.nama,
        username: user.username,
        role: user.role,
        seksi: user.seksi,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login berhasil",
      token,
      user: {
        nama: user.nama,
        username: user.username,
        role: user.role,
        seksi: user.seksi,
      },
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
