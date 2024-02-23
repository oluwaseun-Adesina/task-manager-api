const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
// database
require('./config/db');

// middlewares 
app.use(express.json());

// routes
app.use('/api/tasks', require('./routes/api/taskRoutes'));
app.use('/api/users', require('./routes/api/userRoutes'));

//  handle not availble routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
}); 


// if no data found return error

// error handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

