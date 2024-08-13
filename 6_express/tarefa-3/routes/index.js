const express = require('express');
const router = express.Router();

const path = require('path');

router.use(express.json());
const basePath = path.join(__dirname, '../templates')

router.get('/contato', (req, res) => {
    res.sendFile(`${basePath}/contato.html`)
})

router.get('/sobre', (req, res) => {
    res.sendFile(`${basePath}/sobre-nos.html`)
})

module.exports = router;