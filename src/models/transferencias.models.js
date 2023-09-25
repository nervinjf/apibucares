const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const Transferencia = db.define('transferencia', {
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
    ReciboId: {
        type: DataTypes.INTEGER,
        field: 'recibo_id',
        allowNull: false,
    },
    tipoDocumento:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    documentoIdentidad:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    codigoOperadora:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    numeroTelefono:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    BancoEmisor:{
        type: DataTypes.STRING,
    },
    nReferencia:{
        type: DataTypes.STRING,
    },
    fechaPago:{
        type: DataTypes.DATEONLY,
    },
    montoPagado: {
        type: DataTypes.FLOAT,
    }
})

module.exports = Transferencia;