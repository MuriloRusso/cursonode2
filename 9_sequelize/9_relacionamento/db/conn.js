const { Sequelize } = require('sequelize');

const db = 'u103987529_cursonode';
const user = 'u103987529_cursonodeuser';
const password = 'Teste234234*';

const sequelize = new Sequelize(db, user, password, {
    host: 'srv1311.hstgr.io',
    dialect: 'mysql'
});


// try {
//     sequelize.authenticate();
//     console.log('Conectamos com sucesso o Sequelize!');
    
// } catch (error) {
//     console.log('Não foi possível conectar: ', error);   
// }

module.exports = sequelize;