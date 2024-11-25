import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importing Link for routing
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Importing Material UI Icon

const Student = () => {
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [students, setStudents] = useState([]); // State to store students data
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Fetch students data from the API
  useEffect(() => {
    fetch("http://localhost/api.php?action=read&table=students")
      .then((response) => response.json()) // Assuming the API returns JSON
      .then((data) => {
        setStudents(data); // Set the students data to state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Filter students based on ID or Name
  const filteredStudents = students.filter(
    (student) =>
      student.id.toString().includes(searchQuery) || 
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by ID or Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-aut shadow-lg rounded-lg border border-gray-200">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin border-t-4 border-blue-500 w-12 h-12 rounded-full"></div>
          </div>
        ) : (
          <table className="min-w-full table-auto text-sm">
            <thead className="text-xs uppercase font-medium border-b border-white">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Class</th>
                <th className="py-3 px-6 text-left">Roll</th>
                <th className="py-3 px-6 text-left">Action</th> {/* New column for action */}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="transition-all duration-300 ease-in-out border-t rounded border-gray-100 hover:bg-slate-500 hover:cursor-pointer"
                  >
                    <td className="py-4 px-6">{student.id}</td>
                    <td className="py-4 px-6">{student.name}</td>
                    <td className="py-4 px-6">{student.class}</td> {/* Adjusted class field */}
                    <td className="py-4 px-6">{student.roll}</td>
                    <td className="py-4 px-6">
                      {/* Link to view profile page with Material UI Icon */}
                      <Link
                        to={`/studentProfile/${student.id}`}
                        className="text-blue-500 hover:text-blue-700 flex items-center space-x-2"
                      >
                        <AccountCircleIcon /> {/* Material UI Icon */}
                        <span>View Profile</span>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 px-6 text-center">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Student;
