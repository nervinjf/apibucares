const { Recibo, ReciboModelo, Gastos } = require('../models');
const { TransferenciaServices } = require('../services');

const GetTransferencia = async (req, res, next) => {
    try {
        const result = await TransferenciaServices.get();
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const Registertransferencia = async (req, res, next) => {
    try {
        const dato = req.body;
        const { id, userId } = req.params;
        const result = await TransferenciaServices.postTrans(dato);
        console.log(dato)
        console.log(result)
        const recibo = await Recibo.findByPk(id, {
            attributes: ["id", "totalpagar", "montomes", "saldoanterio", "interesmora", "meses", "status"],
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
        if (result?.montoPagado >= recibo?.montomes) {
            const reciboP = await Recibo.update({ status: "Pagado", montopagado: result?.montoPagado, montorestante: 0, meses: (recibo?.meses - 1)}, {
                where: { id }
            })
            console.log("1pago", reciboP)
        } else {
            console.log(Recibo.montopagado)
            const pagado = Recibo.montopagado ? Recibo.montopagado : 0 += result?.montoPagado

            const reciboP = await Recibo.update({ status: "Deuda", montopagado: pagado, montorestante: (pagado - recibo?.montomes)}, {
                where: { id }
            })
            console.log("2pago", reciboP)
        }

            res.status(201).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "faltan datos",
        })
    }
};

const UpdateTransferencia = async (req, res, next) => {
    try {
        const updGastos = req.body;
        const { id } = req.params;
        const result = await TransferenciaServices.update(id, updGastos);
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const DeleteTransferencia = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await TransferenciaServices.DeleteTrans(id);
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

module.exports = {
    GetTransferencia,
    Registertransferencia,
    UpdateTransferencia,
    DeleteTransferencia
}