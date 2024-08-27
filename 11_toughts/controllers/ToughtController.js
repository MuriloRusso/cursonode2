const Tought = require('../models/Tought');
const User = require('../models/User');


module.exports = class ToughtController {
    static async showToughts(req, res){
        const toughts = await Tought.findAll();
        // const users = await User.findAll();
        // console.log(users);

        /*const toughts = await Tought.findAll({
            include: [{
              model: User,
              attributes: ['name'],
              required: true // Faz um inner join
            }]
          });*/
        
        //   console.log(toughts);
        res.render('toughts/home', {toughts: toughts/*, users: users*/});
    }

    static async dashboard(req, res){
        console.log(req.session);
        
        if(!req.session.userid){
            req.flash('message', 'Você não está logado!');
            res.redirect('/');
            return;
        }
        const toughts = await Tought.findAll({where: {UserId: req.session.userid}});
        res.render('toughts/dashboard', {toughts: toughts});
    }
}
