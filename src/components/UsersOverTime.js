import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const UsersOverTime = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/admin/users/over-time", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });

        const labels = response.data.map((item) => item._id); // Assuming `_id` is a time representation
        const data = response.data.map((item) => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Users Over Time",
              data,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              fill: true,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching users over time data:", err);
        setError("Failed to load chart data. Please try again later.");
      }
    };
    fetchData();
  }, []);

  if (error) return <p>{error}</p>;
  return chartData ? <Line data={chartData} /> : <p>Loading chart...</p>;
};

export default UsersOverTime;
