import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const filterAttendanceData = (attendanceData, filter) => {
  const filteredData = {};
  const currentDate = new Date();

  Object.keys(attendanceData).forEach((date) => {
    const attendanceDate = new Date(date);
    let isValidDate = false;

    // Filter for "This Week"
    if (filter === "this_week") {
      const startOfWeek = new Date();
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Sunday of this week
      isValidDate = attendanceDate >= startOfWeek && attendanceDate <= currentDate;
    }

    // Filter for "This Month"
    if (filter === "this_month") {
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // First day of current month
      isValidDate = attendanceDate >= startOfMonth && attendanceDate <= currentDate;
    }

    // Filter for "This Year"
    if (filter === "this_year") {
      const startOfYear = new Date(currentDate.getFullYear(), 0, 1); // First day of current year
      isValidDate = attendanceDate >= startOfYear && attendanceDate <= currentDate;
    }

    if (isValidDate) {
      filteredData[date] = attendanceData[date];
    }
  });

  return filteredData;
};

// Function to calculate letter grade and grade point
const getGradeAndGradePoint = (marks) => {
  let grade = '';
  let gradePoint = 0;

  if (marks >= 80) {
    grade = 'A+';
    gradePoint = 5.00;
  } else if (marks >= 79) {
    grade = 'A';
    gradePoint = 4.00;
  } else if (marks >= 69) {
    grade = 'A-';
    gradePoint = 3.5;
  } else if (marks >= 59) {
    grade = 'B';
    gradePoint = 3.00;
  } else if (marks >= 49) {
    grade = 'C';
    gradePoint = 2.00;
  } else if (marks >= 39) {
    grade = 'D';
    gradePoint = 1.0;
  } else {
    grade = 'F';
    gradePoint = 0.0;
  }

  return { grade, gradePoint };
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
  const [attendanceFilter, setAttendanceFilter] = useState("this_week"); // Default filter is "This Week"
  const [view, setView] = useState("attendance"); // Default view is "attendance"
  const [examResults, setExamResults] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);

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

            const filteredAttendance = filterAttendanceData(attendance, attendanceFilter);
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

          if (data[0].exam_results) {
            const results = JSON.parse(data[0].exam_results);
            setExamResults(results);
            setSelectedExam(Object.keys(results)[0]); // Set the first exam as default
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching student data:", err);
        setLoading(false);
      });
  }, [id, attendanceFilter]);

  const handleAttendanceFilterChange = (event) => {
    setAttendanceFilter(event.target.value);
  };

  const handleViewChange = (viewOption) => {
    setView(viewOption);
  };

  const handleExamChange = (event) => {
    setSelectedExam(event.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center py-4">
        <p className="font-bold text-xl">Student not found.</p>
      </div>
    );
  }

  const filteredAttendance = filterAttendanceData(attendanceData, attendanceFilter);
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
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return value === 0 ? "Absent" : value === 1 ? "Present" : "";
          },
          color: "#666",
        },
      },
      x: {
        ticks: {
          color: "#666",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#666",
        },
      },
    },
  };

  const renderExamResults = () => {
    if (!examResults || !selectedExam) return null;
  
    const examData = examResults[selectedExam];
    
    // Check if any subject has Grade Point 0.00 or grade 'F'
    const hasFailedSubject = examData.subjects.some(subject => {
      const { gradePoint } = getGradeAndGradePoint(subject.marks);
      return gradePoint === 0.00 || subject.grade === 'F';
    });
  
    // Calculate the average grade point only if no subject is failed
    const averageGradePoint = hasFailedSubject
      ? 0.00
      : (
          examData.subjects.reduce((acc, subject) => acc + getGradeAndGradePoint(subject.marks).gradePoint, 0) /
          examData.subjects.length
        ).toFixed(2);
  
    return (
      <div className="mt-8">
        {/* Exam Title with Modern Style */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Exam Results - <span className="text-blue-500">{selectedExam}</span>
        </h2>
  
        {/* Table Container with Backdrop Blur & Card Effect */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg backdrop-blur-lg transition-transform duration-300 hover:scale-105 p-6">
          <table className="min-w-full table-auto text-sm">
            {/* Table Header */}
            <thead className="bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 text-white">
              <tr>
                <th className="py-4 px-6 text-left">Subject</th>
                <th className="py-4 px-6 text-left">Marks</th>
                <th className="py-4 px-6 text-left">Grade</th>
                <th className="py-4 px-6 text-left">Grade Point</th>
              </tr>
            </thead>
  
            {/* Table Body */}
            <tbody>
              {examData.subjects.map((subject, index) => {
                const { grade, gradePoint } = getGradeAndGradePoint(subject.marks);
                return (
                  <tr
                    key={index}
                    className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-300 group"
                  >
                    {/* Subject Name */}
                    <td className="py-4 px-6 text-gray-800 font-semibold group-hover:text-blue-500">
                      {subject.name}
                    </td>
  
                    {/* Marks */}
                    <td className="py-4 px-6 text-gray-600">{subject.marks}</td>
  
                    {/* Grade */}
                    <td
                      className={`py-4 px-6 font-medium ${
                        grade === "A+" ? "text-green-600" :
                        grade === "F" ? "text-red-600" : "text-yellow-600"
                      } group-hover:text-gray-800`}
                    >
                      {grade}
                    </td>
  
                    {/* Grade Point */}
                    <td className="py-4 px-6 text-gray-600">{gradePoint}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
  
        {/* Summary Section with Polished Design */}
        <div className="mt-6 bg-gradient-to-r from-purple-400 to-blue-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg">Summary</h3>
          <p>Total Subjects: {examData.subjects.length}</p>
          <p className="font-semibold">
            Average Grade Point: {averageGradePoint}
          </p>
        </div>
      </div>
    );
  };
  

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Profile Header */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex items-center">
        <img
          src={`${student.profile_image}`}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover shadow-xl"
        />
        <div className="ml-6">
          <h1 className="text-3xl font-semibold text-gray-800">{student.name}</h1>
          <p className="text-gray-600">Class: {student.class}</p>
          <p className="text-gray-600">Roll No: {student.roll}</p>
          <p className="text-gray-600">Section: {student.section} </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleViewChange("attendance")}
          className={`${view === "attendance" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"
            } px-4 py-2 text-lg font-semibold`}
        >
          Attendance
        </button>
        <button
          onClick={() => handleViewChange("exam")}
          className={`${view === "exam" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"
            } px-4 py-2 text-lg font-semibold`}
        >
          Exam Results
        </button>
      </div>

      {/* Attendance View */}
      {view === "attendance" && (
        <>
          <div className="flex justify-end mb-4">
            <select
              value={attendanceFilter}
              onChange={handleAttendanceFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
              <option value="this_year">This Year</option>
            </select>
          </div>

          <div className="flex justify-center mb-8 space-x-8 flex-wrap">
            {/* Total Days Card - Skeleton */}
            <div className={`w-full sm:max-w-xs bg-white p-6 rounded-lg shadow-xl backdrop-blur-lg transition-all duration-300 hover:scale-105 space-y-4 ${loading ? 'animate-pulse' : ''}`}>
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <i className="bx bx-calendar-alt text-2xl mr-2"></i> Total Days
              </h3>
              <div className={`text-3xl font-bold text-gray-700 ${loading ? 'bg-gray-300 w-3/4 h-8 rounded-md' : ''}`}>
                {loading ? '' : attendanceSummary.totalDays}
              </div>
            </div>

            {/* Present Days Card - Skeleton */}
            <div className={`w-full sm:max-w-xs bg-white p-6 rounded-lg shadow-xl backdrop-blur-lg transition-all duration-300 hover:scale-105 space-y-4 ${loading ? 'animate-pulse' : ''}`}>
              <h3 className="text-xl font-semibold text-green-600 flex items-center">
                <i className="bx bx-check-circle text-2xl mr-2"></i> Present
              </h3>
              <div className={`text-3xl font-bold text-gray-700 ${loading ? 'bg-gray-300 w-3/4 h-8 rounded-md' : ''}`}>
                {loading ? '' : attendanceSummary.presentDays}
              </div>
            </div>

            {/* Absent Days Card - Skeleton */}
            <div className={`w-full sm:max-w-xs bg-white p-6 rounded-lg shadow-xl backdrop-blur-lg transition-all duration-300 hover:scale-105 space-y-4 ${loading ? 'animate-pulse' : ''}`}>
              <h3 className="text-xl font-semibold text-red-600 flex items-center">
                <i className="bx bx-x-circle text-2xl mr-2"></i> Absent
              </h3>
              <div className={`text-3xl font-bold text-gray-700 ${loading ? 'bg-gray-300 w-3/4 h-8 rounded-md' : ''}`}>
                {loading ? '' : attendanceSummary.absentDays}
              </div>
            </div>

            {/* Percentage Card - Skeleton */}
            <div className={`w-full sm:max-w-xs bg-white p-6 rounded-lg shadow-xl backdrop-blur-lg transition-all duration-300 hover:scale-105 space-y-4 ${loading ? 'animate-pulse' : ''}`}>
              <h3 className="text-xl font-semibold text-blue-600 flex items-center">
                <i className="bx bx-percent text-2xl mr-2"></i> Percentage
              </h3>
              <div className={`text-3xl font-bold text-gray-700 ${loading ? 'bg-gray-300 w-3/4 h-8 rounded-md' : ''}`}>
                {loading ? '' : `${attendanceSummary.percentage}%`}
              </div>
            </div>
          </div>

          <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </div>
        </>
      )}

      {/* Exam View */}
      {view === "exam" && (
        <>
          {/* Exam Selection Dropdown */}
          <div className="mb-6">
            <select
              value={selectedExam}
              onChange={handleExamChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              {Object.keys(examResults).map((examName) => (
                <option key={examName} value={examName}>
                  {examName}
                </option>
              ))}
            </select>
          </div>

          {renderExamResults()}
        </>
      )}
    </div>
  );
};

export default StudentProfile;
