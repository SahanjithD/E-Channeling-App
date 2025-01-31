const express = require('express');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*", // Allow requests from your frontend
  // methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  // credentials: true // Allow credentials like cookies or authorization headers
})); 

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
