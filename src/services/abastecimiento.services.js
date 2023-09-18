const { Abastecimiento } = require('../models');

class AbastecimientoServices {

    static async get(){
        try {
            const result = await Abastecimiento.findAll()
            return result;
        } catch (error) {
            throw error;
        }
    }    

    static async postAbs(newAbs){
        try {
            console.log(newAbs)
            const result = await Abastecimiento.create(newAbs)
            console.log(result)
            return result;
        } catch (error) {
            console.log(error.original);
            console.log(error.stack);
            console.log(error.message);
            throw error;
        }
    }    

    static async update(id, updAbs){
        try {
            const result = await Abastecimiento.update(updAbs, {
                where: { id }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }    

    static async DeleteAbs(id){
        try {
            const result = await Abastecimiento.destroy({
                where: { id }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }    

}

module.exports = AbastecimientoServices;