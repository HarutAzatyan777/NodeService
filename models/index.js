const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const options = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  dialect: 'mysql',
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  connectionLimit: 100,
  logging: false
};

const sequelize = new Sequelize(options);

const modelsPath = path.join(__dirname, '/../models');
const mocksDir = path.join(__dirname, '/../mocks');

const toExport = {};

fs.readdirSync(modelsPath)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js') && (file !== 'index.js');
  })
  .forEach(file => {
    const model = require(path.join(modelsPath, file))(sequelize, Sequelize.DataTypes);
    console.log(`${model.name} table created successfully!`);
    toExport[model.name] = model;
  });

for (const modelName in toExport) {

  if (toExport[modelName].associate) {
    toExport[modelName].associate(toExport);
  }

}

sequelize.sync()
  .then(() => console.log(`Database & tables created!`))

const createMocks = async () => {

  let errorMock;
  try {

    const mockFiles = fs.readdirSync(mocksDir);

    mockFiles.sort();

    for (let i in mockFiles) {

      const modelName = mockFiles[i].split('_')[1].replace(/\..+/, '');
      const anyExists = await toExport[modelName].findOne();

      if (anyExists) {

        console.log('info', `[Sequelize Models] Data on table ${modelName} already exists, not mocking`);

      } else {

        const mock = require(path.join(mocksDir, mockFiles[i]));
        errorMock = mockFiles[i];
        await mock(toExport);
        console.log('info', `[Sequelize Models] Mock #${i + 1} COMPLETED`);

      }

    }

    console.log('info', `[Sequelize Models] Mocks complete`);


  } catch (e) {

    e.mockFile = errorMock;
    console.log('error', `[Sequelize Models] Error creating mocks: ${e.message || JSON.stringify(e)}`);
    // throw new Exception(-1, `[Sequelize Models] Error creating mocks: ${e.message || JSON.stringify(e)}`, e.message || JSON.stringify(e));

  }

}

createMocks();

module.exports = {
  sequelize,
  ...toExport
};
