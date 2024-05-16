
// components/BarChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { serverDomain } from '@/util/server';
import axios from 'axios';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


function useGetStats() {

  const [stats, setStats] = useState<null | any[]>(null);


  useEffect(() => {
    const fetchStats = async () => {
      const { data: a } = await axios({ method: "GET", url: serverDomain + "report/stats", params: { action: "getProductCount" } });
      const { data: b } = await axios({ method: "GET", url: serverDomain + "report/stats", params: { action: "getSellerCount" } });
      const { data: c } = await axios({ method: "GET", url: serverDomain + "report/stats", params: { action: "getBuyerCount" } });
      const { data: d } = await axios({ method: "GET", url: serverDomain + "report/stats", params: { action: "getPaymentCount" } });
      const { data: e } = await axios({ method: "GET", url: serverDomain + "report/stats", params: { action: "getReviewCount" } });

      setStats([a.data.count, b.data.count, c.data.count, d.data.count, e.data.count]);

    }
    fetchStats();

  }, [])


  return stats;
}

const BarChart = () => {
  // Data for the chart
  const stats = useGetStats();
  const data = {
    labels: ['Product', 'Seller', 'Buyer', 'Payment', 'Review'],
    datasets: [
      {
        label: 'Count',
        data: stats,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Application Stats',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
