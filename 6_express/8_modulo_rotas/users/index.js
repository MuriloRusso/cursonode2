const express = require('express');
const router = express.Router();





const app = express();
const port = 3000;

const path = require('path');


// ler body;
router.use(
    express.urlencoded({
        extended: true,
    }),
)

router.use(express.json());

const basePath = path.join(__dirname, 'templates')



router.get('/', (req, res) => {
    // res.send('Olá Mundo');
    res.sendFile(`${basePath}/index.html`);
})



router.listen(port, () => {
    console.log('App rodando na porta:', port);    
})
