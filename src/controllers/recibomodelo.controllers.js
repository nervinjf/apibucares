const { RebiboMServices } = require('../services');

const GetRmodel = async (req, res, next) => {
    try {
        const result = await RebiboMServices.get();
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const RegisterRmodel = async (req, res, next) => {
    try {
        const newRM= req.body;
        const result = await RebiboMServices.postPrel(newRM);
        res.status(201).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "faltan datos",
        })
    }
};

const UpdateRmodel = async (req, res, next) => {
    try {
        const updRM = req.body;
        const { id } = req.params;
        const result = await RebiboMServices.update(id, updRM);
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const DeleteRmodel = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await RebiboMServices.deletePrel(id);
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
    GetRmodel,
    RegisterRmodel,
    UpdateRmodel,
    DeleteRmodel
}