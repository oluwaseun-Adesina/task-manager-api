const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
// database
require('./config/db');

// middlewares 
app.use(express.json());

// routes
app.use('/api/tasks', require('./routes/taskRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));

// error handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

