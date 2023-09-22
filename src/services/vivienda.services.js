const { Vivienda, Gastos, Recibo, ReciboModelo } = require('../models');

class ViviendaServices {

    static async get() {
        try {
            const result = await Vivienda.findAll({
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
                        }]
                    }]
                }]
            })
            return result;
    } catch(error) {
        throw error;
    }
}

    static async getId(id) {
    try {
        const result = await Vivienda.findByPk(id, {
            attributes: ["nombre", "nroCasa", "telefono", "numero", "etapa", "sector", "casa", "calle", "recibospendientes", "deudadl", "deudabs", "status"],
            // include:{
            //     model: Gastos,
            //     as: "ViviendaGastos",
            //     attributes:["id", "nombre", "Fecha", "ncasa", "monto"]
            // }
        })
        return result;
    } catch (error) {
        throw error;
    }
}

    static async postVivienda(newVivienda) {
    try {
        const result = await Vivienda.create(newVivienda)
        return result;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

    static async update(id, updPrel) {
    try {
        const result = await Vivienda.update(updPrel, {
            where: { id }
        })
        return result;
    } catch (error) {
        throw error;
    }
}

    static async deleteVivienda(id) {
    try {
        const result = await Vivienda.destroy({
            where: { id }
        })
        return result;
    } catch (error) {
        throw error;
    }
}

}

module.exports = ViviendaServices;