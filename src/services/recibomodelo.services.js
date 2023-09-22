const { ReciboModelo, Gastos } = require('../models');

class RebiboMServices {

    static async get(){
        try {
            const result = await ReciboModelo.findAll(({
                attributes:["id", "Fecha", "bcv"],
                include:{
                    model: Gastos,
                    as: "recibomodeloGastos",
                    attributes:["id", "nombre", "Fecha", "ncasa", "monto"]
                }
            }))
            return result;
        } catch (error) {
            throw error;
        }
    }    

    static async getId(id){
        try {
            const result = await ReciboModelo.findByPk(id,{
                attributes:["id", "Fecha", "bcv"],
                include:{
                    model: Gastos,
                    as: "recibomodeloGastos",
                    attributes:["id", "nombre", "Fecha", "ncasa", "monto"]
                }
            })
            return result;
        } catch (error) {
            throw error;
        }
    } 

    static async postPrel(newRM){
        try {
            const result = await ReciboModelo.create(newRM)
            return result;
        } catch (error) {
            throw error;
        }
    }    

    static async update(id, updPrel){
        try {
            const result = await ReciboModelo.update(updRM, {
                where: { id }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }    

    static async deletePrel(id){
        try {
            const result = await ReciboModelo.destroy({
                where: { id }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }    

}

module.exports = RebiboMServices;