import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const ActiveInactiveUsers = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/admin/users/active-status", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });

        setChartData({
          labels: ["Active Users", "Inactive Users"],
          datasets: [
            {
              data: [response.data.activeUsers, response.data.inactiveUsers],
              backgroundColor: ["#36A2EB", "#FF6384"],
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching active/inactive user data:", err);
        setError("Failed to load chart data. Please try again later.");
      }
    };
    fetchData();
  }, []);

  if (error) return <p>{error}</p>;
  return chartData ? <Pie data={chartData} /> : <p>Loading chart...</p>;
};

export default ActiveInactiveUsers;
