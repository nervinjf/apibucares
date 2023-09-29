const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Tasa = db.define("tasas", {
    id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
    },
    Fecha:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    Tasa:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

module.exports = Tasa;