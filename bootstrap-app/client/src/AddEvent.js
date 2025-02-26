import React, { useState, useEffect } from 'react';

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    title: '',
    startDateTime: '',
    endDateTime: '',
    description: '',
    location: '',
  });

  const BACKEND_URL = "https://tutorconnect-1u9q.onrender.com"; 
  
  useEffect(() => {
    const checkAuth = async () => {
      const authResponse = await fetch(`${BACKEND_URL}/check-auth`);
      const authData = await authResponse.json();
  
      if (!authData.authenticated) {
        // Redirect to authentication
        window.location.href = `${BACKEND_URL}/auth`;
      }
    };
  
    checkAuth();
  }, []);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert local time to UTC before sending to backend
    const localStart = new Date(eventData.startDateTime);
    const localEnd = new Date(eventData.endDateTime);
  
    const eventToSend = {
      ...eventData,
      startDateTime: localStart.toISOString(), // Ensure UTC format
      endDateTime: localEnd.toISOString(),
    };
  
    try {
      const response = await fetch(`${BACKEND_URL}/add-event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventToSend),
      });
  
      const data = await response.json();
      alert(data.message || 'Event added successfully!');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to add event.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Tutor Session to Google Calendar</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Session Title:</label>
          <input type="text" name="title" className="form-control" value={eventData.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Start Date and Time:</label>
          <input type="datetime-local" name="startDateTime" className="form-control" value={eventData.startDateTime} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">End Date and Time:</label>
          <input type="datetime-local" name="endDateTime" className="form-control" value={eventData.endDateTime} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description (Optional):</label>
          <textarea name="description" className="form-control" value={eventData.description} onChange={handleChange}></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Location (Optional):</label>
          <input type="text" name="location" className="form-control" value={eventData.location} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
