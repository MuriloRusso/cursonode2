const { DataType, DataTypes } = require('sequelize');

const db = require('../db/conn')

const User = require('./User');


const Address = db.define('Address', {
    street:{
        type: DataTypes.STRING,
        required: true
    },
    number: {
        type: DataTypes.STRING,
        required: true
    },
    city: {
        type: DataTypes.STRING,
        required: true

    }
})

Address.belongsTo(User); //método para criação de relacionamento (Cria coluna de relação automaticamente)

module.exports = Address