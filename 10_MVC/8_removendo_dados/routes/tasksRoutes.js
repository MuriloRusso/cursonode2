const express = require('express');

const router = express.Router();


const TasksController = require('../controllers/Task');

router.get('/add', TasksController.createTask);
router.post('/add', TasksController.createTaskSave);
router.get('/delete/:id', TasksController.deleteTask);


router.get('/', TasksController.showTasks);


module.exports = router