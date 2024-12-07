import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../api/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ExerciseChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/exercises/list/')
      .then(res => {
        const sorted = res.data.sort((a,b) => new Date(a.date)-new Date(b.date));
        const labels = sorted.map(e => e.date);
        const durations = sorted.map(e => e.duration_minutes);
        setData({
          labels,
          datasets: [
            {
              label: 'Duration (min)',
              data: durations,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              fill: false
            }
          ]
        });
      })
      .catch(err => console.error(err));
  }, []);

  if(!data) return <div>Loading chart...</div>;

  return <Line data={data} />;
}

export default ExerciseChart;
