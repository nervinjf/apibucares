const { Tasa } = require('../models');

class TasaServices {

    static async get(fecha){
        try {
            const result = await Tasa.findAll({
                where: {
                    [Op.or]: [
                        {Fecha: { [Op.like]: `%${fecha}` } },
                    ]
                },
                limit: 10
            });

            return result;
        } catch (error) {
            throw error;
        }
    }    

    static async posttasa(tasabcv){
        try {
            const result = await Tasa.create(tasabcv)
            return result;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = TasaServices;