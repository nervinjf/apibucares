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
        const newGastos = req.body;
        const result = await TransferenciaServices.postTrans(newGastos);
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