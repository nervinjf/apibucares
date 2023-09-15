const { RegisterUsers, getuserId } = require("./users.controllers");
const { RegisterRol } = require("./rols.controllers");

module.exports = {
    getuserId,
    RegisterUsers,
    RegisterRol
}