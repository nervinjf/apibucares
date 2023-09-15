const { Users, Rol, Vivienda } = require("./index");

const initModels = () =>{

    Rol.hasOne(Users, {as: "userrol", foreignKey: "rol_id"});
    Users.belongsTo(Rol, {as: "roluser", foreignKey: "rol_id"});

    Users.hasOne(Vivienda, {as: "uservivienda", foreignKey: "user_id"});
    Vivienda.belongsTo(Users, {as: "viviendauser", foreignKey: "user_id"});

};

module.exports = initModels;