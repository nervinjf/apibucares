const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Abastecimiento = db.define("abastecimiento", {
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
    codigo: {
        type: DataTypes.INTEGER,
    },
    nombre: {
        type: DataTypes.STRING(400),
        allowNull: false,
    },
}, {
    hooks: {
        beforeValidate(abastecimiento, options) {
            // Verifica si es un nuevo registro (no tiene código) y asigna un valor
            if (!abastecimiento.codigo) {
                // Encuentra el máximo valor actual de "codigo" en la base de datos
                return Abastecimiento.max('codigo')
                    .then((maxCodigo) => {
                        // Si no hay registros previos, establece el código en 1001
                        // De lo contrario, incrementa el máximo en 1
                        abastecimiento.codigo = maxCodigo ? maxCodigo + 1 : 1001;
                    });
            }
        },
    },
});

module.exports = Abastecimiento;