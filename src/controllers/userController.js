const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            if (!users) {
                return res.status(404).json({ message: 'No users found' });
            }
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getUser(req, res) {
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            hashPassword = bcrypt.hashSync(password, 10);
            const user = new User({ name, email, password: hashPassword });
            await user.save();
            res.status(201).json({message:"user created successfully, please login to continue."});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email});
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    },

    async updateUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const { name, email} = req.body;

            user.name = name;
            user.email = email;

            await user.save();

            res.status(200).json(user);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    },

    async deleteUser(req, res) {
        try {
            const user = await User.findById(req.params.id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            await user.delete();

            res.status(200).json({ message: 'User deleted' });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    },

};

module.exports = userController;