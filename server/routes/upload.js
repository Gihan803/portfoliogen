const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for Profile Images
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio_images',
    allowedFormats: ['jpeg', 'png', 'jpg', 'webp'],
  },
});

// Storage for Resumes (PDF)
const resumeStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio_resumes',
    resource_type: 'raw',     // PDFs have to be uploaded as raw or auto in Cloudinary
    format: 'pdf',           // Cloudinary ensures the format natively
  },
});

const uploadImage = multer({ storage: imageStorage });
const uploadResume = multer({ storage: resumeStorage });

// POST /api/upload - Upload Profile Image
router.post('/', uploadImage.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }
  res.json({ url: req.file.path, secure_url: req.file.path });
});

// POST /api/upload/resume - Upload PDF Resume
router.post('/resume', uploadResume.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No resume file provided' });
  }
  // For 'raw' resource_type, Cloudinary path acts as the URL download link
  res.json({ url: req.file.path, secure_url: req.file.path });
});

module.exports = router;
