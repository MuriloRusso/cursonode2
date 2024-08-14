const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'srv1311.hstgr.io',
    user: 'u103987529_cursonodeuser',
    password: 'Teste234234*',
    database: 'u103987529_cursonode',
})

module.exports = pool