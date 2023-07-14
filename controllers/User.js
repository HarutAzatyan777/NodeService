const {User, SavedData, Order, LawService, sequelize} = require('../models');
const {sendEmail} = require('../modules/sendgrid');
const {generateVerificationToken} = require("../helpers/utils");
const UserService = require("../services/user.service");
const SavedDataService = require("../services/savedData.service");
const validator = require('validator');
const validateJsonData=require("../helpers/jsonValidation") 


exports.getServices = async (req, res) => {
  try {

    const lawServices = await LawService.findAll();

    return res.json({services: lawServices});

  } catch (e) {
    return res.status(500).json({error: 'Internal Server Error'});
  }
}

exports.saveService = async (req, res) => {
  const { jsonData, serviceId } = req.body;
  const t = await sequelize.transaction();


  try {
    // Validate the jsonData
    const isValidJson = validateJsonData(jsonData);
    if (isValidJson.length > 0) {
      return res.status(400).json({ error: 'Invalid JSON data.', validationErrors: isValidJson });
    }
    // Retrieve the law service based on the serviceId
    const lawService = await LawService.findOne({
      where: {
        id: serviceId,
      },
    });

    // if (!lawService) {
    //   return res.status(404).json({ error: 'Law service not found.' });
    // }

   // const UserId = req.user.id;

    // const pendingOrder = await Order.create(
    //   {
    //     totalAmount: lawService.cost,
    //     status: 'PENDING',
    //     UserId,
    //     LawServiceId: lawService.id,
    //   },
    //   { transaction: t }
    // );
 
    const savedData = await SavedDataService.createSavedData(
      {
        jsonData: JSON.stringify(jsonData), // Convert jsonData to a string if necessary
        // UserId,
        // OrderId: pendingOrder.id,
        status: "pending",
        UserId: "e01640a8-9482-4858-8ca7-ecc406660492",
        LawServiceId: lawService.id,
      },
      { transaction: t }
    );
   
    await t.commit();

    return res.json({ message: 'Successfully saved your application' });
  } catch (error) {
    console.log('error....', error);
    await t.rollback();
    return res.status(500).json({ error: 'An error occurred while saving the service.' });
  }
};



exports.getService = async (req, res) => {
  const {serviceId: LawServiceId} = req.params;

  try {

    const UserId = req.user.id;

    const state = await SavedDataService.getSavedData({
      UserId,
      LawServiceId
    });
    return res.json({data: state});

  } catch (error) {
    return res.status(500).json({error: JSON.stringify(error)});
  }
}

exports.submitOrder = async (req, res) => {
  const {jsonData, serviceId} = req.body;

  const t = await sequelize.transaction();

  try {
    const user = await UserService.findUserByEmail(req.user.email);

    // serviceId
    const lawService = await LawService.findByPk(serviceId);
    const UserId = req.user.id;

    const pendingOrder = await Order.create({
      totalAmount: lawService.cost,
      status: 'PENDING',
      UserId,
      LawServiceId: lawService.id
    }, {transaction: t});

    const savedData = await SavedData.create({
      state: jsonData,
      UserId,
      OrderId: pendingOrder.id,
      LawServiceId: lawService.id
    }, {transaction: t});

    await t.commit();

    // todo find out the implementation with Ameria bank
    return res.json({message: 'Successfully saved your application'});
  } catch (error) {
    await t.rollback();
    return res.status(500).json({error});
  }
}

