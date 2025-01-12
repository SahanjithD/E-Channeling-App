const express = require('express');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);

module.exports = app;




// const express = require('express');
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const app = express();
// app.use(express.json());

// // Example Route: Fetch All Doctors
// app.get('/doctors', async (req, res) => {
//   const doctors = await prisma.doctor.findMany();
//   res.json(doctors);
// });

// // Example Route: Fetch Appointments for a User
// app.get('/appointments/:userId', async (req, res) => {
//   const { userId } = req.params;
//   const appointments = await prisma.appointment.findMany({
//     where: { userId: parseInt(userId) },
//     include: { doctor: true },
//   });
//   res.json(appointments);
// });

// // Server
// app.listen(5000, () => console.log('Server is running on http://localhost:5000'));
