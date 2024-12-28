const subjects = ['CN', 'DLCOA', 'ADBMS', 'SE', 'TCS', 'PCE-2'];
const teachers = ['Priti Rumao', 'Dr.Dinesh Patil', 'Smita Jawale', 'Soniya Khatu', 'Swapna Borde', 'Dr.Aashi Cynth'];

// Faculties and their subjects
const faculties = [
    {
        faculty_name: "Dr.Dinesh Patil",
        teaching_subjects: ["OS", "SE"],
    },
    {
        faculty_name: "Dr.Priti Rumao",
        teaching_subjects: ["TCS", "CP"],
    },
    {
        faculty_name: "Dr.Swapna Borde",
        teaching_subjects: ["DLCOA", "AOA"],
    },
    {
        faculty_name: "Dr.Sonia Khatu",
        teaching_subjects: ["MP", "CG", "CN"],
    },
    {
        faculty_name: "Dr.Smita Jawale",
        teaching_subjects: ["DBMS", "ADBMS"],
    },
    {
        faculty_name: "Dr.Aashi Cynth",
        teaching_subjects: ["PCE-2"],
    }
];

// Create a mapping of subjects to faculty
const subjectToFacultyMap = {};

// Populate the map with subjects and their corresponding faculties
faculties.forEach(faculty => {
    faculty.teaching_subjects.forEach(subject => {
        subjectToFacultyMap[subject] = faculty.faculty_name;
    });
});

// Now create the matrix based on the subjects and their assigned teachers
const rows = 5;
const columns = 9;
const matrix = [];
const usedSubjects = new Set(); // To track subjects that have already been assigned in the row

for (let i = 0; i < rows; i++) {
    const row = [];
    const shuffledSubjects = [...subjects]; // Copy the subjects array
    shuffleArray(shuffledSubjects); // Shuffle the subjects for this row

    let subjectIndex = 0; // Track the index of shuffled subjects
    const rowUsedSubjects = new Set(); // Local set to track used subjects in the current row

    for (let j = 0; j < columns; j++) {
        if (j === 2 || j === 5) {
            row.push([null, null]);  // Skip columns 3 and 6 (index 2 and 5)
        } else {
            // Check if the current subject has already been used in this row
            let subject = shuffledSubjects[subjectIndex % shuffledSubjects.length];

            // Ensure subject is not repeated within the same row
            while (rowUsedSubjects.has(subject) && rowUsedSubjects.size < shuffledSubjects.length) {
                subjectIndex++;
                subject = shuffledSubjects[subjectIndex % shuffledSubjects.length];
            }

            // If all subjects have been used in this row, break out of the loop
            if (rowUsedSubjects.size === shuffledSubjects.length) {
                break;
            }

            // Assign the teacher for the subject
            const teacher = subjectToFacultyMap[subject];
            row.push([subject, teacher ? teacher : 'No teacher']);

            rowUsedSubjects.add(subject);  // Mark this subject as used in the current row
            subjectIndex++;
        }
    }

    matrix.push(row);
}

console.log(matrix);

// Function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];  // Swap elements
    }
}
