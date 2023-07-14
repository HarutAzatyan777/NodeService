const { Appointment } = require('../models');

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    console.log("appointments")
    console.log(appointments)
    return res.json({ appointments });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific appointment by ID
exports.getAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    return res.json({ appointment });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new appointment
exports.createAppointment = async (req, res) => {
  const { date, lawServiceId } = req.body;

  try {
    const newAppointment = await Appointment.create({ date, LawServiceId: lawServiceId });
    return res.status(201).json({ appointment: newAppointment });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an existing appointment
exports.updateAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { name, date } = req.body;

  try {
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    await appointment.update({ name, date });
    return res.json({ message: 'Appointment updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    await appointment.destroy();
    return res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get appointments by user
exports.getAppointmentsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const appointments = await Appointment.findAll({ where: { userId } });
    return res.json({ appointments });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// todo add following functions: 1, delete 2. get all 3. get by user