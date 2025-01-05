import React, { useState } from 'react';
import './AppointmentCard.css';

const AppointmentCard = ({ appointment, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editDetails, setEditDetails] = useState({
    date: appointment.date,
    time: appointment.time,
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    onEdit(appointment.id, editDetails);
    setIsEditing(false);
  };

  return (
    <div className="appointment-card">
      <div className="appointment-header">
        <h3>{appointment.doctor}</h3>
        <span className={`status ${appointment.status.toLowerCase()}`}>
          {appointment.status}
        </span>
      </div>

      {isEditing ? (
        <div className="appointment-edit">
          <label>
            Date: <input name="date" value={editDetails.date} onChange={handleEditChange} />
          </label>
          <label>
            Time: <input name="time" value={editDetails.time} onChange={handleEditChange} />
          </label>
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="appointment-details">
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
        </div>
      )}

      {appointment.status === 'Pending' && !isEditing && (
        <div className="appointment-actions">
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(appointment.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
