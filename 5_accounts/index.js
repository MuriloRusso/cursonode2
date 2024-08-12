//modulos externos
const inquirer = require('inquirer');
const chalk = import('chalk');

//modulos internos
const fs = require('fs')

console.log('iniciamos o account');

function operation(){
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
        console.log('Opção selecionada: ' + answers['action']);

        const action = answers.action;

        if(action === 'Criar Conta'){
            createAccount()
        }
        else if(action === 'Consultar Saldo'){
            
        }
        else if(action === 'Depositar'){
            deposit();
        }
        else if(action === 'Sacar'){
            
        }
        else if(action === 'Sair'){
            chalk.then(chalk => {
                console.log(chalk.default.bgBlue.black('Obrigado por usar o Accounts!'));
            })
            .then(()=>{
                process.exit();
            })
            // process.exit();
        }
    }

    ).catch(err => console.log(err))

}


operation();



//create account
function createAccount(){
    chalk.then(chalk => {
        console.log(chalk.default.bgGreen.black('Parabéns por escolher o nosso banco!'));
        console.log(chalk.default.green('Defina as opções da sua conta a seguir'));        
    })
    buildAccount();

}

function buildAccount(){
    inquirer.prompt([
        {
            name: "accountName",
            message: "Digite o seu nome:"
        }
    ]).then((answers) => {

        const accountName = answers.accountName;
        console.info(accountName);
        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts');
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(
                chalk.then(chalk => {
                    console.log(chalk.default.bgRed.black('Está conta já existe'));
                    buildAccount();
                })
            );            
        }
        else{
            console.log(
                chalk.then(chalk => {
                    fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function(err){
                        console.log(err);                        
                    })                    
                    console.log(chalk.default.bgGreen.black('Conta criada com sucesso!'));
                    operation();
                })
            );
        }

    }).catch(erro => console.log(erro))
    // fs.createFile()
}


function deposit(){
    inquirer.prompt([
        {
            name: "account",
            message: "Digite seu nome para localizarmos sua conta: "
        }
    ]).then((answers) => {
        // console.log(answers.valor);
        const accountNameDeposit = answers.account;

        if(!fs.existsSync(`accounts/${accountNameDeposit}.json`)){
            chalk.then((chalk)=> {
                console.log(chalk.default.bgRed.black('Está conta não existe'));
            })
            deposit();
        }
        else{
            chalk.then((chalk)=> {
                console.log(chalk.default.bgGreen.black('Sua conta foi localizada'));
            }).then(()=>{
                inquirer.prompt([
                    {
                        type: "number",
                        name: "valor",
                        message: "Digite o valor do deposito por favor: "
                    }
                ]).then((answers) => {
                    console.log(accountNameDeposit);
                    const valor = answers.valor;
                    const data = fs.readFileSync(`accounts/${accountNameDeposit}.json`, 'utf8');
                    dataObject = JSON.parse(data);
                    setBalance(accountNameDeposit, dataObject.balance + valor)
                }).catch(err => console.log(err));
            })
        }
    }).catch(err => console.log(err))
}

function setBalance(account, valor) {
    fs.writeFile(`accounts/${account}.json`, `{"balance": ${valor}}`, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        chalk.then(chalk => {
            console.log(chalk.default.bgGreen.black(`Novo Saldo ${valor}`));        
        })
    });    
}

