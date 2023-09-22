const { ReciboServices } = require('../services');

const GetRecibo = async (req, res, next) => {
    try {
        const result = await ReciboServices.getR();
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const GetIdRecibo = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await ReciboServices.getId(id);
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const RegisterRecibo = async (req, res, next) => {
    try {
        const newRM= req.body;
        const result = await ReciboServices.postR(newRM);
        res.status(201).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "faltan datos",
        })
    }
};

const UpdateRecibo = async (req, res, next) => {
    try {
        const updRM = req.body;
        const { id } = req.params;
        const result = await ReciboServices.update(id, updRM);
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const DeleteRecibo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await ReciboServices.deleteR(id);
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
    GetRecibo,
    RegisterRecibo,
    UpdateRecibo,
    DeleteRecibo,
    GetIdRecibo
}