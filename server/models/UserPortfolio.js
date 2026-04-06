const mongoose = require('mongoose');

const UserPortfolioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    match: /^[a-zA-Z0-9_-]+$/,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [20, 'Username must not exceed 20 characters']
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required']
  },
  title: {
    type: String,
    required: false,
    default: 'Developer'
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio must not exceed 500 characters']
  },
  about: {
    type: String
  },
  aboutImage: {
    type: String,
    default: null
  },
  profileImage: {
    type: String,
    default: null
  },
  resumeUrl: {
    type: String,
    default: null
  },
  contact: {
    email: {
      type: String,
      validate: {
        validator: (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: 'Invalid email format'
      }
    },
    linkedin: String,
    github: String,
    website: String
  },
  skills: [String],
  projects: [
    {
      name: {
        type: String,
        required: [true, 'Project name is required']
      },
      description: String,
      techStack: [String],
      githubLink: String,
      liveDemo: String
    }
  ],
  experience: [
    {
      company: String,
      role: String,
      duration: String,
      description: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserPortfolio', UserPortfolioSchema);
