//modulos externos
const inquirer = require('inquirer');
const chalk = import('chalk');

//modulos internos
const fs = require('fs')

console.log('iniciamos o account');

// function operation(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: "Qual operação você gostaria de realizar?",
            choices: [
                'Criar Conta',
                'Consultar Saldo',
                'Depositar',
                'Sacar',
                'Sair',
            ],
        },
    ]).then((answers) => {
        console.log(answers.action);
        
    }

    ).catch(err => console.log(err))

// }


// operation();



// function chalkInit(func){
//     chalk.then(chalk => {
//         console.log(chalk.default.bgGreen.black(text));
//         // func();
//     })
// }

chalk.then(chalk => {
    console.log(chalk.default.green('testando chalk'));
})

// chalkInit(() => {console.log(chalk.default.bgGreen.black('testando chalk como função'))})