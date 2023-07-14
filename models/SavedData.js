'use strict';
const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {

  const SavedData = sequelize.define('SavedData', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['pending', 'processing', 'shipped', 'delivered']],
          msg: "Status must be one of 'pending', 'processing', 'shipped', or 'delivered'"
        }
      }
    },
    total: {
      type: DataTypes.DECIMAL(10,2),
     // allowNull: false,
      validate: {
        isDecimal: true,
        min: 0
      }
    },
    jsonData: {
      type: DataTypes.JSON,
      allowNull: false,


    }
  });

  SavedData.associate = (models) => {
    models.SavedData.belongsTo(models.User);
    models.SavedData.belongsTo(models.LawService);
  };

  return SavedData;

};
