import React, { useState } from 'react';

export default function RoomAllocation() {
    const [classes, setClasses] = useState([]);
    const [labs, setLabs] = useState([]);
    const [newClass, setNewClass] = useState({ floor: '', roomNumber: '' });
    const [newLab, setNewLab] = useState({ floor: '', roomNumber: '' });

    const handleEdit = (type, id) => {
        const updatedItems = type === 'classes' ? [...classes] : [...labs];
        const itemIndex = updatedItems.findIndex(item => item.id === id);
        updatedItems[itemIndex].isEditing = true;
        type === 'classes' ? setClasses(updatedItems) : setLabs(updatedItems);
    };

    const handleSave = (type, id, updatedData) => {
        const updatedItems = type === 'classes' ? [...classes] : [...labs];
        const itemIndex = updatedItems.findIndex(item => item.id === id);
        updatedItems[itemIndex] = { ...updatedItems[itemIndex], ...updatedData, isEditing: false };
        type === 'classes' ? setClasses(updatedItems) : setLabs(updatedItems);
    };

    const handleChange = (type, id, field, value) => {
        const updatedItems = type === 'classes' ? [...classes] : [...labs];
        const itemIndex = updatedItems.findIndex(item => item.id === id);
        updatedItems[itemIndex][field] = value;
        type === 'classes' ? setClasses(updatedItems) : setLabs(updatedItems);
    };

    const handleAddClass = () => {
        if (newClass.floor && newClass.roomNumber) {
            setClasses([...classes, { ...newClass, id: classes.length + 1 }]);
            setNewClass({ floor: '', roomNumber: '' }); // Reset the form
        }
    };

    const handleAddLab = () => {
        if (newLab.floor && newLab.roomNumber) {
            setLabs([...labs, { ...newLab, id: labs.length + 1 }]);
            setNewLab({ floor: '', roomNumber: '' }); // Reset the form
        }
    };

    return (
        <div className="w-3/4 bg-white p-6 rounded-lg shadow-md">
            {/* Class Section */}
            <h1 className="text-2xl font-semibold text-gray-700 mb-6">Allocated Classes</h1>
            <table className="table-auto w-full text-left border-collapse">
                <thead>
                    <tr className="bg-blue-100">
                        <th className="px-4 py-2">Sr. No.</th>
                        <th className="px-4 py-2">Floor</th>
                        <th className="px-4 py-2">Room Number</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((cls) => (
                        <tr key={cls.id}>
                            <td className="border px-4 py-2">{cls.id}</td>
                            <td className="border px-4 py-2">
                                {cls.isEditing ? (
                                    <input
                                        type="number"
                                        value={cls.floor}
                                        onChange={(e) => handleChange('classes', cls.id, 'floor', e.target.value)}
                                        className="border p-1 rounded"
                                    />
                                ) : (
                                    cls.floor
                                )}
                            </td>
                            <td className="border px-4 py-2">
                                {cls.isEditing ? (
                                    <input
                                        type="text"
                                        value={cls.roomNumber}
                                        onChange={(e) => handleChange('classes', cls.id, 'roomNumber', e.target.value)}
                                        className="border p-1 rounded"
                                    />
                                ) : (
                                    cls.roomNumber
                                )}
                            </td>
                            <td className="border px-4 py-2">
                                {cls.isEditing ? (
                                    <button
                                        onClick={() => handleSave('classes', cls.id, { floor: cls.floor, roomNumber: cls.roomNumber })}
                                        className="bg-green-500 text-white py-1 px-3 rounded"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEdit('classes', cls.id)}
                                        className="bg-yellow-500 text-white py-1 px-3 rounded"
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Class Form */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700">Add New Class</h2>
                <div className="flex space-x-4 mt-4">
                    <input
                        type="number"
                        placeholder="Floor"
                        value={newClass.floor}
                        onChange={(e) => setNewClass({ ...newClass, floor: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Room Number"
                        value={newClass.roomNumber}
                        onChange={(e) => setNewClass({ ...newClass, roomNumber: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <button
                        onClick={handleAddClass}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Lab Section */}
            <h1 className="text-2xl font-semibold text-gray-700 mt-10 mb-6">Allocated Labs</h1>
            <table className="table-auto w-full text-left border-collapse">
                <thead>
                    <tr className="bg-blue-100">
                        <th className="px-4 py-2">Sr. No.</th>
                        <th className="px-4 py-2">Floor</th>
                        <th className="px-4 py-2">Room Number</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {labs.map((lab) => (
                        <tr key={lab.id}>
                            <td className="border px-4 py-2">{lab.id}</td>
                            <td className="border px-4 py-2">
                                {lab.isEditing ? (
                                    <input
                                        type="number"
                                        value={lab.floor}
                                        onChange={(e) => handleChange('labs', lab.id, 'floor', e.target.value)}
                                        className="border p-1 rounded"
                                    />
                                ) : (
                                    lab.floor
                                )}
                            </td>
                            <td className="border px-4 py-2">
                                {lab.isEditing ? (
                                    <input
                                        type="text"
                                        value={lab.roomNumber}
                                        onChange={(e) => handleChange('labs', lab.id, 'roomNumber', e.target.value)}
                                        className="border p-1 rounded"
                                    />
                                ) : (
                                    lab.roomNumber
                                )}
                            </td>
                            <td className="border px-4 py-2">
                                {lab.isEditing ? (
                                    <button
                                        onClick={() => handleSave('labs', lab.id, { floor: lab.floor, roomNumber: lab.roomNumber })}
                                        className="bg-green-500 text-white py-1 px-3 rounded"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEdit('labs', lab.id)}
                                        className="bg-yellow-500 text-white py-1 px-3 rounded"
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Lab Form */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700">Add New Lab</h2>
                <div className="flex space-x-4 mt-4">
                    <input
                        type="number"
                        placeholder="Floor"
                        value={newLab.floor}
                        onChange={(e) => setNewLab({ ...newLab, floor: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Room Number"
                        value={newLab.roomNumber}
                        onChange={(e) => setNewLab({ ...newLab, roomNumber: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <button
                        onClick={handleAddLab}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
