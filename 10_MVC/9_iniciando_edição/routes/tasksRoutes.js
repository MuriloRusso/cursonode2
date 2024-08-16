const express = require('express');

const router = express.Router();

const TasksController = require('../controllers/Task');

router.get('/add', TasksController.createTask);
router.post('/add', TasksController.createTaskSave);
router.get('/delete/:id', TasksController.deleteTask);
router.get('/edit/:id', TasksController.editTask);
router.post('/edit', TasksController.editTaskSave);
router.get('/check/:id', TasksController.checkTask);


router.get('/', TasksController.showTasks);

module.exports = router