import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate

const Departments = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { totalDepartments, departments } = location.state || {}; // Get departments and totalDepartments from state

  const [departmentsState, setDepartmentsState] = useState(
    Array.from({ length: totalDepartments }, (_, index) => ({
      name: departments ? departments[index].name : "",
      saved: false,
      showForm: false,
      departmentInfo: {}
    }))
  );

  const handleInputChange = (index, value) => {
    setDepartmentsState((prevDepartments) => {
      const updatedDepartments = [...prevDepartments];
      updatedDepartments[index].name = value;
      return updatedDepartments;
    });
  };

  const handleSave = (index) => {
    setDepartmentsState((prevDepartments) => {
      const updatedDepartments = [...prevDepartments];
      updatedDepartments[index].saved = true; // Mark this department as saved
      return updatedDepartments;
    });
  };

  const handleAddInfoClick = (index) => {
    // Navigate to DepartmentDetails page with the department index
    navigate(`/departments/${index}`, {
      state: { department: departmentsState[index] }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-12 px-6">
      <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-10">
        Add Departments
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {departmentsState.map((department, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Department {index + 1}
            </h3>

            {/* If the department is not saved yet, show the input field and Save button */}
            {!department.saved ? (
              <>
                <input
                  type="text"
                  value={department.name}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder={`Enter name for Department ${index + 1}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={() => handleSave(index)}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </>
            ) : (
              // Once saved, show the department name and the Add Info button
              <>
                <p className="text-lg font-medium text-gray-700 mb-4">
                  {department.name}
                </p>
                <button
                  onClick={() => handleAddInfoClick(index)} // Navigate to the department details page
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Add Info <span className="ml-2">+</span>
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
