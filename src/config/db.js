// database connection
const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.DATABASE_URL;

// connect to database and export connection
mongoose.connect(db, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true
})
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

module.exports = mongoose.connection;