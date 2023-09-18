const { Users, Rol, Vivienda, Abastecimiento, Preliminar, ReciboModelo, Gastos } = require("./index");


const initModels = () =>{

    Rol.hasOne(Users, {as: "userrol", foreignKey: "rol_id"});
    Users.belongsTo(Rol, {as: "roluser", foreignKey: "rol_id"});

    Users.hasOne(Vivienda, {as: "uservivienda", foreignKey: "user_id"});
    Vivienda.belongsTo(Users, {as: "viviendauser", foreignKey: "user_id"});

    Users.hasMany(Abastecimiento, {as: "userAbaste", foreignKey: "user_id"});
    Abastecimiento.belongsTo(Users, {as: "abasteUser", foreignKey: "user_id"});

    Users.hasMany(Preliminar, {as: "userPreliminar", foreignKey: "user_id"});
    Preliminar.belongsTo(Users, {as: "recibomodeloUser", foreignKey: "user_id"});

    Users.hasMany(ReciboModelo, {as: "userRecibomodelo", foreignKey: "user_id"});
    ReciboModelo.belongsTo(Users, {as: "preliminarUser", foreignKey: "user_id"});

    Preliminar.hasMany(Gastos, {as: "preliminarGastos", foreignKey: "preliminar_id"});
    Gastos.belongsTo(Preliminar, {as: "gastosPreliminar", foreignKey: "preliminar_id"});

    ReciboModelo.hasMany(Gastos, {as: "recibomodeloGastos", foreignKey: "recibo_modelo_id"});
    Gastos.belongsTo(ReciboModelo, {as: "gastosRecibomodelo", foreignKey: "recibo_modelo_id"});

};

module.exports = initModels;