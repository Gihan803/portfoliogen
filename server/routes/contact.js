const express = require('express');
const router = express.Router();
const UserPortfolio = require('../models/UserPortfolio');

const { BrevoClient } = require('@getbrevo/brevo');

// Initialize the Brevo Client
const client = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });

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

        // 2. Send email via Brevo
        await client.transactionalEmails.sendTransacEmail({
            sender: { email: process.env.BREVO_SENDER_EMAIL, name: 'PortfolioGen' },
            to: [{ email: ownerEmail }],
            replyTo: { email: email, name: name }, // visitor reply කරන්ට
            subject: `New Message from ${name} via PortfolioGen`,
            htmlContent: `
                <h3>New Contact Message</h3>
                <p><strong>From:</strong> ${name} (${email})</p>
                <p><strong>Portfolio:</strong> ${username}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        res.status(200).json({ success: true, message: 'Email sent successfully' });

    } catch (error) {
        console.error('❌ Server Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;