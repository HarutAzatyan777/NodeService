const {sequelize, Order} = require('../models');
const AbstractService = require('./abstract.service');

class OrderService extends AbstractService {

    constructor() {
        super(Order);
        // super();
    }

    getAllOrders() {
        return this.service.findAll({
            where: {}
        })
    }

    findOrderByEmail(email) {
        return this.service.findOne({
            where: {
                email
            }
        })
    }

}

module.exports = new OrderService();
