const Task = require('../models/Task');

module.exports = class TaksController{
    
    static createTask(req, res){
        res.render('tasks/create');
    }

    static async deleteTask(req, res){
        const id = req.params.id;
        await Task.destroy({where: {id: id}});
        res.redirect('/tasks');
    }

    static async createTaskSave(req, res){
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }

        await Task.create(task);
        res.redirect('/tasks');
    }

    static async showTasks(req, res){
        const tasks = await Task.findAll();
        res.render('tasks/all', {tasks});
    }
}