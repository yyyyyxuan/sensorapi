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
            borderColor: 'rgb(75, 160, 255)',
          },
        ],
      };
      const options = {
        scales: {
          y: {
            suggestedMin: Math.min(...props.data), // Adjust as needed
            suggestedMax: Math.max(...props.data),
            beginAtZero: false,
            ticks: {
              maxTicksLimit: props.maxTicksLimit,
              callback: function (value, index, values) {
                return value.toFixed(props.dp) + props.unit; 
              },
            },
          },
          x: {
            ticks: {
              maxTicksLimit: 5 // Adjust the number of desired intermediate ticks

            },
          },
        },
      };
    return (
        <div>
            <Line data={chartData} options={options}/>
        </div>

    );

}