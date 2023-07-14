'use strict';

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Appointment.associate = (models) => {
    models.Appointment.belongsTo(models.User);
    models.Appointment.belongsTo(models.LawService);
  };

  return Appointment;
};

