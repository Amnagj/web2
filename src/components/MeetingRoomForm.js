import React, { useState } from 'react';
import './MeetingRoomForm.css';

function MeetingRoomForm() {
  const [peopleCount, setPeopleCount] = useState(3); // État pour le compteur
  const [selectedDate, setSelectedDate] = useState(''); // État pour la date
  const [startTime, setStartTime] = useState('09:00'); // État pour l'heure de début
  const [endTime, setEndTime] = useState('10:00'); // État pour l'heure de fin

  // Gestion du compteur
  const incrementPeople = () => {
    setPeopleCount((prev) => prev + 1);
  };

  const decrementPeople = () => {
    if (peopleCount > 1) {
      setPeopleCount((prev) => prev - 1);
    }
  };

  // Gestion des limites de l'heure
  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);

    // Ajuster l'heure de fin si elle est inférieure à l'heure de début
    if (newStartTime > endTime) {
      setEndTime(newStartTime);
    }
  };

  const handleEndTimeChange = (e) => {
    const newEndTime = e.target.value;

    // Assurez-vous que l'heure de fin reste après l'heure de début
    if (newEndTime >= startTime) {
      setEndTime(newEndTime);
    }
  };

  return (
    <div className="booking-form">
      <h2>Book a meeting room</h2>
      <p>Get the space you need to impress clients, hold memorable workshops, or deliver a winning pitch.</p>

      <input
        type="text"
        placeholder="Enter a city, area or location name"
        className="location-input"
      />

      <div className="form-group">
        <label>Type of workspace*</label>
        <select className="select-input">
          <option>Meeting room</option>
          <option>Private office</option>
          <option>Coworking space</option>
        </select>
      </div>

      <div className="form-group">
        <label>Number of people*</label>
        <div className="people-count">
          <button type="button" onClick={decrementPeople} disabled={peopleCount <= 1}>
            -
          </button>
          <span>{peopleCount}</span>
          <button type="button" onClick={incrementPeople}>+</button>
        </div>
      </div>

      <div className="form-group">
        <label>Date*</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="date-input"
        />
      </div>

      <div className="form-group">
        <label>Start and end time*</label>
        <div className="time-slots">
          <div className="time-slot">
            <label>Start Time:</label>
            <input
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
              min="09:00"
              max="12:00"
              className="time-input"
            />
          </div>
          <div className="time-slot">
            <label>End Time:</label>
            <input
              type="time"
              value={endTime}
              onChange={handleEndTimeChange}
              min="09:00"
              max="12:00"
              className="time-input"
            />
          </div>
        </div>
      </div>

      <button className="search-button" onClick={() => alert('Search button clicked!')}>
        Search
      </button>
    </div>
  );
}

export default MeetingRoomForm;
