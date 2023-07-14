const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
const AppointmentController = require('../controllers/Apointment');

// Create a new appointment
router.post('/', jwtAuth, AppointmentController.createAppointment);

// Update an existing appointment
router.put('/:id', jwtAuth, AppointmentController.updateAppointment);

// Get appointment by ID
router.get('/:id', jwtAuth, AppointmentController.getAppointment);

// Get all appointments
router.get('/', AppointmentController.getAppointments);

// Delete appointment by ID
router.delete('/:id', jwtAuth, AppointmentController.deleteAppointment);

module.exports = router;

