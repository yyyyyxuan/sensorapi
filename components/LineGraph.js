"use client"
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(...registerables);

const LineGraph = (props) => {
  useEffect(() => {
    import('chartjs-plugin-zoom').then((ZoomPlugin) => {
      ChartJS.register(ZoomPlugin.default);
    });
  }, []);

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
        suggestedMin: Math.min(...props.data),
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
          maxTicksLimit: 5,
        },
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
            sensitivity:0.1,
          },
          mode: 'xy',
        },
      },
    },


  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineGraph;
