const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const ReciboModelo = db.define('recibomodelo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Fecha:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    bcv:{
        type: DataTypes.FLOAT,
        allowNull: false,
    }
})

module.exports = ReciboModelo;