const fs = require('fs');

if(!fs.existsSync('./teste')){
    console.log('Não Existe');
    fs.mkdir('./teste', () => {
        console.log('Pasta criada');    
    });
}
else{
    console.log('Existe');
}