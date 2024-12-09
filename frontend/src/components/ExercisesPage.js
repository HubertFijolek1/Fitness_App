import React, { useState } from 'react';
import ExerciseForm from './ExerciseForm';
import ExerciseList from './ExerciseList';
import ExerciseChart from './ExerciseChart';

function ExercisesPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdd = () => {
    setRefreshKey(refreshKey + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Exercises</h1>
      <ExerciseForm onAdd={handleAdd}/>
      <ExerciseList key={refreshKey}/>
        <ExerciseChart />

    </div>
  );
}

export default ExercisesPage;
