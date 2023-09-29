const { TasaServices } = require('../services');

const Gettasa = async (req, res, next) => {
    try {
        const fecha = req.query.term; 
        const result = await TasaServices.get(fecha);
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const Gettasahoy = async (req, res, next) => {
    try {
        const result = await TasaServices.gethoy();
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
    Gettasa,
    Gettasahoy
}