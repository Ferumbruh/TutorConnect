import React, { useState } from 'react';

const TutorAvailability = () => {
  const [availability, setAvailability] = useState({
    name: '',
    subject: '',
    sunday_start: '',
    sunday_end: '',
    monday_start: '',
    monday_end: '',
    tuesday_start: '',
    tuesday_end: '',
    wednesday_start: '',
    wednesday_end: '',
    thursday_start: '',
    thursday_end: '',
    friday_start: '',
    friday_end: '',
    saturday_start: '',
    saturday_end: '',
  });

  const handleChange = (e) => {
    setAvailability({
      ...availability,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/submit-availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(availability),
      });

      if (response.ok) {
        alert('Availability submitted successfully!');
      } else {
        alert('Submission failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Submission failed.');
    }
  };

  const resetTimes = () => {
    setAvailability({
      ...availability,
      sunday_start: '',
      sunday_end: '',
      monday_start: '',
      monday_end: '',
      tuesday_start: '',
      tuesday_end: '',
      wednesday_start: '',
      wednesday_end: '',
      thursday_start: '',
      thursday_end: '',
      friday_start: '',
      friday_end: '',
      saturday_start: '',
      saturday_end: '',
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Enter Tutor Availability</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name:</label>
          <input type="text" className="form-control" name="name" value={availability.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Subject:</label>
          <input type="text" className="form-control" name="subject" value={availability.subject} onChange={handleChange} required />
        </div>

        <h3>Availability:</h3>
        {['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((day) => (
          <div className="mb-3" key={day}>
            <label className="form-label text-capitalize">{day}:</label>
            <input type="time" className="form-control d-inline w-auto" name={`${day}_start`} value={availability[`${day}_start`]} onChange={handleChange} />
            <span> to </span>
            <input type="time" className="form-control d-inline w-auto" name={`${day}_end`} value={availability[`${day}_end`]} onChange={handleChange} />
          </div>
        ))}

        <button type="submit" className="btn btn-primary me-2">Submit</button>
        <button type="button" className="btn btn-secondary" onClick={resetTimes}>Reset Times</button>
      </form>
    </div>
  );
};

export default TutorAvailability;
