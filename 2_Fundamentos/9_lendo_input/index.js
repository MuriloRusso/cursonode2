const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question('Qual time você torce? ', (language) => {
    console.log(`Eu torço para o ${language}`);
    readline.close();    
})