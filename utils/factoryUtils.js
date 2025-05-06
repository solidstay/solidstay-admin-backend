const nodemailer = require('nodemailer');
const Stripe = require('stripe');

// Factory function for creating a nodemailer transporter
const createTransporter = (config) => {
    try {
        if (!config || !config.service || !config.senderEmail || !config.senderPassword) {
            throw 'Invalid config';
        }
        return nodemailer.createTransport({
            service: config.service,
            auth: {
                user: config.senderEmail,
                pass: config.senderPassword,
            },
        });
    } catch (error) {
        const newError = new Error('Failed to load Nodemailer!');
        newError.code = 400;
        throw newError;
    }
};

// Factory function for creating a Stripe client
const createStripeClient = (config) => {
    try {
        if (!config || !config.apiKey) {
            throw 'Invalid config';
        }
        return Stripe(config.apiKey);
    } catch (error) {
        const newError = new Error('Failed to load Stripe!');
        newError.code = 400;
        throw newError;
    }

};

module.exports = { createTransporter, createStripeClient };
