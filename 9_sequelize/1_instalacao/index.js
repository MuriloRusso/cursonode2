const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn')

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

app.use(expres.static('public'))

app.get('/', (req, res) => {
    const sql = `SELECT * from books`;
    conn.query(sql, (err, data) => {        
        if(err){
            console.log(err);            
        }
        const books = data;
        res.render('home', {books});
    })
})


app.listen(3000, () => {
    console.log('App rodando na porta 3000');
});