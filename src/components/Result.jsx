import React, { useState } from "react";

const results = [
  { id: 1, name: "John Doe", letterGrade: "4.00", className: "10th Grade" },
  { id: 2, name: "Jane Smith", letterGrade: "5.00", className: "12th Grade" },
  { id: 3, name: "Sam Wilson", letterGrade: "4.12", className: "11th Grade" },
  { id: 4, name: "Chris Brown", letterGrade: "2.51", className: "10th Grade" },
];

function Result() {
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Filter results based on ID, Name, or Class
  const filteredResults = results.filter(
    (result) =>
      result.id.toString().includes(searchQuery) ||
      result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-4">Result Page</h1>
      <p className="mb-4">This is the result page.</p>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by ID, Name, or Class..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      <div className="overflow-x-auto   shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full table-auto text-sm">
          <thead className=" border-b border-gray-50  text-xs uppercase font-medium">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Class</th>
              <th className="py-3 px-6 text-left">Grade</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.length > 0 ? (
              filteredResults.map((result, index) => (
                <tr
                  key={result.id}
                  className={`transition-all duration-300 ease-in-out  border-b`}
                >
                  <td className="py-4 px-6">{result.id}</td>
                  <td className="py-4 px-6">{result.name}</td>
                  <td className="py-4 px-6">{result.className}</td>
                  <td className="py-4 px-6">{result.letterGrade}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 px-6 text-cente">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Result;
