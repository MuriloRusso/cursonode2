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
            inquirer.prompt([
                {
                    name: "account",
                    message: "Digite seu nome para localizarmos sua conta: "
                }
            ]).then((answers) => {
                const accountNameDeposit = answers.account;
        
                if(!fs.existsSync(`accounts/${accountNameDeposit}.json`)){
                    chalk.then((chalk)=> {
                        console.log(chalk.default.bgRed.black('Está conta não existe'));
                        operation();
                    })
                }
                else{
                    chalk.then((chalk)=> {
                        console.log(chalk.default.bgGreen.black('Saldo Atual: ' + saldo(answers.account)));
                    }).then(()=> {
                        operation();
                    }).catch(err => console.log(err))
                }
            }).catch(err => console.log(err));
        }
        else if(action === 'Depositar'){
            
            deposit();
        }
        else if(action === 'Sacar'){
            sacar();
        }
        else if(action === 'Sair'){
            chalk.then(chalk => {
                console.log(chalk.default.bgBlue.black('Obrigado por usar o Accounts!'));
            })
            .then(()=>{
                process.exit();
            })
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

//------------------




//consultar saldo

function saldo(account){
    const data = fs.readFileSync(`accounts/${account}.json`, 'utf8');
    const dataObject = JSON.parse(data);
    return dataObject.balance;
}
//------------------




//deposit

function deposit(){
    inquirer.prompt([
        {
            name: "account",
            message: "Digite seu nome para localizarmos sua conta: "
        }
    ]).then((answers) => {
        const accountNameDeposit = answers.account;

        if(!fs.existsSync(`accounts/${accountNameDeposit}.json`)){
            chalk.then((chalk)=> {
                console.log(chalk.default.bgRed.black('Está conta não existe'));
            })
            deposit();
        }
        else{
            makeDeposit(accountNameDeposit);
        }
    }).catch(err => console.log(err))
}

function makeDeposit(accountNameDeposit){
    chalk.then((chalk)=> {
        console.log(chalk.default.bgGreen.black('Sua conta foi localizada'));
    }).then(()=>{
        inquirer.prompt([
            {
                type: "number",
                name: "valor",
                message: "Digite o valor do deposito por favor:"
            }
        ]).then((answers) => {
            console.log(accountNameDeposit);
            const valor = answers.valor;
            const saldoAtual = saldo(accountNameDeposit);
            if(valor < 1 || isNaN(valor)){
                chalk.then(chalk => {
                    console.log(chalk.default.bgRed.black('Valor de deposito inválido'));
                    makeDeposit(accountNameDeposit);
                })
            }
            else{
                setBalance(accountNameDeposit, saldoAtual + valor);
            }

        }).catch(err => console.log(err));
    })
}




//set balance

function setBalance(account, valor) {
    fs.writeFile(`accounts/${account}.json`, `{"balance": ${valor}}`, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        chalk.then(chalk => {
            console.log(chalk.default.bgGreen.black(`Novo Saldo ${valor}`));
        }).then(() => {
            operation();
        }).catch(err => console.log(err))
    });
}







//saque

function sacar(){
    inquirer.prompt([
        {
            name: "account",
            message: "Digite seu nome para localizarmos sua conta: "
        }
    ]).then((answers) => {
        const account = answers.account;

        if(!fs.existsSync(`accounts/${account}.json`)){
            chalk.then((chalk)=> {
                console.log(chalk.default.bgRed.black('Está conta não existe'));
            })
            sacar();
        }
        else{
            makeSaque(account);
        }
    }).catch(err => console.log(err))
}

function makeSaque(account){
    chalk.then((chalk)=> {
        console.log(chalk.default.bgGreen.black('Sua conta foi localizada'));
    }).then(()=>{
        inquirer.prompt([
            {
                type: "number",
                name: "valor",
                message: "Digite o valor de saque por favor:"
            }
        ]).then((answers) => {
            console.log(account);
            const valor = answers.valor;
            const saldoAtual = saldo(account);
            if(valor < 1 || isNaN(valor) || valor > saldoAtual){
                chalk.then(chalk => {
                    console.log(chalk.default.bgRed.black('Valor de saque inválido'));
                    makeDeposit(account);
                })
            }
            else{
                setBalance(account, saldoAtual - valor);
            }

        }).catch(err => console.log(err));
    })
}


