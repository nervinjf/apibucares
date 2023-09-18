const { RegisterUsers, getuserId } = require("./users.controllers");
const { RegisterRol } = require("./rols.controllers");
const { GetAbs, RegisterAbs, UpdateAbs, DeleteAbs } = require("./abastecimiento.controllers")
const { GetPrel, RegisterPrel, UpdatePrel, DeletePrel } = require("./preliminar.controllers")
const { GetRmodel, RegisterRmodel, UpdateRmodel, DeleteRmodel } = require("./recibomodelo.controllers")
const { Getgastos, Registergastos, Updategastos, Deletegastos } = require("./gastos.controllers")
const { userLogin } = require("./auth.controllers");


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
    userLogin
}