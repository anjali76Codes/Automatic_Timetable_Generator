import { Subject } from "../models/Subject.models.js";
import { Department } from "../models/department.models.js";

// Controller to add a subject to both the Subject collection and Department
export const addSubject = async (req, res) => {
    try {
        const { departmentId, semesterType, semester, subjectName, subjectType } = req.body;


        // Convert semesterType to proper case (e.g., "odd" -> "Odd")
        const formattedSemesterType = semesterType.charAt(0).toUpperCase() + semesterType.slice(1);

        // Convert semester number for ease of processing
        const semesterNumber = parseInt(semester.split(" ")[1]);

        // Find existing subject document for the given semester type
        let subject = await Subject.findOne({ "subjectDetails.sem": formattedSemesterType });

        // If subject document for the given semester type doesn't exist, create a new one
        if (!subject) {
            subject = new Subject({
                subjectDetails: [
                    {
                        sem: formattedSemesterType,
                        semWiseSubjects: [
                            {
                                sem: semesterNumber,
                                classSubjects: subjectType === 'class' || subjectType === 'both' ? [subjectName] : [],
                                labSubjects: subjectType === 'lab' || subjectType === 'both' ? [subjectName] : []
                            }
                        ]
                    }
                ]
            });
        } else {
            const semDetail = subject.subjectDetails.find(
                (sem) => sem.sem === formattedSemesterType
            );

            if (semDetail) {
                const semWiseSubjects = semDetail.semWiseSubjects.find(
                    (subject) => subject.sem === semesterNumber
                );

                if (semWiseSubjects) {
                    // Add the subject to the appropriate array (classSubjects or labSubjects)
                    if (subjectType === 'class' || subjectType === 'both') {
                        if (!semWiseSubjects.classSubjects.includes(subjectName)) {
                            semWiseSubjects.classSubjects.push(subjectName);
                        }
                    }
                    if (subjectType === 'lab' || subjectType === 'both') {
                        if (!semWiseSubjects.labSubjects.includes(subjectName)) {
                            semWiseSubjects.labSubjects.push(subjectName);
                        }
                    }
                } else {
                    // If the semester-wise data does not exist, add it
                    semDetail.semWiseSubjects.push({
                        sem: semesterNumber,
                        classSubjects: subjectType === 'class' || subjectType === 'both' ? [subjectName] : [],
                        labSubjects: subjectType === 'lab' || subjectType === 'both' ? [subjectName] : []
                    });
                }
            }
        }

        // Save the updated subject document
        await subject.save();

        // Now update the department to include this new subject
        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        // Add the subject to the department's subjectDetails array if not already present
        if (!department.subjectDetails.includes(subject._id)) {
            department.subjectDetails.push(subject._id);
            await department.save();
        }

        res.status(200).json({ message: 'Subject added successfully to department', subject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add subject' });
    }
};