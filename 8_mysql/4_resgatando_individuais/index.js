const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();


app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json());

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars');


app.use(express.static('public'));

app.get('/', (req, res) => {

    const sql = `SELECT * from books`;
    conn.query(sql, (err, data) => {
        
        if(err){
            console.log(err);
            
        }
        // res.redirect('/')
        const books = data;

        console.log(books);
        

        res.render('books', {books});
    })
    
})


app.get('/book/:id', (req, res) => {

    const sql = `SELECT * from books WHERE id=${req.params.id}`;
    conn.query(sql, (err, data) => {
        
        if(err){
            console.log(err);
            
        }
        // res.redirect('/')
        const books = data;

        console.log(books);
        

        res.render('books', {books});
    })
    
})

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;

    conn.query(sql, (err) => {

        if(err){
            console.log(err);
            
        }
        res.redirect('/')
    })

});



const conn = mysql.createConnection({
    host: 'srv1311.hstgr.io',
    user: 'u103987529_cursonodeuser',
    password: 'Teste234234*',
    database: 'u103987529_cursonode',
})



conn.connect((err) => {
    if (err) {
        return console.error('Erro ao conectar ao banco de dados:', err);
    }
    app.listen(3000, () => {
        console.log('App rodando na porta 3000');
    });
});



