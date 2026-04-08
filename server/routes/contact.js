const express = require('express');
const router = express.Router();
const UserPortfolio = require('../models/UserPortfolio');
const nodemailer = require('nodemailer');

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

        // 2. Configure Nodemailer Transporter (Gmail)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // 3. Prepare Email Options
        const mailOptions = {
            from: `"PortfolioGen" <${process.env.EMAIL_USER}>`,
            to: ownerEmail,
            replyTo: email,
            subject: `New Message from ${name} via PortfolioGen`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #4f46e5;">New Contact Message</h2>
                    <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
                    <p><strong>Portfolio Username:</strong> ${username}</p>
                    <hr style="border: 0; border-top: 1px solid #eee;" />
                    <p><strong>Message:</strong></p>
                    <p style="background: #f9fafb; padding: 15px; border-radius: 5px;">${message}</p>
                    <hr style="border: 0; border-top: 1px solid #eee;" />
                    <p style="font-size: 0.8em; color: #666;">This message was sent via your PortfolioGen contact form.</p>
                </div>
            `
        };

        // 4. Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('❌ Nodemailer Error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email. please try again later.' });
    }
});

module.exports = router;
