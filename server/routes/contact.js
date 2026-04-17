const express = require('express');
const router = express.Router();
const UserPortfolio = require('../models/UserPortfolio');

router.post('/:username', async (req, res) => {
    const { name, email, message } = req.body;
    const { username } = req.params;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    try {
        const portfolio = await UserPortfolio.findOne({ username });
        if (!portfolio) {
            return res.status(404).json({ success: false, message: 'Portfolio not found' });
        }

        const ownerEmail = portfolio.contact.email;
        if (!ownerEmail) {
            return res.status(400).json({ success: false, message: 'No contact email set' });
        }

        // Direct Brevo REST API call — no SDK needed
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                sender: {
                    email: process.env.BREVO_SENDER_EMAIL,
                    name: 'PortfolioGen'
                },
                to: [{ email: ownerEmail }],
                replyTo: { email: email, name: name },
                subject: `New Message from ${name} via PortfolioGen`,
                htmlContent: `
                    <h3>New Contact Message</h3>
                    <p><strong>From:</strong> ${name} (${email})</p>
                    <p><strong>Portfolio:</strong> ${username}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            console.error('❌ Brevo Error:', errData);
            return res.status(400).json({ success: false, error: errData });
        }

        res.status(200).json({ success: true, message: 'Email sent successfully' });

    } catch (error) {
        console.error('❌ Server Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;