const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const {admin, auth} = require('../middleware/auth');

router.get('/', auth, admin,userController.getAllUsers);

router.get('/currentuser',auth,userController.getUser);

router.post('/login', userController.loginUser);

router.post('/create', userController.createUser);

router.put('/:id',auth, userController.updateUser);

router.delete('/:id',auth,admin,userController.deleteUser);

module.exports = router;