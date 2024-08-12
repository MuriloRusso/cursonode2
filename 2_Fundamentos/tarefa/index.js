const inquirer = require('inquirer');
// import inquirer from 'inquirer';

inquirer.prompt(
    [
        {
            name: 'p1',
            message: "Qual o seu nome? "
        },
        {
            name: 'p2',
            message: "Qual a sua idade? "
        }
    ]
).then(
    (answers) => {
        console.log(`Olá ${answers.p1}, você tem ${answers.p2} anos`);

        if(parseInt(answers.p2) > 17){
            import('chalk').then(chalk => {
                console.log(chalk.default.bgGreen.black('Você tem idade para dirigir'));
            });
        }
        else{
            import('chalk').then(chalk => {
                console.log(chalk.default.bgRed.black('Você infelizmente não tem idade para dirigir'));
            });
        }

    }
).catch(err => console.log(err))

