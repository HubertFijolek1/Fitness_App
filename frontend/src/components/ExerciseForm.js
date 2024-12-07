import React, { useState } from 'react';
import api from '../api/api';

function ExerciseForm({ onAdd }) {
  const [formData, setFormData] = useState({
    exercise_type: '',
    duration_minutes: '',
    sets: '',
    reps: '',
    date: ''
  });

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/exercises/', formData)
      .then(response => {
        onAdd(response.data);
        setFormData({
          exercise_type: '',
          duration_minutes: '',
          sets: '',
          reps: '',
          date: ''
        });
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <div>
        <label>Type:</label>
        <input name="exercise_type" value={formData.exercise_type} onChange={handleChange} className="border w-full p-2" required/>
      </div>
      <div>
        <label>Duration (min):</label>
        <input type="number" name="duration_minutes" value={formData.duration_minutes} onChange={handleChange} className="border w-full p-2" required/>
      </div>
      <div>
        <label>Sets:</label>
        <input type="number" name="sets" value={formData.sets} onChange={handleChange} className="border w-full p-2" required/>
      </div>
      <div>
        <label>Reps:</label>
        <input type="number" name="reps" value={formData.reps} onChange={handleChange} className="border w-full p-2"/>
      </div>
      <div>
        <label>Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="border w-full p-2" required/>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Exercise</button>
    </form>
  );
}

export default ExerciseForm;
