const { TasaPostServices } = require('../services');

const Registertasa = async (req, res, next) => {
    try {
        const tasabcv = req.body;
        const result = await TasaPostServices.posttasa(tasabcv);
        res.status(201).json(result);
    } catch (error) {
        next({
            status: 500,
            errorContent: error,
            message: "Error interno del servidor",
        })
    }
};



module.exports = {
    Registertasa,
}