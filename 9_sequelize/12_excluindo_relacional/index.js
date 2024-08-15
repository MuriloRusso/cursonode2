const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn')


const User = require('./models/User');
const Address = require('./models/Address');

const app = express();

// app.use(


app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json());

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars');

app.use(express.static('public'));




app.get('/', async (req, res) => {
    const users = await User.findAll({ raw: true })
    res.render('home', {users: users});
})

app.get('/users/create', (req, res) => {
    res.render('adduser');
})

app.post('/users/create', async (req, res) => {
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if(newsletter === 'on'){
        newsletter = true;
    }
    else{
        newsletter = false;
    }
    await User.create({name, occupation, newsletter});
    res.redirect('/');
})




app.post('/users/update', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;
    if(newsletter === 'on'){
        newsletter = true;
    }
    else{
        newsletter = false;
    }

    const userData ={
        id,
        name,
        occupation,
        newsletter
    }

    await User.update( userData, {where: {id: id} });
    res.redirect('/');
})




app.get('/edituser/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ raw: true, where: {id: id}});
    const address = await Address.findAll({ raw: true, where: {UserId: id}});
    res.render('edituser', {user, address});
})

app.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id;
    console.log('ID delete: ', id);
    
    await User.destroy({where: {id: id}});
    res.redirect('/');
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ raw: true, where: {id: id}})
    res.render('userview', { user});
})

app.post('/address/create', async (req, res) => {
    const UserId = req.body.UserId;
    const street = req.body.street;
    const number = req.body.number;
    const city = req.body.city;
    
    // é possível tranformar os dados do formulário em um objeto, e passar o objeto como paramêtro do método Create
    // const address = {
    //     UserId,
    //     street,
    //     number,
    //     city
    // }

    // await Address.create({address});
    await Address.create({UserId, street, number, city});

    res.redirect(`/edituser/${UserId}`);
})


app.post('/address/delete', async (req, res) => {
    const id = req.body.id;
    const UserId = req.body.UserId;
    await Address.destroy({where: {id: id}});
    res.redirect(`/edituser/${UserId}`);
});



conn
    .sync()
    // .sync({force: true}) //função de resetar banco
    .then(() => {
    app.listen(3000, () => {
        console.log('App rodando na porta 3000');
    });
}).catch(err => console.log(err))

