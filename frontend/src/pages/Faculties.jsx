import React, { useState } from 'react';

const Faculties = () => {
    const [faculties, setFaculties] = useState([]);
    const [newFaculty, setNewFaculty] = useState({
        facultyId: '',
        facultyName: '',
        teachingSubjects: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFaculty({ ...newFaculty, [name]: value });
    };

    const handleAddFaculty = () => {
        if (newFaculty.facultyId && newFaculty.facultyName && newFaculty.teachingSubjects.length > 0) {
            const newFacultyData = {
                ...newFaculty,
                id: faculties.length + 1, // Generate a simple id based on the current length
            };

            // Add the new faculty to the faculties array
            setFaculties([...faculties, newFacultyData]);

            // Reset the form
            setNewFaculty({ facultyId: '', facultyName: '', teachingSubjects: [] });
        } else {
            alert("Please fill all the fields including teaching subjects.");
        }
    };

    const handleAddSubject = (subject) => {
        if (subject) {
            setNewFaculty({
                ...newFaculty,
                teachingSubjects: [...newFaculty.teachingSubjects, subject]
            });
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-700">Faculties</h2>

            {/* Add Faculty Form */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700">Add New Faculty</h3>
                <div className="flex space-x-4 mt-4">
                    <input
                        type="text"
                        placeholder="Faculty ID"
                        name="facultyId"
                        value={newFaculty.facultyId}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Faculty Name"
                        name="facultyName"
                        value={newFaculty.facultyName}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Add Subject"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.target.value) {
                                handleAddSubject(e.target.value);
                                e.target.value = ''; // Reset input field after adding subject
                            }
                        }}
                        className="border p-2 rounded"
                    />
                    <button
                        onClick={handleAddFaculty}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Add Faculty
                    </button>
                </div>
                <div className="mt-2">
                    <h4 className="text-sm text-gray-600">Subjects: {newFaculty.teachingSubjects.join(', ')}</h4>
                </div>
            </div>

            {/* Faculties List */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-700">Faculty List</h3>
                <table className="table-auto w-full text-left border-collapse mt-4">
                    <thead>
                        <tr className="bg-blue-100">
                            <th className="px-4 py-2">Faculty ID</th>
                            <th className="px-4 py-2">Faculty Name</th>
                            <th className="px-4 py-2">Teaching Subjects</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faculties.map((faculty) => (
                            <tr key={faculty.id}>
                                <td className="border px-4 py-2">{faculty.facultyId}</td>
                                <td className="border px-4 py-2">{faculty.facultyName}</td>
                                <td className="border px-4 py-2">{faculty.teachingSubjects.join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Faculties;
