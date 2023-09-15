const { Rol } = require('../models');

class RolServices {
    static async create(user){
        try {
            const result = await Rol.create(user)
            return result;
        } catch (error) {
            throw error;
        }
    }    
}

module.exports = RolServices;