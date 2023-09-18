const { AbastecimientoServices } = require('../services');

const GetAbs = async (req, res, next) => {
    try {
        const result = await AbastecimientoServices.get();
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const RegisterAbs = async (req, res, next) => {
    try {
        const newAbs = req.body;
        console.log(newAbs)
        const result = await AbastecimientoServices.postAbs(newAbs);
        res.status(201).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "faltan datos",
        })
    }
};

const UpdateAbs = async (req, res, next) => {
    try {
        const updAbs = req.body;
        const { id } = req.params;
        const result = await AbastecimientoServices.update(id, updAbs);
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const DeleteAbs = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await AbastecimientoServices.DeleteAbs(id);
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
    GetAbs,
    RegisterAbs,
    UpdateAbs,
    DeleteAbs
}