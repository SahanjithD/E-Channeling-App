import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentCard from '../components/AppointmentCard';
import SignInOverlay from '../components/SignInOverlay';
import './Appointments.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignInOverlay, setShowSignInOverlay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      // User is not authenticated
      setShowSignInOverlay(true);
      setLoading(false);
      return;
    }

    setIsAuthenticated(true);

    const fetchAppointments = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Replace with actual user ID retrieval logic
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/appointments/${userId}`, {
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

  const deleteAppointment = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/appointments/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }
  
      // Remove the appointment from the local state
      setAppointments(appointments.filter((appointment) => appointment.id !== id));
    } catch (err) {
      console.error('Error deleting appointment:', err);
      setError(err.message);
    }
  };
  
  const editAppointment = async (id, updatedDetails) => {
    if (!isAuthenticated) {
      setShowSignInOverlay(true);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedDetails),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update appointment');
      }
  
      const updatedAppointment = await response.json();
  
      // Preserve the doctor field in the frontend
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === id
            ? {
                ...appointment, // Preserve existing fields, including doctor
                ...updatedAppointment, // Override updated fields
              }
            : appointment
        )
      );
    } catch (err) {
      console.error('Error updating appointment:', err);
      setError(err.message);
    }
  };

  const handleCloseSignIn = () => {
    // Navigate to sign-in page
    navigate('/signin');
  };

  if (showSignInOverlay) {
    return <SignInOverlay onClose={handleCloseSignIn} />;
  }
  


  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="appointments-page">
      <h1 >Your Appointments</h1>
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


