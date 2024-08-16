const Taks = require('../models/Task');

module.exports = class TaksController{
    
    static createTask(req, res){
        res.render('tasks/create');
    }
    static showTasks(req, res){
        res.render('tasks/all');
    }
}