const express = require('express')

const exphbs = require('express-handlebars');

const app = express();



 app.engine('handlebars', exphbs.engine())

 app.set('view engine', 'handlebars');

 app.get('/', (req, res) => {

   const user = {
      name: "Murilo",
      sobrenome: "Russo"
   }

   const auth = false;

   res.render('home', {user: user, auth})
 })


 app.listen(3000, ()=>{
    console.log('App rodando');
    
 })