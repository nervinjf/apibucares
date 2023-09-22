const { Recibo, Gastos, ReciboModelo } = require('../models');

class ReciboServices {

    static async getR() {
        try {
            const result = await Recibo.findAll(({
                attributes: ["id", "totalpagar", "montomes", "saldoanterio", "interesmora", "meses"],
                include: {
                    model: ReciboModelo,
                    as: "reciboRecibomodelo",
                    attributes: ["id", "Fecha", "bcv"],
                    include: {
                        model: Gastos,
                        as: "recibomodeloGastos",
                        attributes: ["id", "nombre", "Fecha", "ncasa", "monto"]
                    }
                }
            }))
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getId(id) {
        try {
            const result = await Recibo.findByPk(id, {
                attributes: ["id", "totalpagar", "montomes", "saldoanterio", "interesmora", "meses"],
                include: {
                    model: ReciboModelo,
                    as: "reciboRecibomodelo",
                    attributes: ["id", "Fecha", "bcv"],
                    include: {
                        model: Gastos,
                        as: "recibomodeloGastos",
                        attributes: ["id", "nombre", "Fecha", "ncasa", "monto"]
                    }
                }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async postR(newRM) {
        try {
            const result = await Recibo.create(newRM)
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, updPrel) {
        try {
            const result = await Recibo.update(updRM, {
                where: { id }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async deleteR(id) {
        try {
            const result = await Recibo.destroy({
                where: { id }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ReciboServices;