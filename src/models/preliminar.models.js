const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const Preliminar = db.define('preliminar', {
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

module.exports = Preliminar;