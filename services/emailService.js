const transporter = require('../configs/nodemailer.config');

const sendEmail = async (to, subject, text, html) => {
    try {
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to,
            subject,
            ...(text && { text }),
            ...(html && { html })
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.messageId);
    } catch (error) {
        console.error('Error sending email: ', error);
        const newError = new Error('Unable to send email!');
        newError.code = 500;
        throw newError;
    }
};

module.exports = { sendEmail };
