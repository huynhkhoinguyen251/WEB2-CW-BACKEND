const mongoose = require('mongoose');
const User = mongoose.model('User');

// POST login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username, password });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    
    res.json({ 
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST register
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    
    const newUser = new User({ username, password });
    const savedUser = await newUser.save();
    
    res.status(201).json({ 
      message: "Registration successful",
      user: {
        id: savedUser._id,
        username: savedUser.username
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};