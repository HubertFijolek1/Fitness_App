import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../api/api';
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

function WeeklyChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/exercises/list/?range=week')
      .then(res => {
        const labels = res.data.map(e => e.date);
        const durations = res.data.map(e => e.duration_minutes);
        setData({
          labels,
          datasets: [{ label: 'Past Week Duration', data: durations }]
        });
      })
      .catch(err => console.error(err));
  }, []);

  if(!data) return <div>Loading weekly chart...</div>;
  return <Bar data={data} />;
}

export default WeeklyChart;

function MonthlyChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/exercises/list/?range=month')
      .then(res => {
        const labels = res.data.map(e => e.date);
        const durations = res.data.map(e => e.duration_minutes);
        setData({ labels, datasets: [{ label: 'This Month', data: durations }] });
      })
      .catch(err => console.error(err));
  }, []);

  if(!data) return <div>Loading monthly chart...</div>;
  return <Bar data={data} />;
}

export default MonthlyChart;