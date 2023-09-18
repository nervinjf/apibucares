const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const Gastos = db.define("gastos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    preliminarId: {
        type: DataTypes.INTEGER,
        field: 'preliminar_id',
    },
    reciboModeloId: {
        type: DataTypes.INTEGER,
        field: 'recibo_modelo_id',
    },
    nombre:{
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    Fecha:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    ncasa:{
        type: DataTypes.STRING(5),
        allowNull: false,
    },
    monto:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

module.exports = Gastos;