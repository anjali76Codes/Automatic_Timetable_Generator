import React, { useState, useEffect } from "react";

const SemInfo = () => {
    const [semesterType, setSemesterType] = useState("odd");
    const [semesterNumber, setSemesterNumber] = useState("");
    const [noOfDivisions, setNoOfDivisions] = useState("");
    const [noOfStudents, setNoOfStudents] = useState("");
    const [divisions, setDivisions] = useState([]);

    const oddSemesters = [1, 3, 5, 7, 9, 11];
    const evenSemesters = [2, 4, 6, 8, 10, 12];

    const handleSemesterTypeChange = (e) => setSemesterType(e.target.value);

    const handleSave = () => {
        const semesterData = {
            sem: semesterType,
            semWiseDetails: [
                {
                    sem: semesterNumber,
                    noOfStudents,
                    noOfDivisions,
                    divisions,
                },
            ],
        };
        console.log("Semester Data:", semesterData);
        // API call logic here
    };

    const handleDivisionChange = (index, field, value) => {
        const updatedDivisions = [...divisions];
        updatedDivisions[index][field] = value;
        setDivisions(updatedDivisions);
    };

    const handleBatchChange = (divisionIndex, batchIndex, field, value) => {
        const updatedDivisions = [...divisions];
        updatedDivisions[divisionIndex].batches[batchIndex][field] = value;
        setDivisions(updatedDivisions);
    };

    const addDivision = () => {
        if (isNaN(noOfDivisions) || noOfDivisions <= 0) {
            alert("Please enter a valid number of divisions.");
            return;
        }

        const newDivisions = [...divisions];
        for (let i = newDivisions.length; i < noOfDivisions; i++) {
            newDivisions.push({
                division: `${i + 1}`,
                noOfStudents: "",
                noOfBatches: 1,
                batches: [
                    {
                        batchName: "1",
                        noOfStudents: "",
                    },
                ],
                isEditing: false,
            });
        }
        setDivisions(newDivisions);
    };

    const addBatch = (divisionIndex) => {
        const updatedDivisions = [...divisions];
        const division = updatedDivisions[divisionIndex];
        for (let i = division.batches.length; i < division.noOfBatches; i++) {
            division.batches.push({
                batchName: "", // Default to an empty string
                noOfStudents: "",
            });
        }
        setDivisions(updatedDivisions);
    };

    const handleNumberInputChange = (e, setter) => {
        const value = e.target.value;
        if (value === "" || !isNaN(value)) {
            setter(value);
        }
    };

    // Re-generate divisions whenever `noOfDivisions` changes
    useEffect(() => {
        if (noOfDivisions) {
            const newDivisions = [];
            for (let i = 0; i < noOfDivisions; i++) {
                newDivisions.push({
                    division: `${i + 1}`,
                    noOfStudents: "",
                    noOfBatches: 1,
                    batches: [
                        {
                            batchName: "1",
                            noOfStudents: "",
                        },
                    ],
                    isEditing: false,
                });
            }
            setDivisions(newDivisions);
        }
    }, [noOfDivisions]);

    // Re-generate batches whenever `noOfBatches` changes
    useEffect(() => {
        const updatedDivisions = [...divisions];
        updatedDivisions.forEach((division, index) => {
            if (division.noOfBatches) {
                while (division.batches.length < division.noOfBatches) {
                    division.batches.push({
                        batchName: `${division.batches.length + 1}`,
                        noOfStudents: "",
                    });
                }
                division.batches = division.batches.slice(0, division.noOfBatches); // Truncate extra batches
            }
        });
        setDivisions(updatedDivisions);
    }, [divisions]);

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl"
        >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Semester Details</h2>

            <div className="grid grid-cols-2 gap-6">
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

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Select Semester</label>
                    <select
                        value={semesterNumber}
                        onChange={(e) => setSemesterNumber(e.target.value)}
                        className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 placeholder-gray-400 text-gray-800"
                    >
                        <option value="">Select a Semester</option>
                        {(semesterType === "odd" ? oddSemesters : evenSemesters).map((sem) => (
                            <option key={sem} value={sem}>
                                {sem}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="noOfDivisions" className="block text-lg font-medium text-gray-700 mb-2">
                    Number of Divisions
                </label>
                <input
                    type="text"
                    id="noOfDivisions"
                    value={noOfDivisions}
                    onChange={(e) => handleNumberInputChange(e, setNoOfDivisions)}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500"
                />
            </div>

            <div>
                <label htmlFor="noOfStudents" className="block text-lg font-medium text-gray-700 mb-2">
                    Total Number of Students
                </label>
                <input
                    type="text"
                    id="noOfStudents"
                    value={noOfStudents}
                    onChange={(e) => handleNumberInputChange(e, setNoOfStudents)}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-blue-500"
                />
            </div>

            {/* Division-wise details in tabular format */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-700">Division-wise Details</h3>
                <table className="table-auto w-full text-left border-collapse mt-4">
                    <thead>
                        <tr className="bg-blue-100">
                            <th className="px-4 py-2">Division</th>
                            <th className="px-4 py-2">Number of Students</th>
                            <th className="px-4 py-2">Number of Batches</th>
                            <th className="px-4 py-2">Batch Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {divisions.map((division, divisionIndex) => (
                            <tr key={divisionIndex}>
                                <td className="border px-4 py-2">{division.division}</td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="text"
                                        value={division.noOfStudents}
                                        onChange={(e) =>
                                            handleDivisionChange(divisionIndex, "noOfStudents", e.target.value)
                                        }
                                        className="w-full px-2 py-1 border-2 rounded-md"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="text"
                                        value={division.noOfBatches}
                                        onChange={(e) =>
                                            handleDivisionChange(divisionIndex, "noOfBatches", e.target.value)
                                        }
                                        className="w-full px-2 py-1 border-2 rounded-md"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    {division.batches.map((batch, batchIndex) => (
                                        <div key={batchIndex} className="mt-2">
                                            <div className="text-sm font-semibold">
                                                {/* Label for batch name */}
                                                Batch{" "}
                                                <input
                                                    type="text"
                                                    // value={batch.batchName || ''}  // Allow custom batch name input
                                                    onChange={(e) => handleBatchChange(divisionIndex, batchIndex, 'batchName', e.target.value)}
                                                    placeholder="Enter batch name"
                                                    className="border px-2 py-1 text-sm"
                                                />{" "}
                                                -{" "}
                                                {/* Input for number of students */}
                                                <input
                                                    type="number"
                                                    value={batch.noOfStudents || ''}
                                                    onChange={(e) => handleBatchChange(divisionIndex, batchIndex, 'noOfStudents', e.target.value)}
                                                    placeholder="Enter number of students"
                                                    className="border px-2 py-1 text-sm"
                                                    min="0"
                                                    step="1"
                                                />{" "}
                                                Students
                                            </div>
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button
                type="button"
                onClick={handleSave}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition duration-200"
            >
                Save Information
            </button>
        </form>
    );
};

export default SemInfo;
