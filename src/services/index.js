const UserServices = require("./users.services");
const RolServices = require("./rols.services");
const AbastecimientoServices = require("./abastecimiento.services")
const PreliminarServices = require("./preliminar.services")
const RebiboMServices = require("./recibomodelo.services")
const GastosServices = require("./gastos.services")
const AuthServices = require("./auth.services");
const ActionServices = require("./action.services");
const ViviendaServices = require("./vivienda.services");
const ReciboServices = require("./recibo.services");
const TransferenciaServices = require("./transferencia.services");
const TasaServices = require("./tasa.services");
const TasaPostServices = require("./tasapost.services");


module.exports = {
    UserServices,
    RolServices,
    AbastecimientoServices,
    PreliminarServices,
    RebiboMServices,
    GastosServices,
    AuthServices,
    ActionServices,
    ViviendaServices,
    ReciboServices,
    TransferenciaServices,
    TasaServices,
    TasaPostServices
}