'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

	const User = sequelize.define('User', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		email: { type: DataTypes.STRING, unique: true },
		phone: { type: DataTypes.STRING, unique: true },
		password: DataTypes.STRING,
		googleId: DataTypes.STRING,
		googleAccessToken: DataTypes.STRING,
		googleRefreshToken: DataTypes.STRING,
		passwordResetToken: DataTypes.STRING,
		passwordResetExpires: DataTypes.DATE,
		emailVerificationToken: DataTypes.STRING,
		emailVerified: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
	});

	User.associate = (models) => {
		models.User.hasMany(models.Order);
		models.User.hasMany(models.SavedData);
		models.User.hasMany(models.Appointment);
		//models.User.hasMany(models.Transaction);
	};

	User.beforeSave(async function (user) {
		if (user.changed('password')) {
			user.password = await bcrypt.hash(user.password, 10);
		}
	});

	User.prototype.toJSON = function () {
		const values = Object.assign({}, this.get());
		delete values.password;
		return values;
	};

	User.prototype.comparePassword = async function(candidatePassword) {
		return await bcrypt.compare(candidatePassword, this.password);
	};

	return User;

};
