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

    static async gethoy(){
        try {
            const result = await Tasa.findOne({
                order: [['Fecha', 'DESC']], // Ordenar por fecha de forma descendente
                limit: 1 // Limitar el resultado a 1 registro (el último)
            });
            return result;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }    
}

module.exports = TasaServices;