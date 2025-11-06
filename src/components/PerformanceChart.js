import React from 'react';
import { Line } from 'react-chartjs-2';
function PerformanceChart({ data }) {
  if (!data.paymentHistory || data.paymentHistory.length === 0) {
    return <div style={{margin:'20px 0', color:'#888'}}>No performance data available yet.</div>;
  }
  const chartData = {
    labels: data.paymentHistory.map(p => new Date(p.date).toLocaleDateString()),
    datasets: [{
      label: 'Performance',
      data: data.paymentHistory.map(p => p.amount),
      borderColor: 'blue',
      fill: false
    }]
  };
  return <Line data={chartData} />;
}
export default PerformanceChart;
