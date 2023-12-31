const { BancoServices } = require('../services');

const getpagobdv = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await BancoServices.getPagobdv(id);
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Hay un error",
        })
    }
};

const postpagobdv = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await BancoServices.postPagobdv(data);
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
    getpagobdv,
    postpagobdv
}
