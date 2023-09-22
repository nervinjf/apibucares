const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const Recibo = db.define('recibo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
    },
    viviendaId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'vivienda_id',
    },
    reciboModeloId: {
        type: DataTypes.INTEGER,
        field: 'recibo_modelo_id',
        allowNull: false,
    },
    totalpagar:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    montomes:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    saldoanterio:{
        type: DataTypes.FLOAT,
    },
    interesmora:{
        type: DataTypes.FLOAT,
    },
    meses:{
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.STRING(50),
    }
})

module.exports = Recibo;