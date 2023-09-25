const { Users, Rol, Vivienda, Abastecimiento, Preliminar, ReciboModelo, Gastos, Recibo, Transferencia } = require("./index");


const initModels = () =>{

    Rol.hasOne(Users, {as: "userrol", foreignKey: "rol_id"});
    Users.belongsTo(Rol, {as: "roluser", foreignKey: "rol_id"});

    Users.hasOne(Vivienda, {as: "uservivienda", foreignKey: "user_id"});
    Vivienda.belongsTo(Users, {as: "viviendauser", foreignKey: "user_id"});

    Users.hasMany(Recibo, {as: "userrecibo", foreignKey: "user_id"});
    Recibo.belongsTo(Users, {as: "recibouser", foreignKey: "user_id"});

    Users.hasMany(Abastecimiento, {as: "userAbaste", foreignKey: "user_id"});
    Abastecimiento.belongsTo(Users, {as: "abasteUser", foreignKey: "user_id"});

    Users.hasMany(Preliminar, {as: "userPreliminar", foreignKey: "user_id"});
    Preliminar.belongsTo(Users, {as: "recibomodeloUser", foreignKey: "user_id"});

    Users.hasMany(ReciboModelo, {as: "userRecibomodelo", foreignKey: "user_id"});
    ReciboModelo.belongsTo(Users, {as: "preliminarUser", foreignKey: "user_id"});

    Preliminar.hasMany(Gastos, {as: "preliminarGastos", foreignKey: "preliminar_id", onDelete: "CASCADE",});
    Gastos.belongsTo(Preliminar, {as: "gastosPreliminar", foreignKey: "preliminar_id", onDelete: "CASCADE",});

    ReciboModelo.hasMany(Gastos, {as: "recibomodeloGastos", foreignKey: "recibo_modelo_id"});
    Gastos.belongsTo(ReciboModelo, {as: "gastosRecibomodelo", foreignKey: "recibo_modelo_id"});

    ReciboModelo.hasOne(Recibo, {as: "recibomodeloRecibo", foreignKey: "recibo_modelo_id"});
    Recibo.belongsTo(ReciboModelo, {as: "reciboRecibomodelo", foreignKey: "recibo_modelo_id"});

    Vivienda.hasMany(Recibo, {as: "viviendaRecibo", foreignKey: "vivienda_id"})
    Recibo.belongsTo(Vivienda, {as: "recibovivienda", foreignKey: "vivienda_id"});

    Recibo.hasMany(Transferencia, {as: "transferenciaRecibo", foreignKey: "recibo_id"})
    Transferencia.belongsTo(Recibo, {as: "recibotransferencia", foreignKey: "recibo_id"});

};

module.exports = initModels;