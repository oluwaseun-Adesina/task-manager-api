const Task = require('../models/Task');

const taskController = {
    async getAllTasks(req, res) {
        try {
            const tasks = await Task.find({ user: req.user.id });

            if(tasks.length === 0) {
                return res.status(404).json({ message: 'No tasks found' });
            }
            
            // if (!tasks) {
            //     return res.status(404).json({ message: 'No tasks found' });
            // }
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getTask(req, res) {
        try {
            const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async createTask(req, res) {
        try {

            const { title, description, dueDate, category, status } = req.body;
        
            const task = new Task({ title, description, dueDate, category, status });
            task.user = req.user.id;
            await task.save();
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async updateTask(req, res) {
        try {
            const { title, description, dueDate, category, status } = req.body;
            const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            Object.keys(req.body).forEach(key => {
                task[key] = req.body[key];
            });
            await task.save();
            res.status(200).json(task);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async updateTaskStatus(req, res) {
        try {
            const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            task.status = req.body.status;

            await task.save();

            res.status(200).json(task);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async deleteTask(req, res) {
        try {
            const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            await Task.deleteOne({ _id: req.params.id, user: req.user.id });

            res.status(200).json({ message: 'Task deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = taskController;