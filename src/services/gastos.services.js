const { Gastos } = require('../models');

class GastosServices {

    static async get(){
        try {
            const result = await Gastos.findAll()
            return result;
        } catch (error) {
            throw error;
        }
    }    

    static async postgastos(newGastos){
        try {
            const result = await Gastos.bulkCreate(newGastos)
            return result;
        } catch (error) {
            throw error;
        }
    }    

    static async update(id, updGastos){
        try {
            const result = await Gastos.update(updGastos, {
                where: { id }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }    

    static async DeleteGastos(id){
        try {
            const result = await Gastos.destroy({
                where: { id }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }    

}

module.exports = GastosServices;