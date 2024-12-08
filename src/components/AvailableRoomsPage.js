import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Updated to use useNavigate
import axios from 'axios';

function AvailableRooms() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { rooms } = location.state || { rooms: [] };
  

  const handleBookRoom = async (roomId, date, startTime, endTime) => {
    try {
      const response = await axios.post('/rooms/book', {
        roomId,
        date,
        startTime,
        endTime,
      });
      alert('Room booked successfully');
      navigate('/'); // Redirect to the main form page
    } catch (error) {
      alert('Error booking the room');
      console.error(error);
    }
  };

  // Cancel button handler
  const handleCancel = () => {
    navigate('/'); // Navigate back to the meeting room form page
  };

  return (
    <div>
      <h2>Available Rooms</h2>
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <div key={room._id} className="room-item">
            <h3>{room.type} - Capacity: {room.capacity}</h3>
            <button onClick={() => handleBookRoom(room._id, '2024-12-12', '09:00', '10:00')}>
              Book this room
            </button>
          </div>
        ))
      ) : (
        <p>No rooms available at this time.</p>
      )}
      
      <button onClick={handleCancel}>Cancel</button> {/* Cancel button to go back */}
    </div>
  );
}

export default AvailableRooms;
