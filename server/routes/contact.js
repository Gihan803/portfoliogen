const express = require('express');
const router = express.Router();
const UserPortfolio = require('../models/UserPortfolio');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// @route   POST /api/contact/:username
// @desc    Send contact email to portfolio owner
// @access  Public
router.post('/:username', async (req, res) => {
    const { name, email, message } = req.body;
    const { username } = req.params;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    try {
        // 1. Find the portfolio owner
        const portfolio = await UserPortfolio.findOne({ username });
        if (!portfolio) {
            return res.status(404).json({ success: false, message: 'Portfolio not found' });
        }

        const ownerEmail = portfolio.contact.email;
        if (!ownerEmail) {
            return res.status(400).json({ success: false, message: 'Portfolio owner has no contact email set' });
        }

        // 2. Send email via Resend
        const { data, error } = await resend.emails.send({
            from: 'PortfolioGen <onboarding@resend.dev>',
            to: ownerEmail,
            subject: `New Message from ${name} via PortfolioGen`,
            html: `
                <h3>New Contact Message</h3>
                <p><strong>From:</strong> ${name} (${email})</p>
                <p><strong>Portfolio Username:</strong> ${username}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        if (error) {
            console.error('❌ Resend Error:', error);
            return res.status(400).json({ success: false, error });
        }

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('❌ Server Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
