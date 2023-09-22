const { Users, Vivienda, Recibo, ReciboModelo, Gastos } = require('../models');

class UserServices {
    static async create(user) {
        try {
            const result = await Users.create(user)
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getId(id) {
        try {
            const result = await Users.findByPk(id, {
                attributes: ["id", "nombre", "apellido", "correo", "rolId"],
                include: {
                  model: Vivienda,
                  as: "uservivienda",
                  attributes: ["nombre", "nroCasa", "telefono", "numero", "etapa", "sector", "casa", "calle", "recibospendientes", "deudadl", "deudabs", "status"],
                  include: [{
                    model: Recibo,
                    as: "viviendaRecibo",
                    attributes: ["id", "totalpagar", "montomes", "saldoanterio", "interesmora", "meses"],
                    include: [{
                      model: ReciboModelo,
                      as: "reciboRecibomodelo",
                      attributes: ["id", "Fecha", "bcv"],
                      include: [{
                        model: Gastos,
                        as: "recibomodeloGastos",
                        attributes: ["id", "nombre", "Fecha", "ncasa", "monto"],
                      }],
                    }],
                  }],
                },
              });
            return result;
        } catch (error) {
            console.log(error.original);
            console.log(error.stack);
            console.log(error.message);
            throw error;
        }
    }

}

module.exports = UserServices;