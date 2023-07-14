const {sequelize, SavedData} = require('../models');
const AbstractService = require('./abstract.service');
const {uploadImage, getImage} = require('../modules/linode');

class SavedDataService extends AbstractService {

  constructor() {
    super(SavedData);
    this.imageFields = ['passportScan'];
  }

  async createSavedData(data, transaction) {
    const {jsonData} = data;
    /**
     * Bucket: 'my-bucket',
     * Key: 'orderId, passportScan.jpg',
     * */
    console.log(jsonData)
    let state = {...jsonData};

    // for (let field of this.imageFields) {
    //   if (state[field]) {

    //     const imageName = await uploadImage(`${OrderId}_${field}`, state[field]);
    //     console.log('imageName>>>>', imageName)

    //     state = {...state, [field]: imageName};

    //   }
    // }
    console.log({
      ...data,
      jsonData
    })
    console.log(transaction)

    return await this.service.create({
      ...data,
      jsonData
    }, transaction)
  }
  
  async getSavedData(data) {

    const {UserId, LawServiceId} = data;

    const service = await this.service.findOne({
      where: {
        LawServiceId,
        UserId
      }
    });

    let state = {...service.state};

    for (let field of this.imageFields) {

      const image = await getImage(`${service.OrderId}_${field}`);
      state = {...state, [field]: image};

    }

    return state;
  }

}

module.exports = new SavedDataService();
