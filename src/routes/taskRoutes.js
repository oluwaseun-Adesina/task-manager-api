const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');

const taskController = require('../controllers/taskController');

router.get('/', auth, taskController.getAllTasks);

router.get('/:id', auth, taskController.getTask);

router.post('/', auth,  taskController.createTask);

router.put('/:id', auth, taskController.updateTask);

router.put('/:id/status', auth, taskController.updateTaskStatus);

router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;