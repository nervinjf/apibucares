const { Preliminar, Gastos } = require('../models');

class PreliminarServices {

    static async get(){
        try {
            const result = await Preliminar.findAll({
                attributes:["id", "Fecha", "bcv"],
                include:{
                    model: Gastos,
                    as: "preliminarGastos",
                    attributes:["id", "nombre", "Fecha", "ncasa", "monto"]
                }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }    

    static async postPrel(newPrel){
        try {
            const result = await Preliminar.create(newPrel)
            return result;
        } catch (error) {
            throw error;
        }
    }    

    static async update(id, updPrel){
        try {
            const result = await Preliminar.update(updPrel, {
                where: { id }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }    

    static async deletePrel(id){
        try {
            const result = await Preliminar.destroy({
                where: { id }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }    

}

module.exports = PreliminarServices;