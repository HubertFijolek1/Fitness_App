import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../api/api';

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
