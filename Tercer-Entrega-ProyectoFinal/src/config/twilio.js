const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

/* try {
    client.messages.create({
        body: 'Hola, este es un mensaje de prueba',
        from: '+15154937069',
        to: '+5491166596893'
    })
    .then(message => console.log(message.sid));
} catch (err) {
    console.log(err);
} */

module.exports = client;



