const { ActionServices } = require('../services');

const reciboModelo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await ActionServices.convertirReciboModelo(id);
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const reciboEnv = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await ActionServices.EnviarRecibo(id);
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
    reciboModelo,
    reciboEnv
}
