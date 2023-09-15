const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Rol = db.define("rol", {
    id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
    },
    nombre:{
        type: DataTypes.STRING(250),
        allowNull: false,
    },
});

module.exports = Rol;