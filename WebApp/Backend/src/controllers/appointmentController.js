const prisma = require('../models/prismaClient');

// Get Appointments
const getAppointments = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid or missing userId' });
    }

    const appointments = await prisma.appointment.findMany({
      where: { userId: parseInt(userId) },
      include: { doctor: true }, // Ensure this matches your schema
    });

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};


// Create Appointment
const createAppointment = async (req, res) => {
  try {
    const { userId, doctorId, date, time } = req.body;

    if (!userId || !doctorId || !date || !time) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate user and doctor existence
    const userExists = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
    const doctorExists = await prisma.doctor.findUnique({ where: { id: parseInt(doctorId) } });

    if (!userExists || !doctorExists) {
      return res.status(400).json({ message: 'Invalid userId or doctorId' });
    }

    // Create the appointment
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
    console.error('Error creating appointment:', error.message, error.meta);
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
