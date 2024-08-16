const { raw } = require('express');
const Task = require('../models/Task');

module.exports = class TaksController{
    
    static createTask(req, res){
        res.render('tasks/create');
    }

    static async editTask(req, res){
        const id = req.params.id;
        const task = await Task.findOne({where: {id: id}});
        res.render('tasks/edit', {task});
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

    static async editTaskSave(req, res){
        const id = req.body.id;
        
        const task = {
            title: req.body.title,
            description: req.body.description
        }
        await Task.update(task, {where: {id: id}});
        res.redirect('/tasks');
    }

    static async showTasks(req, res){
        const tasks = await Task.findAll();
        res.render('tasks/all', {tasks});
    }

    static async checkTask(req, res){
        const id = req.params.id;
        const taksCheck = await Task.findOne({where: {id: id}});
        const bool = !taksCheck.dataValues.done
        const task = {
            done: bool
        }        
        await Task.update(task, {where: {id: id}});
        res.redirect('/tasks');
    }
}