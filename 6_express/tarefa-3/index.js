const express = require('express');


const app = express();
const port = 5000;

const path = require('path');
const basePath = path.join(__dirname, 'templates');


//arquivos estáticos

app.use(express.static('public'));

const routes = require('./routes');

app.use('/routes', routes)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`);
})

app.listen(port, () => {
    console.log('App rodando na porta:', port);
})
