import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCollege = () => {
  const [formData, setFormData] = useState({
    collegeName: "",
    collegeCode: "",
    collegeAddress: "",
    collegePrincipal: "",
    totalClasses: "",
    totalLabs: "",
    totalFaculties: "",
    totalDepartments: "",
    totalFloors: "",
  });

  const [colleges, setColleges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch colleges on component mount
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(
          "http://localhost:3000/api/v1/timetable/colleges",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const collegeIds = response.data.colleges;
        if (collegeIds.length > 0) {
          // Fetch details for each college if they exist
          const collegeDetailsPromises = collegeIds.map(async (collegeId) => {
            const collegeResponse = await axios.get(
              `http://localhost:3000/api/v1/timetable/colleges/${collegeId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return collegeResponse.data;
          });

          const collegeDetails = await Promise.all(collegeDetailsPromises);
          setColleges(collegeDetails);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching colleges:", error);
        setError(error.response ? error.response.data.message : "Failed to fetch colleges.");
        setIsLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
  
      // Send the data to the backend using axios, including the token in the headers
      const response = await axios.post(
        "http://localhost:3000/api/v1/timetable/add-college",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
  
      console.log("Response:", response.data);
  
      // Extract collegeCode from the nested structure
      const collegeCode = response.data.message?.collegeDetails?.collegeCode;
  
      if (!collegeCode) {
        throw new Error("College code not found in response.");
      }
  
      // Set isSubmitted to true to display the success message
      setIsSubmitted(true);
  
      // Navigate to the departments page with collegeCode
      navigate(`/departments/${collegeCode}`, { state: { collegeCode } });
    } catch (error) {
      console.error("Error adding college:", error.message || error);
    }
  };
  

  if (isLoading) {
    return <div>Loading colleges...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center py-12 px-6">
      {colleges.length === 0 ? (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-10">
          <h2 className="text-4xl font-extrabold text-indigo-600 text-center mb-8">
            Add College Information
          </h2>

          {isSubmitted && (
            <div className="mb-6 text-center text-green-600 font-semibold text-lg">
              College added successfully!
            </div>
          )}

          <div className="grid grid-cols-2 gap-8">
            {/* College Name */}
            <div>
              <label htmlFor="collegeName" className="block text-lg font-medium text-gray-700">
                College Name
              </label>
              <input
                type="text"
                id="collegeName"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className="mt-3 block w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter college name"
                required
              />
            </div>

            {/* College Code */}
            <div>
              <label htmlFor="collegeCode" className="block text-lg font-medium text-gray-700">
                College Code
              </label>
              <input
                type="text"
                id="collegeCode"
                name="collegeCode"
                value={formData.collegeCode}
                onChange={handleChange}
                className="mt-3 block w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter unique college code"
                required
              />
            </div>

            {/* College Address */}
            <div className="col-span-2">
              <label htmlFor="collegeAddress" className="block text-lg font-medium text-gray-700">
                College Address
              </label>
              <textarea
                id="collegeAddress"
                name="collegeAddress"
                value={formData.collegeAddress}
                onChange={handleChange}
                className="mt-3 block w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter college address"
                rows="3"
                required
              ></textarea>
            </div>

            {/* College Principal */}
            <div>
              <label htmlFor="collegePrincipal" className="block text-lg font-medium text-gray-700">
                College Principal
              </label>
              <input
                type="text"
                id="collegePrincipal"
                name="collegePrincipal"
                value={formData.collegePrincipal}
                onChange={handleChange}
                className="mt-3 block w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter principal's name"
                required
              />
            </div>

            {/* Total Classes */}
            <div>
              <label htmlFor="totalClasses" className="block text-lg font-medium text-gray-700">
                Total Classes
              </label>
              <input
                type="number"
                id="totalClasses"
                name="totalClasses"
                value={formData.totalClasses}
                onChange={handleChange}
                className="mt-3 block w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter total number of classes"
                min="0"
                required
              />
            </div>

            {/* Total Labs */}
            <div>
              <label htmlFor="totalLabs" className="block text-lg font-medium text-gray-700">
                Total Labs
              </label>
              <input
                type="number"
                id="totalLabs"
                name="totalLabs"
                value={formData.totalLabs}
                onChange={handleChange}
                className="mt-3 block w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter total number of labs"
                min="0"
                required
              />
            </div>

            {/* Total Floors */}
            <div>
              <label htmlFor="totalFloors" className="block text-lg font-medium text-gray-700">
                Total Floors
              </label>
              <input
                type="number"
                id="totalFloors"
                name="totalFloors"
                value={formData.totalFloors}
                onChange={handleChange}
                className="mt-3 block w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter total number of floors"
                min="0"
                required
              />
            </div>

            {/* Total Faculties */}
            <div>
              <label htmlFor="totalFaculties" className="block text-lg font-medium text-gray-700">
                Total Faculties
              </label>
              <input
                type="number"
                id="totalFaculties"
                name="totalFaculties"
                value={formData.totalFaculties}
                onChange={handleChange}
                className="mt-3 block w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter total number of faculties"
                min="0"
                required
              />
            </div>

            {/* Total Departments */}
            <div>
              <label htmlFor="totalDepartments" className="block text-lg font-medium text-gray-700">
                Total Departments
              </label>
              <input
                type="number"
                id="totalDepartments"
                name="totalDepartments"
                value={formData.totalDepartments}
                onChange={handleChange}
                className="mt-3 block w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter total number of departments"
                min="0"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-8 w-full bg-indigo-600 text-white font-bold py-4 rounded-lg text-xl hover:bg-indigo-700 transition"
          >
            Add College
          </button>
        </form>
      ) : (
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-10">
          <h2 className="text-4xl font-extrabold text-indigo-600 text-center mb-8">
            Your Colleges
          </h2>
          <div>
            {colleges.map((college, index) => (
              <div key={index} className="college-card mb-4 p-4 border border-gray-300 rounded-lg">
                <h3 className="text-2xl font-semibold text-indigo-600">{college.collegeName}</h3>
                {/* You can display more college details here */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCollege;