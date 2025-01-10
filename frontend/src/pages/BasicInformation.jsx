import React, { useState } from 'react';

const BasicInformation = () => {
  const [formData, setFormData] = useState({
    departmentName: '',
    departmentHOD: '',
    totalFaculties: '',
    totalClasses: '',
    totalLabs: '',
    totalStudents: '',
    totalFloors: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate data
    if (!formData.departmentName || !formData.departmentHOD || !formData.totalFaculties || !formData.totalClasses || !formData.totalLabs || !formData.totalStudents) {
      alert('Please fill all the fields');
      return;
    }

    if (formData.totalFaculties < 0 || formData.totalClasses < 0 || formData.totalLabs < 0 || formData.totalStudents < 0) {
      alert('Numbers cannot be negative');
      return;
    }

    // Submit logic here (API call or state update)
    console.log('Form Data Submitted: ', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center text-gradient">Basic Information</h2>

      {/* Department Name and HOD in the same row */}
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-1">
          <label htmlFor="departmentName" className="block text-lg font-medium text-gray-700 mb-2">
            Department Name
          </label>
          <input
            type="text"
            id="departmentName"
            name="departmentName"
            value={formData.departmentName}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 placeholder-gray-400 text-gray-800"
            placeholder="Enter department name"
            required
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="departmentHOD" className="block text-lg font-medium text-gray-700 mb-2">
            Department HOD
          </label>
          <input
            type="text"
            id="departmentHOD"
            name="departmentHOD"
            value={formData.departmentHOD}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 placeholder-gray-400 text-gray-800"
            placeholder="Enter HOD name"
            required
          />
        </div>
      </div>

      {/* Total Faculties, Classes, Labs in the same row */}
      <div className="grid grid-cols-3 gap-6">
        <div>
          <label htmlFor="totalFaculties" className="block text-lg font-medium text-gray-700 mb-2">
            Total Faculties
          </label>
          <input
            type="number"
            id="totalFaculties"
            name="totalFaculties"
            value={formData.totalFaculties}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 placeholder-gray-400 text-gray-800"
            placeholder="Enter total faculties"
            required
            min="0"
          />
        </div>
        <div>
          <label htmlFor="totalClasses" className="block text-lg font-medium text-gray-700 mb-2">
            Total Classes
          </label>
          <input
            type="number"
            id="totalClasses"
            name="totalClasses"
            value={formData.totalClasses}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 placeholder-gray-400 text-gray-800"
            placeholder="Enter total classes"
            required
            min="0"
          />
        </div>
        <div>
          <label htmlFor="totalLabs" className="block text-lg font-medium text-gray-700 mb-2">
            Total Labs
          </label>
          <input
            type="number"
            id="totalLabs"
            name="totalLabs"
            value={formData.totalLabs}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 placeholder-gray-400 text-gray-800"
            placeholder="Enter total labs"
            required
            min="0"
          />
        </div>
      </div>

      {/* Total Students */}
      <div>
        <label htmlFor="totalStudents" className="block text-lg font-medium text-gray-700 mb-2">
          Total Students
        </label>
        <input
          type="number"
          id="totalStudents"
          name="totalStudents"
          value={formData.totalStudents}
          onChange={handleChange}
          className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 placeholder-gray-400 text-gray-800"
          placeholder="Enter total students"
          required
          min="0"
        />
      </div>

      {/* Total Floors */}
      <div>
        <label htmlFor="totalFloors" className="block text-lg font-medium text-gray-700 mb-2">
          Total Floors
        </label>
        <input
          type="number"
          id="totalFloors"
          name="totalFloors"
          value={formData.totalFloors}
          onChange={handleChange}
          className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 placeholder-gray-400 text-gray-800"
          placeholder="Enter total Floors"
          required
          min="0"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Save Information
      </button>
    </form>
  );
};

export default BasicInformation;
