import React, { useState } from 'react';

const Subjects = () => {
  // State for dropdowns and other form elements
  const [semesterType, setSemesterType] = useState('odd'); // 'odd' or 'even'
  const [semester, setSemester] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [subjectType, setSubjectType] = useState('class'); // 'class', 'lab', or 'both'
  const [subjectsList, setSubjectsList] = useState([]);

  // Semesters based on type (odd/even)
  const oddSemesters = ['Sem 1', 'Sem 3', 'Sem 5', 'Sem 7'];
  const evenSemesters = ['Sem 2', 'Sem 4', 'Sem 6', 'Sem 8'];

  // Handle semester type change
  const handleSemesterTypeChange = (e) => {
    setSemesterType(e.target.value);
    setSemester(''); // Reset semester selection
  };

  // Handle subject type (class, lab, both) change
  const handleSubjectTypeChange = (e) => {
    setSubjectType(e.target.value);
  };

  // Handle subject name input change
  const handleSubjectNameChange = (e) => {
    setSubjectName(e.target.value);
  };

  // Handle subject save (add subject to list)
  const handleAddSubject = () => {
    if (!subjectName || !semester || !subjectType) {
      alert('Please fill all fields');
      return;
    }

    const newSubject = {
      subjectName,
      semester,
      subjectType
    };

    setSubjectsList([...subjectsList, newSubject]);
    setSubjectName('');
  };

  // Filtered subjects based on selected semester
  const filteredSubjects = subjectsList.filter(subject => subject.semester === semester);

  return (
    <div className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add Subject</h2>

      {/* Dropdown for Odd or Even Semesters */}
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">Select Semester Type</label>
        <select
          value={semesterType}
          onChange={handleSemesterTypeChange}
          className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 placeholder-gray-400 text-gray-800"
        >
          <option value="odd">Odd Semesters</option>
          <option value="even">Even Semesters</option>
        </select>
      </div>

      {/* Dropdown for Semesters */}
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">Select Semester</label>
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 placeholder-gray-400 text-gray-800"
          disabled={!semesterType} // Disable if semesterType is not selected
        >
          <option value="">Select a Semester</option>
          {(semesterType === 'odd' ? oddSemesters : evenSemesters).map((sem, idx) => (
            <option key={idx} value={sem}>{sem}</option>
          ))}
        </select>
      </div>

      {/* Subject Name Input */}
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">Subject Name</label>
        <input
          type="text"
          value={subjectName}
          onChange={handleSubjectNameChange}
          className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 placeholder-gray-400 text-gray-800"
          placeholder="Enter subject name"
        />
      </div>

      {/* Radio Buttons for Subject Type */}
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">Subject Type</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center text-gray-700">
            <input
              type="radio"
              value="class"
              checked={subjectType === 'class'}
              onChange={handleSubjectTypeChange}
              className="form-radio"
            />
            <span className="ml-2">Class Subject</span>
          </label>
          <label className="inline-flex items-center text-gray-700">
            <input
              type="radio"
              value="lab"
              checked={subjectType === 'lab'}
              onChange={handleSubjectTypeChange}
              className="form-radio"
            />
            <span className="ml-2">Lab Subject</span>
          </label>
          <label className="inline-flex items-center text-gray-700">
            <input
              type="radio"
              value="both"
              checked={subjectType === 'both'}
              onChange={handleSubjectTypeChange}
              className="form-radio"
            />
            <span className="ml-2">Both</span>
          </label>
        </div>
      </div>

      {/* Button to Add Subject */}
      <div>
        <button
          type="button"
          onClick={handleAddSubject}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Subject
        </button>
      </div>

      {/* Display Added Subjects for the selected semester */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Added Subjects for {semester}</h3>
        {filteredSubjects.length === 0 ? (
          <p>No subjects added for this semester yet.</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-700">Class Subjects</th>
                <th className="px-4 py-2 text-left text-gray-700">Lab Subjects</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-t px-4 py-2">
                  <ul>
                    {filteredSubjects
                      .filter(subject => subject.subjectType === 'class' || subject.subjectType === 'both')
                      .map((subject, idx) => (
                        <li key={idx} className="p-2">
                          <h4 className="text-lg font-semibold text-gray-800">{subject.subjectName}</h4>
                          <p className="text-gray-600">Semester: {subject.semester}</p>
                        </li>
                      ))}
                  </ul>
                </td>
                <td className="border-t px-4 py-2">
                  <ul>
                    {filteredSubjects
                      .filter(subject => subject.subjectType === 'lab' || subject.subjectType === 'both')
                      .map((subject, idx) => (
                        <li key={idx} className="p-2">
                          <h4 className="text-lg font-semibold text-gray-800">{'L-' + subject.subjectName}</h4>
                          <p className="text-gray-600">Semester: {subject.semester}</p>
                        </li>
                      ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Subjects;
