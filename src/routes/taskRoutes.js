const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks);

router.get('/:id', taskController.getTask);

router.post('/', taskController.createTask);

router.put('/:id', taskController.updateTask);

router.put('/:id/status', taskController.updateTaskStatus);

router.delete('/:id', taskController.deleteTask);

module.exports = router;