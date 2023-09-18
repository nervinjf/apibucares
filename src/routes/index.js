const UserRoutes = require("./users.routes");
const RolRoutes = require("./rols.routes");
const AbsRoutes = require("./abastecimiento.routes");
const PrelRoutes = require("./preliminar.routes");
const ReciboMRoutes = require("./recibomodelo.routes");
const GastosRoutes = require("./gastos.routes");
const authRoutes = require("./auth.routes");

module.exports = {
    UserRoutes,
    RolRoutes,
    AbsRoutes,
    PrelRoutes,
    ReciboMRoutes,
    GastosRoutes,
    authRoutes
}