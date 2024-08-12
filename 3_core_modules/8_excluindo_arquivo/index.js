const http = require('http');
const fs = require('fs');

const port = 3000;

const server = http.createServer((req, res) => {

    fs.unlink('arquivo.txt', () => {
        res.end();
    })
});

server.listen(port, () => {
    console.log("Servidor rodando na porta:", port);
});