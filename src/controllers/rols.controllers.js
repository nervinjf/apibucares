const { RolServices } = require('../services');

const RegisterRol = async (req, res, next) => {
    try {
        const newUser = req.body;
        const result = await RolServices.create(newUser);
        res.status(201).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "faltan datos",
        })
    }
};

module.exports = {
    RegisterRol,
}