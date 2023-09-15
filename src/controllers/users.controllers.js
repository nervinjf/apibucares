const { UserServices } = require('../services');
const Thank = require("../templates/Bienvenida");
const transporter = require("../utils/mailer");

const RegisterUsers = async (req, res, next) => {
    try {
        const newUser = req.body;
        const result = await UserServices.create(newUser);
        res.status(201).json(result);

        transporter.sendMail({
            from: "<nervinjflores@gmail.com>",
            to: result.correo,
            subject: `Gracias por registrarte ${result.nombre + result.apellido}`,
            text: `Hola ${result.nombre + result.apellido}  bienvenido al conjunto Res. Los Bucares `,
            html: Thank(result),
          });

    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "faltan datos",
        })
    }
};

const getuserId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await UserServices.getId(id);
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Algo salio mal"
        })
    }
}

module.exports = {
    RegisterUsers,
    getuserId,
}