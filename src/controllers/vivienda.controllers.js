const { ViviendaServices } = require('../services');

const GetVivienda = async (req, res, next) => {
    try {
        const result = await ViviendaServices.get();
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const GetIdVivienda = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await ViviendaServices.getId(id);
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const RegisterVivienda = async (req, res, next) => {
    try {
        const newPrel = req.body;
        const result = await ViviendaServices.postVivienda(newPrel);
        res.status(201).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "faltan datos",
        })
    }
};

const UpdateVivienda = async (req, res, next) => {
    try {
        const updPrel = req.body;
        const { id } = req.params;
        const result = await ViviendaServices.update(id, updPrel);
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const DeleteVivienda = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await ViviendaServices.deleteVivienda(id);
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
    GetVivienda,
    RegisterVivienda,
    UpdateVivienda,
    DeleteVivienda,
    GetIdVivienda
}