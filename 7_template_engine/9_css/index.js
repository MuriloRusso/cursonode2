const express = require('express')

const exphbs = require('express-handlebars');

const app = express();


const hbs = exphbs.create({
   partialsDir: ['views/partials']
})


app.engine('handlebars', hbs.engine())

app.set('view engine', 'handlebars');

app.get('/', (req, res) => {

   const user = [
      {    
         name: "Murilo",
         sobrenome: "Russo"
      },
      {    
         name: "Kalleby",
         sobrenome: "Russo"
      },
      {    
         name: "Junior",
         sobrenome: "Garcia"
      },
      {    
         name: "Roger",
         sobrenome: "Guédes"
      }

   ]

   const auth = false;

   // res.render('home', {user: user, auth})
   res.render('home', {user: user, auth})

})


app.listen(3000, ()=>{
   console.log('App rodando');
   
})