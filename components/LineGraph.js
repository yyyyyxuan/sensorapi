"use client";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(...registerables);

export default function LineGraph(props) {
    const chartData = {
        labels: props.time,
        datasets: [
          {
            label: props.label,
            data: props.data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
          },
        ],
      };
    return (
        <div>
            <Line data={chartData} />
        </div>

    );

}