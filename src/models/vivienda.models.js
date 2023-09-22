const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Vivienda = db.define("vivienda", {
    id:{
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
    nombre:{
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    nroCasa:{
        type: DataTypes.STRING(10),
        allowNull: false,
        field: 'nro_casa',
    },
    telefono:{
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    numero:{
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    etapa:{
        type: DataTypes.STRING(5),
        allowNull: false,
    },
    sector:{
        type: DataTypes.STRING(5),
        allowNull: false,
    },
    casa:{
        type: DataTypes.STRING(5),
        allowNull: false,
    },
    calle:{
        type: DataTypes.STRING(5),
        allowNull: false,
    },
    recibospendientes:{
        type: DataTypes.INTEGER,
        field: 'recibos_pendientes',
    },
    deudadl:{
        type: DataTypes.INTEGER,
    },
    deudabs:{
        type: DataTypes.INTEGER,
    },
    status:{
        type: DataTypes.STRING(50),
    },
})

module.exports = Vivienda;