import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';



const LineGraph = (props:any) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    import('chartjs-plugin-zoom').then((ZoomPlugin) => {
      Chart.register(ZoomPlugin.default);
    });
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance.current) {
        // Destroy existing chart instance
        chartInstance.current.destroy();
      }

      const data = {
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
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            suggestedMin: Math.min(...props.data),
            suggestedMax: Math.max(...props.data),
            ticks: {
              maxTicksLimit: props.maxTicksLimit,
              callback: function (value: number) {
                return value.toFixed(props.dp) + props.unit;
              },
            },
          },
          x: {
            ticks: {
              maxTicksLimit: window.innerWidth < 700 ? 3 : 5,
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
                sensitivity: 0.05,
              },
              mode: 'xy',
            },
          },
        },
      } as any;

      chartInstance.current = new Chart(ctx as CanvasRenderingContext2D, {
        type: 'line',
        data: data,
        options: options,
      });
    }
  });

  return <canvas ref={chartRef} />;
};

export default LineGraph;
