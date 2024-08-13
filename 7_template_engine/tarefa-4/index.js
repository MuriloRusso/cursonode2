const express = require('express')
const exphbs = require('express-handlebars');
const app = express();

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars');

app.use(express.static('publics'));



const products = [
    {    
        id: 1,
        name: "Playstation 5",
        preco: 3000
    },
    {    
        id: 2,
        name: "Playstation 4",
        preco: 1500
    },
    {    
        id: 3,
        name: "X/Box Series X",
        preco: 3000
    },
    {    
        id: 4,
        name: "X/Box Series S",
        preco: 2000
    },
    {    
        id: 5,
        name: "X/Box One",
        preco: 1300
    },

]



app.get('/', (req, res) => {
    res.render('home', {products: products})
})


app.get('/product/:id', (req, res) => {
    res.render('product', {product: products.find(product => product.id == req.params.id)})
})


app.listen(3000, ()=>{
    console.log('App rodando');
})