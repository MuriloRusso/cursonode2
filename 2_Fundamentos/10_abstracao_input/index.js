const inquirer = require('inquirer');

inquirer.prompt([
    {
    name: 'p1', 
    message: 'Qual a primeira nota? '
    },
    {
        name: "p2",
        message: "Qual a segunda nota?"
    }
]).then((answers) => {
    console.log(answers);
    console.log('A soma dos valores é:', parseFloat(answers.p1) + parseFloat(answers.p2));
    
    
}).catch(err => console.log(err))