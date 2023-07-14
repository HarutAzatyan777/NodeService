'use strict';

module.exports = (sequelize, DataTypes) => {

	const LawService = sequelize.define('LawService', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: { type: DataTypes.STRING },
		description: { type: DataTypes.STRING },
		cost: { type: DataTypes.INTEGER },
	});

	LawService.associate = (models) => {
		models.LawService.hasMany(models.Order);
		models.LawService.hasMany(models.SavedData);
        models.LawService.hasMany(models.Appointment);

	};

	return LawService;

};
