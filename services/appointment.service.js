const {sequelize, Appointment} = require('../models');
const AbstractService = require('./abstract.service');

class AppointmentService extends AbstractService {
  constructor() {
    super(Appointment);
    this.imageFields = ['passportScan'];
  }

  async createAppointment(data, transaction) {
    const { UserId, OrderId, LawServiceId, jsonData } = data;

    let appointmentData = {
      UserId,
      OrderId,
      LawServiceId,
      ...jsonData
    };

    // Fetch the law service details
    const lawService = await LawService.findByPk(LawServiceId);

    // Attach the law service information to the appointment data
    appointmentData = {
      ...appointmentData,
      service: lawService
    };



    return this.service.create(appointmentData, { transaction });
  }

  async getAppointment(data) {
    const { UserId, LawServiceId } = data;

    const appointment = await this.service.findOne({
      where: {
        UserId,
        LawServiceId
      }
    });

    let appointmentData = {
      ...appointment.dataValues
    };

    return appointmentData;
  }
}

module.exports = new AppointmentService();
