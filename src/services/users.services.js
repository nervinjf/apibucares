const { Users } = require('../models');

class UserServices {
    static async create(user){
        try {
            const result = await Users.create(user)
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getId(id){
        try {
            const result = await Users.findByPk(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = UserServices;