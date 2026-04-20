const User = require('../models/User');
const UserPortfolio = require('../models/UserPortfolio');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, passwordConfirm, fullName } = req.body;

    if (!username || !email || !password || !passwordConfirm || !fullName) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const userExists = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (userExists) {
      if (userExists.email === email) {
        return res.status(409).json({ error: 'Email already registered' });
      }
      if (userExists.username === username) {
        return res.status(409).json({ error: 'Username already taken' });
      }
    }

    const user = await User.create({
      username,
      email,
      password,
      fullName
    });

    const token = generateToken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({ error: `${field} already exists` });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullName, username, email, currentPassword, newPassword } = req.body;

    if (!currentPassword) {
      return res.status(400).json({ error: 'Current password is required to save changes' });
    }

    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const oldUsername = user.username;

    // Verify current password
    const isPasswordValid = await user.matchPassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect current password' });
    }

    // Update fields if provided
    if (fullName) user.fullName = fullName;
    
    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(409).json({ error: 'Username already taken' });
      }
      user.username = username;
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(409).json({ error: 'Email already registered' });
      }
      user.email = email;
    }

    // Update password if new one is provided
    if (newPassword) {
      if (newPassword.length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters' });
      }
      user.password = newPassword;
    }

    user.updatedAt = Date.now();
    await user.save();

    // Sync with UserPortfolio if username or fullName changed
    if (username || fullName) {
      await UserPortfolio.findOneAndUpdate(
        { $or: [{ user: user._id }, { username: oldUsername }] },
        { 
          username: user.username,
          fullName: user.fullName,
          updatedAt: Date.now()
        }
      );
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
