const { PreliminarServices } = require('../services');

const GetPrel = async (req, res, next) => {
    try {
        const result = await PreliminarServices.get();
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const GetIdPrel = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await PreliminarServices.getId(id);
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const RegisterPrel = async (req, res, next) => {
    try {
        const newVivienda = req.body;
        const result = await PreliminarServices.postPrel(newVivienda);
        res.status(201).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "faltan datos",
        })
    }
};

const UpdatePrel = async (req, res, next) => {
    try {
        const updPrel = req.body;
        const { id } = req.params;
        const result = await PreliminarServices.update(id, updPrel);
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const DeletePrel = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await PreliminarServices.deletePrel(id);
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
    GetPrel,
    RegisterPrel,
    UpdatePrel,
    DeletePrel,
    GetIdPrel
}