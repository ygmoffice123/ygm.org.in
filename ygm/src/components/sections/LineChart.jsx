import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { employeesData } from "../../data/lineChartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {

  const data = {
    labels: employeesData.map((item) => item.year),
    datasets: [
      {
        label: "Number of Employees",
        data: employeesData.map((item) => item.employees),
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "rgba(255, 206, 86, 1)",
        pointBorderColor: "#000",
        pointHoverBackgroundColor: "#000",
        pointHoverBorderColor: "rgba(255, 206, 86, 1)",
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHitRadius: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important for custom height
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    plugins: {
      legend: { labels: { color: "#fff" } },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffce56",
        bodyColor: "#fff",
        borderColor: "#ffce56",
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  return (
    <div className="bg-black p-5 md:p-10 rounded-lg  h-[80vh] " >
                  <h1 className="process-title text-4xl md:text-5xl font-extrabold text-center mb-10 text-[#FFD700] drop-shadow-sm"> {/* title color updated */}
           Employee Growth Over Years
      </h1>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
