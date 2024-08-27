const User = require('../models/User');

const bcrypt = require('bcryptjs');

// const raw = require('raw')

module.exports = class AuthController {
    static login(req, res){
        res.render('auth/login')
    }
    static logout(req, res){
        
        req.flash('message', 'Você se deslogou com sucesso!')
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                res.send('Erro ao destruir a sessão');
            } else {
                res.redirect('/login')
            }
        });
    }
    static register(req, res){
        res.render('auth/register')
    }
    static async registerPost(req, res) {
        const {name, email, password, passwordConfirm} = req.body;

        //password match validation
        if(password != passwordConfirm){
            //mensagem
            req.flash('message', 'As senhas não conferem, por favor, tente novamente.');
            res.render('auth/register');
            return;
        }

        // check if user exists
        const checkIfUserExists = await User.findOne({where: {email: email}})
        if(checkIfUserExists){
            req.flash('message', 'O e-mail já está em uso.');
            res.render('auth/register');
            return;
        }
        //create password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {
            const createdUser = await User.create(user);

            // initialize session

            req.session.userid = createdUser.id;

            req.flash('message', 'Cadastro realizado com sucesso!');

            req.session.save(()=>{
                res.redirect('/');
            })

        } catch (error) {
            console.log(error);
        }

    }

    static async loginPost(req, res) {
        const {email, password} = req.body;

        //password match validation
        if(!email){
            //mensagem
            req.flash('message', 'E-mail em branco.');
            res.render('auth/register');
            return;
        }
        
        // check if user exists
        const user = await User.findOne({where: {email: email}});

        // check password
        const passwordMatch = bcrypt.compareSync(password, user.dataValues.password);

        if(passwordMatch){
            req.session.userid = user.dataValues.id;
            req.flash('message', 'Login realizado com sucesso!');
            req.session.save(() => {
                res.redirect('/');
            });
            return;
        }
        req.flash('message', 'Credenciais inválidas!');
        res.redirect('/login');
        return;
        // res.redirect('/');
    }
}
