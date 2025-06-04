const mysql = require('mysql2')

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'To_do_list'
})

module.exports = conexao 