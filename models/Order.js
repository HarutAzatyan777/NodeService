'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

	const Order = sequelize.define('Order', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		totalAmount: { type: DataTypes.INTEGER },
		isPaid: { type: DataTypes.INTEGER, defaultValue: 0 },
		status: { type: DataTypes.ENUM(['PENDING', 'COMPLETED']) },
	});

	Order.associate = (models) => {
		models.Order.belongsTo(models.User);
		models.Order.belongsTo(models.LawService);
		// models.Order.hasMany(models.SavedData);
	//	todo
	//	can have several transactions or one?
	};

	return Order;

};
