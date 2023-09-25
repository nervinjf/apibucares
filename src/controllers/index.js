const { RegisterUsers, getuserId } = require("./users.controllers");
const { RegisterRol } = require("./rols.controllers");
const { GetAbs, RegisterAbs, UpdateAbs, DeleteAbs } = require("./abastecimiento.controllers")
const { GetPrel, RegisterPrel, UpdatePrel, DeletePrel, GetIdPrel } = require("./preliminar.controllers")
const { GetVivienda, RegisterVivienda, UpdateVivienda, DeleteVivienda, GetIdVivienda } = require("./vivienda.controllers")
const { GetRmodel, RegisterRmodel, UpdateRmodel, DeleteRmodel, GetIdRecibomodel } = require("./recibomodelo.controllers")
const { GetRecibo, RegisterRecibo, UpdateRecibo, DeleteRecibo, GetIdRecibo } = require("./recibo.controllers")
const { Getgastos, Registergastos, Updategastos, Deletegastos } = require("./gastos.controllers")
const { userLogin } = require("./auth.controllers");
const { reciboModelo,reciboEnv } = require("./action.controllers");
const { GetTransferencia, Registertransferencia, UpdateTransferencia, DeleteTransferencia } = require("./transferencia.controllers");


module.exports = {
    getuserId,
    RegisterUsers,
    RegisterRol,
    GetAbs,
    RegisterAbs,
    UpdateAbs,
    DeleteAbs,
    GetPrel,
    RegisterPrel,
    UpdatePrel,
    DeletePrel,
    GetRmodel,
    RegisterRmodel,
    UpdateRmodel,
    DeleteRmodel,
    Getgastos,
    Registergastos,
    Updategastos,
    Deletegastos,
    userLogin,
    GetIdPrel,
    reciboModelo,
    GetIdRecibomodel,
    GetVivienda,
    RegisterVivienda,
    UpdateVivienda,
    DeleteVivienda,
    GetIdVivienda,
    GetRecibo,
    RegisterRecibo,
    UpdateRecibo,
    DeleteRecibo,
    GetIdRecibo,
    reciboEnv,
    GetTransferencia,
    Registertransferencia,
    UpdateTransferencia,
    DeleteTransferencia
}