const { GastosServices } = require('../services');

const Getgastos = async (req, res, next) => {
    try {
        const result = await GastosServices.get();
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const Registergastos = async (req, res, next) => {
    try {
        const newGastos = req.body;
        const result = await GastosServices.postgastos(newGastos);
        res.status(201).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "faltan datos",
        })
    }
};

const Updategastos = async (req, res, next) => {
    try {
        const updGastos = req.body;
        const { id } = req.params;
        const result = await GastosServices.update(id, updGastos);
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const Deletegastos = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await GastosServices.DeleteGastos(id);
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
    Getgastos,
    Registergastos,
    Updategastos,
    Deletegastos
}