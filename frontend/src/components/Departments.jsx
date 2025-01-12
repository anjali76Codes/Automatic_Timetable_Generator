import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Departments = () => {
  const navigate = useNavigate();
  const { collegeCode } = useParams();  // Get collegeCode from URL
  const [collegeDetails, setCollegeDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching college details using the collegeCode from the URL
    const fetchCollegeDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/timetable/college/${collegeCode}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in header
            },
          }
        );
        const result = await response.json();

        if (response.ok) {
          setCollegeDetails(result.message); // Assuming message contains the college details
        } else {
          setError(result.message || "An error occurred");
        }
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    fetchCollegeDetails();
  }, [collegeCode]);

  // Handle case where no departments or college data is available
  const totalDepartments = collegeDetails.totalDepartments || 0;
  const departments = collegeDetails.departments || [];

  const handleAddInfoClick = (index) => {
    navigate(`/departments/${collegeCode}/${index}`, {
      state: { department: departments[index] }, // Pass department info to the next page
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* College Info Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-10">
          <h2 className="text-3xl font-extrabold text-blue-600 text-center mb-6">
            {collegeDetails.collegeName} - {collegeDetails.collegeCode}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-gray-700">Address</h4>
              <p>{collegeDetails.collegeAddress}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-gray-700">Principal</h4>
              <p>{collegeDetails.collegePrincipal}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-gray-700">Total Classes</h4>
              <p>{collegeDetails.totalClasses}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-gray-700">Total Labs</h4>
              <p>{collegeDetails.totalLabs}</p>
            </div>
          </div>
        </div>

        {/* Departments Section */}
        <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-10">
          Departments
        </h2>
        {error && (
          <div className="text-red-600 text-center mb-4">{error}</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {Array.from({ length: totalDepartments }, (_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Department {index + 1} {/* Displaying Department 1, 2, 3, etc. */}
              </h3>
              <button
                onClick={() => handleAddInfoClick(index)} // Navigate to the department details page
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
              >
                Add Info <span className="ml-2">+</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Departments;
