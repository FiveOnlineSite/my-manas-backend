const jwt = require("jsonwebtoken");
const User = require("../../models/user/User");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
    res.status(200).json({
      message: "Login successful",
      token,
      user: { email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Utility route to add first user manually (not for frontend use)
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = new User({ email, password });
    await user.save();
    res
      .status(201)
      .json({ message: "User created", user: { email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
