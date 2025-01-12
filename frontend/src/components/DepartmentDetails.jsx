import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BasicInformation from '../pages/BasicInformation';
import Subjects from '../pages/Subjects'; // Importing the Subjects component
import RoomAllocation from '../pages/RoomAllocation';
import Faculties from '../pages/Faculties'
import SemInfo from '../pages/SemInfo';

const DepartmentDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('basic-info'); // Default tab is 'basic-info'

  const handleTabChange = (tab) => {
    setActiveTab(tab); // Change the active tab when a new one is clicked
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-12 px-6 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">Department {parseInt(id) + 1}</h3>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => handleTabChange('basic-info')}
              className={`w-full text-left py-2 px-4 rounded-lg ${activeTab === 'basic-info' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Basic Information
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabChange('subjects')}
              className={`w-full text-left py-2 px-4 rounded-lg ${activeTab === 'subjects' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Subjects
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabChange('sem-info')}
              className={`w-full text-left py-2 px-4 rounded-lg ${activeTab === 'sem-info' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Sem Info
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabChange('room-allocations')}
              className={`w-full text-left py-2 px-4 rounded-lg ${activeTab === 'room-allocations' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Room Allocations
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabChange('faculties')}
              className={`w-full text-left py-2 px-4 rounded-lg ${activeTab === 'faculties' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Faculties
            </button>
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div className="w-3/4 ml-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {activeTab === 'basic-info' && <BasicInformation />} {/* Render BasicInformation component for 'basic-info' tab */}
          {activeTab === 'subjects' && <Subjects />} {/* Render Subjects component for 'subjects' tab */}
          {activeTab === 'faculties' && <Faculties />} {/* Render Subjects component for 'subjects' tab */}
          {activeTab === 'sem-info' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Sem Info</h2>
              <SemInfo />
            </div>
          )}
          {activeTab === 'room-allocations' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Room Allocations</h2>
              <RoomAllocation />
              {/* Display faculties info */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;
