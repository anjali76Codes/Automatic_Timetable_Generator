import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Departments = () => {
  const location = useLocation();
  const { totalDepartments } = location.state; // Get total departments from navigation state

  const [departments, setDepartments] = useState(
    Array.from({ length: totalDepartments }, () => ({
      name: "",
      saved: false,
      showForm: false,
      departmentInfo: {}
    }))
  );

  const handleInputChange = (index, value) => {
    setDepartments((prevDepartments) => {
      const updatedDepartments = [...prevDepartments];
      updatedDepartments[index].name = value;
      return updatedDepartments;
    });
  };

  const handleSave = (index) => {
    setDepartments((prevDepartments) => {
      const updatedDepartments = [...prevDepartments];
      updatedDepartments[index].saved = true; // Mark this department as saved
      return updatedDepartments;
    });
  };

  const handleAddInfoClick = (index) => {
    setDepartments((prevDepartments) => {
      const updatedDepartments = [...prevDepartments];
      updatedDepartments[index].showForm = true; // Show the additional info form
      return updatedDepartments;
    });
  };

  const handleFormSubmit = (index, departmentInfo) => {
    setDepartments((prevDepartments) => {
      const updatedDepartments = [...prevDepartments];
      updatedDepartments[index].departmentInfo = departmentInfo;
      updatedDepartments[index].showForm = false; // Hide the form after submitting
      return updatedDepartments;
    });
     // Log the department info to the console
  console.log(`Department ${index + 1} Info:`, departmentInfo);


    alert(`Department ${index + 1} info saved successfully!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-12 px-6">
      <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-10">
        Add Departments
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {departments.map((department, index) => (
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
                  onClick={() => handleAddInfoClick(index)}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Add Info <span className="ml-2">+</span>
                </button>

                {/* Show the Add Info form if the user clicked the button */}
                {department.showForm && (
                  <DepartmentForm
                    onSubmit={(departmentInfo) =>
                      handleFormSubmit(index, departmentInfo)
                    }
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Form for adding department information
const DepartmentForm = ({ onSubmit }) => {
  const [departmentInfo, setDepartmentInfo] = useState({
    departmentHOD: "",
    totalFaculties: "",
    totalClasses: "",
    totalLabs: "",
    totalStudents: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartmentInfo({ ...departmentInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(departmentInfo);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 w-full bg-white p-4 rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label
            htmlFor="departmentHOD"
            className="block text-sm font-medium text-gray-700"
          >
            Department HOD
          </label>
          <input
            type="text"
            id="departmentHOD"
            name="departmentHOD"
            value={departmentInfo.departmentHOD}
            onChange={handleInputChange}
            placeholder="Enter HOD name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="totalFaculties"
            className="block text-sm font-medium text-gray-700"
          >
            Total Faculties
          </label>
          <input
            type="number"
            id="totalFaculties"
            name="totalFaculties"
            value={departmentInfo.totalFaculties}
            onChange={handleInputChange}
            placeholder="Enter total faculties"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="totalClasses"
            className="block text-sm font-medium text-gray-700"
          >
            Total Classes
          </label>
          <input
            type="number"
            id="totalClasses"
            name="totalClasses"
            value={departmentInfo.totalClasses}
            onChange={handleInputChange}
            placeholder="Enter total classes"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="totalLabs"
            className="block text-sm font-medium text-gray-700"
          >
            Total Labs
          </label>
          <input
            type="number"
            id="totalLabs"
            name="totalLabs"
            value={departmentInfo.totalLabs}
            onChange={handleInputChange}
            placeholder="Enter total labs"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="totalStudents"
            className="block text-sm font-medium text-gray-700"
          >
            Total Students
          </label>
          <input
            type="number"
            id="totalStudents"
            name="totalStudents"
            value={departmentInfo.totalStudents}
            onChange={handleInputChange}
            placeholder="Enter total students"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save Info
      </button>
    </form>
  );
};

export default Departments;
