import React, { useEffect, useState } from 'react';
import AppointmentCard from '../components/AppointmentCard';
import './Appointments.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Replace with actual user ID retrieval logic
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/appointments/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }

        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  const editAppointment = (id, updatedDetails) => {
    setAppointments(appointments.map((appointment) =>
      appointment.id === id ? { ...appointment, ...updatedDetails } : appointment
    ));
  };

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="appointments-page">
      <h1>Your Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="appointments-list">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onDelete={deleteAppointment}
              onEdit={editAppointment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
