const express = require('express');

const app = express();
const port = 3000;

const path = require('path');


// ler body;
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json());

const basePath = path.join(__dirname, 'templates')



app.get('/', (req, res) => {
    // res.send('Olá Mundo');
    res.sendFile(`${basePath}/index.html`);
})




app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

app.post('/users/save', (req, res) => {
    console.log(req.body);

    const name = req.body.name;
    const age = req.body.age;

    res.sendFile(`${basePath}/userform.html`);

})

app.get('/users/:id', (req, res) => {

    const id = req.params.id;

    console.log(`Estamos buscando o usuário de id ${id}`);
    

    res.sendFile(`${basePath}/users.html`);
})


app.listen(port, () => {
    console.log('App rodando na porta:', port);    
})
