import React, { useState } from 'react';
import AppointmentCard from '../components/AppointmentCard';
import './Appointments.css';

const Appointments = () => {
  // Mock data for testing
  const [appointments, setAppointments] = useState([
    { id: 1, doctor: 'Dr. John Doe', date: '2025-01-05', time: '10:00 AM', status: 'Scheduled' },
    { id: 2, doctor: 'Dr. Jane Smith', date: '2025-01-06', time: '2:00 PM', status: 'Pending' },
    { id: 3, doctor: 'Dr. Alan Brown', date: '2025-01-07', time: '9:30 AM', status: 'Completed' },
    { id: 4, doctor: 'Dr. Emily Davis', date: '2025-01-08', time: '11:00 AM', status: 'Pending' },
  ]);

  // Mock delete function
  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  // Mock edit function
  const editAppointment = (id, updatedDetails) => {
    setAppointments(appointments.map(appointment =>
      appointment.id === id ? { ...appointment, ...updatedDetails } : appointment
    ));
  };

  // Sort appointments by status
  const sortedAppointments = appointments.sort((a, b) => {
    const statusOrder = { Scheduled: 1, Pending: 2, Completed: 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div className="appointments-page">
      <h1>Your Appointments</h1>
      <div className="appointments-list">
        {sortedAppointments.map(appointment => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onDelete={deleteAppointment}
            onEdit={editAppointment}
          />
        ))}
      </div>
    </div>
  );
};

export default Appointments;



// const express = require('express');
// const app = express();
// const port = 5000;

// let appointments = [
//   { id: 1, doctor: 'Dr. John Doe', date: '2025-01-05', time: '10:00 AM', status: 'Scheduled' },
//   { id: 2, doctor: 'Dr. Jane Smith', date: '2025-01-06', time: '2:00 PM', status: 'Pending' },
//   { id: 3, doctor: 'Dr. Alan Brown', date: '2025-01-07', time: '9:30 AM', status: 'Pending' },
// ];

// // Middleware
// app.use(express.json());

// // Fetch all appointments
// app.get('/api/appointments', (req, res) => {
//   res.json(appointments);
// });

// // Update a pending appointment
// app.put('/api/appointments/:id', (req, res) => {
//   const { id } = req.params;
//   const { date, time } = req.body;
//   const appointment = appointments.find(app => app.id === parseInt(id));

//   if (appointment && appointment.status === 'Pending') {
//     appointment.date = date;
//     appointment.time = time;
//     res.json(appointment);
//   } else {
//     res.status(400).json({ message: 'Appointment not found or not pending' });
//   }
// });

// // Delete a pending appointment
// app.delete('/api/appointments/:id', (req, res) => {
//   const { id } = req.params;
//   const appointmentIndex = appointments.findIndex(app => app.id === parseInt(id));

//   if (appointmentIndex !== -1 && appointments[appointmentIndex].status === 'Pending') {
//     appointments.splice(appointmentIndex, 1);
//     res.json({ message: 'Appointment deleted successfully' });
//   } else {
//     res.status(400).json({ message: 'Appointment not found or not pending' });
//   }
// });

// app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
