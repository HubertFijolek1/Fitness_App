import React, { useEffect, useState } from 'react';
import api from '../api/api';

function ExerciseList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    api.get('/exercises/list/')
      .then(res => setExercises(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Logged Exercises</h2>
      <ul className="space-y-2">
        {exercises.map(ex => (
          <li key={ex.id} className="border p-2 bg-white rounded shadow">
            <div>{ex.date} - {ex.exercise_type}</div>
            <div>Duration: {ex.duration_minutes} min, Sets: {ex.sets}, Reps: {ex.reps}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExerciseList;
