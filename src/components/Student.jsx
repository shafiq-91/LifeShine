import React, { useState } from "react";

const students = [
  { id: 1, name: "John Doe", className: "10", roll: "23" },
  { id: 2, name: "Jane Smith", className: "12", roll: "56" },
  { id: 3, name: "Sam Wilson", className: "11", roll: "89" },
  { id: 4, name: "Chris Brown", className: "10", roll: "12" },
  { id: 4, name: "Chris Brown", className: "10", roll: "12" },
  { id: 4, name: "Chris Brown", className: "10", roll: "12" },
  { id: 4, name: "Chris Brown", className: "10", roll: "12" },
];

const Student = () => {
  const [loading, setLoading] = useState(false); // Simulating loading state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

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
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`transition-all duration-300 ease-in-out border-t rounded border-gray-100 hover:bg-slate-500 hover:cursor-pointer}`}
                  >
                    <td className="py-4 px-6">{student.id}</td>
                    <td className="py-4 px-6">{student.name}</td>
                    <td className="py-4 px-6">{student.className}</td>
                    <td className="py-4 px-6">{student.roll}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 px-6 text-center">
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
