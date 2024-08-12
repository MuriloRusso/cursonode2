const fs = require('fs');

fs.rename('arquivo.txt', 'arquivoRenomeado.txt', (err) => {
    if(!err){
        console.log('Arquivo renomeado com sucesso!');
        return;
    }
    else{
        console.log(err);        
    }
})