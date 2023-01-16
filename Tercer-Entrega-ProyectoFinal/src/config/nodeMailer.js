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

/* const mailOptions = {
    from: TEST_EMAIL,
    to: 'garciar.gonzalo@gmail.com',
    subject: 'Sending Email using Node.js',
    html: '<h1>Welcome</h1><p>That was easy!</p>'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
}
); */

module.exports = transporter;



