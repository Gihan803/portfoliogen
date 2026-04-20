const UserPortfolio = require('../models/UserPortfolio');
const User = require('../models/User');

exports.createPortfolio = async (req, res) => {
  try {
    const { username, fullName, title, about, aboutImage, bio, profileImage, resumeUrl, contact, skills, projects, experience } = req.body;

    if (!username || !fullName) {
      return res.status(400).json({ error: 'Username and fullName are required' });
    }

    const user = await User.findById(req.user.id);
    if (user.username !== username) {
      return res.status(403).json({ error: 'You can only create portfolios for your own username' });
    }

    const existingPortfolio = await UserPortfolio.findOne({ username });
    if (existingPortfolio) {
      return res.status(409).json({ error: `Portfolio for username '${username}' already exists` });
    }

    const portfolio = new UserPortfolio({
      user: req.user.id,
      username,
      fullName,
      title,
      about,
      aboutImage,
      bio,
      profileImage,
      resumeUrl,
      contact,
      skills,
      projects,
      experience
    });

    await portfolio.save();
    res.status(201).json({ message: 'Portfolio created successfully', data: portfolio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPortfolio = async (req, res) => {
  try {
    const { username } = req.params;
    const portfolio = await UserPortfolio.findOne({ username });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePortfolio = async (req, res) => {
  try {
    const { username } = req.params;
    const updates = req.body;

    const user = await User.findById(req.user.id);
    
    if (user.username !== username) {
      return res.status(403).json({ error: 'Not authorized to update this portfolio' });
    }

    const portfolio = await UserPortfolio.findOneAndUpdate(
      { username },
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json({ message: 'Portfolio updated successfully', data: portfolio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findById(req.user.id);
    
    if (user.username !== username) {
      return res.status(403).json({ error: 'Not authorized to delete this portfolio' });
    }

    const portfolio = await UserPortfolio.findOneAndDelete({ username });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
