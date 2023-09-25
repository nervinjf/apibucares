const { Users, Vivienda, Recibo, ReciboModelo, Gastos, Transferencia } = require('../models');

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
                include: [
                    {
                        model: Vivienda,
                        as: "uservivienda",
                        attributes: ["id", "nombre", "nroCasa", "telefono", "numero", "etapa", "sector", "casa", "calle", "recibospendientes", "deudadl", "deudabs", "status"],
                        include: {
                            model: Recibo,
                            as: "viviendaRecibo",
                            attributes: ["id", "totalpagar", "montomes", "saldoanterio", "interesmora", "meses", "status"],
                            include: [{
                                model: ReciboModelo,
                                as: "reciboRecibomodelo",
                                attributes: ["id", "Fecha", "bcv"],
                                // where: { id: 21},
                                include: {
                                    model: Gastos,
                                    as: "recibomodeloGastos",
                                    attributes: ["id", "nombre", "Fecha", "ncasa", "monto"],
                                }
                            },{
                                model: Transferencia,
                                as: "transferenciaRecibo",
                                attributes: ["id", "tipoDocumento", "documentoIdentidad", "codigoOperadora", "numeroTelefono", "BancoEmisor", "nReferencia", "fechaPago", "montoPagado"],
                            }]
                        }
                    }]

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