const express = require('express');

const app = express();
const port = 3000;

const path = require('path');


const usersRoutes = require('./users');

// ler body;
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json());

const basePath = path.join(__dirname, 'templates')


app.use('/users', usersRoutes)


app.get('/', (req, res) => {
    // res.send('Olá Mundo');
    res.sendFile(`${basePath}/index.html`);
})

app.listen(port, () => {
    console.log('App rodando na porta:', port);
})
