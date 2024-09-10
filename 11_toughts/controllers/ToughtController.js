const Tought = require('../models/Tought');
const User = require('../models/User');
// const Op = require('sequelize');
const { Op } = require('sequelize');


module.exports = class ToughtController {
    static async showToughts(req, res){
        // const toughts = await Tought.findAll();
        const toughts = await Tought.findAll({
            include: User,
            order: [['createdAt', "DESC"]]
        });
        res.render('toughts/home', {toughts: toughts/*, users: users*/});
    }
    static async dashboard(req, res){
        console.log(req.session);
        
        if(!req.session.userid){
            req.flash('message', 'Você não está logado!');
            res.redirect('/');
            return;
        }
        const toughts = await Tought.findAll({
            where: {
                UserId: req.session.userid
            },
            order: [['createdAt', "DESC"]]
        });
        res.render('toughts/dashboard', {toughts: toughts});
    }
    static async newTought(req, res){
        res.render('toughts/new-tought')
    }
    static async newToughtPost(req, res) {
        const {title} = req.body;

        if(!title){
            //mensagem
            req.flash('Pensamento em branco.');
            res.redirect('toughts/new-tought');
            return;
        }
        const tought = {
            title,
            UserId: req.session.userid
        }
        try {
            const createdTought = await Tought.create(tought);
            // initialize session
            req.flash('message', 'Pensamento criado com sucesso!');
            res.redirect('/toughts/dashboard');

        } catch (error) {
            console.log(error);
        }

    }
    static async updateTought(req, res){        
        const tought = await Tought.findOne({where: {id: req.params.id}});
        res.render('toughts/update-tought', {tought: tought})
    }
    static async updateToughtPost(req, res) {
        const {id, title} = req.body;

        if(!title){
            //mensagem
            req.flash('Pensamento em branco.');
            res.redirect('toughts/update-tought');
            return;
        }
        const tought = {
            title
        }
        try {
            const updateTought = await Tought.update(tought, {where: {id: id}});
            // initialize session
            req.flash('message', 'Pensamento atualizado com sucesso!');
            res.redirect('/toughts/dashboard');
        } catch (error) {
            console.log(error);
        }
    }
    static async deleteTought(req, res){        
        const tought = await Tought.findOne({where: {id: req.params.id}});
        res.render('toughts/delete-tought', {tought: tought})
    }
    static async deleteToughtPost(req, res){
        const {id, title} = req.body;
        await Tought.destroy({where: {id: id}});
        res.redirect('/toughts/dashboard');
    }


    static async searchToughtPost(req, res) {
        const {search} = req.body;
        console.log(search);
        
        if(!search){
            const toughts = await Tought.findAll({
                where: {
                    UserId: req.session.userid
                },
                order: [['createdAt', "DESC"]]
            });
            res.render('toughts/dashboard', {toughts: toughts});
            return;
        }
        else{
            const toughts = await Tought.findAll({
                    where: {
                            title: {[Op.like]: `%${search}%`}, 
                            UserId: req.session.userid
                        },
                    order: [['createdAt', "DESC"]]
                });
            const toughtsQty = toughts.length;
            res.render('toughts/dashboard', {toughts: toughts, search, toughtsQty});
        }
    }

    static async searchToughtAllPost(req, res) {
        const {search} = req.body;
        console.log(search);
        
        if(!search){
            const toughts = await Tought.findAll({order: [['createdAt', "DESC"]]});
            res.render('toughts/home', {toughts: toughts});
            return;
        }
        else{
            const toughts = await Tought.findAll({
                where: {title: {[Op.like]: `%${search}%`}},
                order: [['createdAt', "DESC"]]            
            });
            const toughtsQty = toughts.length;
            res.render('toughts/home', {toughts: toughts, search, toughtsQty});
        }
    }


}
