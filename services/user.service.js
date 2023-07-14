const {User} = require('../models');
const AbstractService = require('./abstract.service');

class UserService extends AbstractService {

    constructor() {
        super(User);
        // super();
    }

    createUser(data) {
        return this.service.create(data);
    }

    getAllUsers() {
        return this.service.findAll({
            where: {}
        });
    }

    findUserByEmail(email) {
        return this.service.findOne({
            where: {
                email
            }
        });
    }

}

module.exports = new UserService();
