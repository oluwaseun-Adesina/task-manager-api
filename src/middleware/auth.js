// authentication middleware
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            throw new Error('Authorization header missing');
        }
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        
        const user = await User.findOne({ _id: decoded.id});

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = {id: user._id, type: user.type, email: user.email, name: user.name};
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please LOgin', error: error });
    }
}

const admin = async (req, res, next) => {
    if (req.user.type !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to perform this operation' });
    }
    next();
}

module.exports = { auth, admin};