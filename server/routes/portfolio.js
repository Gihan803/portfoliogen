const express = require('express');
const {
  createPortfolio,
  getPortfolio,
  updatePortfolio,
  deletePortfolio
} = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:username', getPortfolio);
router.post('/', protect, createPortfolio);
router.put('/:username', protect, updatePortfolio);
router.delete('/:username', protect, deletePortfolio);

module.exports = router;
