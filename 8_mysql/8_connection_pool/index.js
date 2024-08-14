const express = require('express');
const exphbs = require('express-handlebars');
const pool = require('./db/conn')

const app = express();

// app.use(
//     express.urlencoded({
//         extended: true,
//     })
// )
// app.use(express.json());


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    const sql = `SELECT * from books`;
    pool.query(sql, (err, data) => {        
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