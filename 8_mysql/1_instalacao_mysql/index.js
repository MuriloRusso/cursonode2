const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars');


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
})

const conn = mysql.createConnection({
    host: 'srv1311.hstgr.io',
    user: 'u103987529_cursonodeuser',
    password: 'Teste234234*',
    database: 'u103987529_cursonode'
})


conn.connect((err) => {

    if(err){
        return console.log(err);        
    }
    console.log('Conectado');
    
});