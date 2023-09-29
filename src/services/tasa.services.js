const { Tasa } = require('../models');
const { Op } = require('sequelize');

class TasaServices {

    static async get(fecha){
        try {
            console.log(fecha)
            const result = await Tasa.findAll({
                where: {
                    [Op.or]: [
                        { Fecha: { [Op.eq]: fecha } },
                    ]
                },
                limit: 10
            });

            return result;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }    

}

module.exports = TasaServices;