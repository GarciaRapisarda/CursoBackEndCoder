const nodeMailer = require('nodemailer');

const TEST_EMAIL = process.env.TEST_EMAIL;
const TEST_PASSWORD = process.env.TEST_PASSWORD;

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: TEST_EMAIL,
        pass: TEST_PASSWORD
    }
});

module.exports = transporter;



