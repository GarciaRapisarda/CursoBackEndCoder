require('dotenv').config();

module.exports = {
    app: {
        persistencia: process.env.PERSISTENCE || 'fs',
    }
};
