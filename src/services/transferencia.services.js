const { Transferencia } = require('../models');

class TransferenciaServices {

    static async get(){
        try {
            const result = await Transferencia.findAll()
            return result;
        } catch (error) {
            throw error;
        }
    }    

    static async postTrans(newGastos){
        try {
            const result = await Transferencia.bulkCreate(newGastos)
            return result;
        } catch (error) {
            throw error;
        }
    }    

    static async update(id, updGastos){
        try {
            const result = await Transferencia.update(updGastos, {
                where: { id }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }    

    static async DeleteTrans(id){
        try {
            const result = await Transferencia.destroy({
                where: { id }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }    

}

module.exports = TransferenciaServices;