import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const filterDataByDate = (attendanceData, filter) => {
  const filteredData = {};
  const currentDate = new Date();

  Object.keys(attendanceData).forEach((date) => {
    const attendanceDate = new Date(date);
    let isValidDate = false;

    if (filter === "last_week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(currentDate.getDate() - 7);
      isValidDate = attendanceDate >= oneWeekAgo;
    }

    if (filter === "last_month") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(currentDate.getMonth() - 1);
      isValidDate = attendanceDate >= oneMonthAgo;
    }

    if (filter === "this_year") {
      isValidDate = attendanceDate.getFullYear() === currentDate.getFullYear();
    }

    if (isValidDate) {
      filteredData[date] = attendanceData[date];
    }
  });

  return filteredData;
};

const StudentProfile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [attendanceSummary, setAttendanceSummary] = useState({
    totalDays: 0,
    presentDays: 0,
    absentDays: 0,
    percentage: 0,
  });
  const [timeFilter, setTimeFilter] = useState("last_week");

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost/api.php?action=read&table=students&id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setStudent(data[0]);
          if (data[0].attendance) {
            const attendance = JSON.parse(data[0].attendance);
            setAttendanceData(attendance);

            const filteredAttendance = filterDataByDate(attendance, timeFilter);
            let presentCount = 0;
            let absentCount = 0;
            Object.values(filteredAttendance).forEach((status) => {
              if (status === "present") presentCount++;
              if (status === "absent") absentCount++;
            });

            const totalDays = presentCount + absentCount;
            const percentage = totalDays
              ? ((presentCount / totalDays) * 100).toFixed(2)
              : 0;

            setAttendanceSummary({
              totalDays,
              presentDays: presentCount,
              absentDays: absentCount,
              percentage,
            });
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [id, timeFilter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin border-t-4 border-indigo-600 w-12 h-12 rounded-full"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500 font-bold text-xl">Student not found.</p>
      </div>
    );
  }

  const filteredAttendance = filterDataByDate(attendanceData, timeFilter);
  const attendanceLabels = Object.keys(filteredAttendance);
  const attendanceValues = attendanceLabels.map(
    (date) => (filteredAttendance[date] === "present" ? 1 : 0)
  );

  const chartData = {
    labels: attendanceLabels,
    datasets: [
      {
        label: "Attendance",
        data: attendanceValues,
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(75, 192, 192)",
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "rgb(75, 192, 192)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        min: 0, // Min value of Y-axis is 0
        max: 1, // Max value of Y-axis is 1
        ticks: {
          stepSize: 1, // Ticks will be at intervals of 1
          callback: function (value) {
            return value === 0 ? "Absent" : value === 1 ? "Present" : "";
          },
        },
      },
    },
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
        <div className="flex items-center justify-between bg-indigo-600 text-white p-6 rounded-t-lg">
          <h2 className="text-3xl font-semibold">Student Profile</h2>
        </div>

        <div className="flex flex-col md:flex-row p-6">
          {/* Profile Image */}
          <div className="flex-shrink-0 mb-6 md:mb-0 md:w-40">
            {student.profile_image ? (
              <img
                src={`http://localhost/${student.profile_image}`}
                alt={`${student.name}'s profile`}
                className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-110"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <span className="text-white text-xl">No Image</span>
              </div>
            )}
          </div>

          <div className="flex-grow">
            {/* Student Info */}
            <div className="mb-4">
              <strong className="text-lg">ID:</strong> <span>{student.id}</span>
            </div>
            <div className="mb-4">
              <strong className="text-lg">Name:</strong> <span>{student.name}</span>
            </div>
            <div className="mb-4">
              <strong className="text-lg">Class:</strong> <span>{student.class}</span>
            </div>
            <div className="mb-4">
              <strong className="text-lg">Roll:</strong> <span>{student.roll}</span>
            </div>

            {/* Attendance Summary */}
            <div className="mb-6 border-t pt-6">
              <h3 className="text-xl font-semibold">Attendance Summary</h3>
              <div className="space-y-2">
                <p><strong>Total Days:</strong> {attendanceSummary.totalDays}</p>
                <p><strong>Present:</strong> {attendanceSummary.presentDays}</p>
                <p><strong>Absent:</strong> {attendanceSummary.absentDays}</p>
                <p><strong>Attendance Percentage:</strong> {attendanceSummary.percentage}%</p>
              </div>
            </div>

            {/* Time Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Filter by Time:</h3>
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 rounded-md transition duration-200 ${timeFilter === "last_week" ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-indigo-500"}`}
                  onClick={() => setTimeFilter("last_week")}
                >
                  Last Week
                </button>
                <button
                  className={`px-4 py-2 rounded-md transition duration-200 ${timeFilter === "last_month" ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-indigo-500"}`}
                  onClick={() => setTimeFilter("last_month")}
                >
                  Last Month
                </button>
                <button
                  className={`px-4 py-2 rounded-md transition duration-200 ${timeFilter === "this_year" ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-indigo-500"}`}
                  onClick={() => setTimeFilter("this_year")}
                >
                  This Year
                </button>
              </div>
            </div>

            {/* Attendance Chart */}
            <div>
              <h3 className="text-lg font-semibold">Attendance Chart</h3>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
