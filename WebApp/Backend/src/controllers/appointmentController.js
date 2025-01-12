const prisma = require('../models/prismaClient');

// Get Appointments for a User
const getAppointments = async (req, res) => {
  try {
    const { userId } = req.params;
    const appointments = await prisma.appointment.findMany({
      where: { userId: parseInt(userId) },
      include: { doctor: true },
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

// Create Appointment
const createAppointment = async (req, res) => {
  try {
    const { userId, doctorId, date, time } = req.body;

    const newAppointment = await prisma.appointment.create({
      data: {
        userId: parseInt(userId),
        doctorId: parseInt(doctorId),
        date,
        time,
      },
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment', error });
  }
};

// Delete Appointment
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.appointment.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error });
  }
};

module.exports = { getAppointments, createAppointment, deleteAppointment };
