// Subject lists and teacher data
const subjects = ['CN', 'DLCOA', 'ADBMS', 'SE', 'TCS', 'PCE-2'];
const lab_subjects = ['L-CN', 'L-DLCOA', 'L-SE', 'L-PCE-2'];
const teachers = ['Priti Rumao', 'Dr.Dinesh Patil', 'Smita Jawale', 'Soniya Khatu', 'Swapna Borde', 'Dr.Aashi Cynth'];

// Faculty data
const faculties = [
    { faculty_name: "Dr.Dinesh Patil", teaching_subjects: ["OS", "SE", 'L-SE'] },
    { faculty_name: "Dr.Priti Rumao", teaching_subjects: ["TCS", "CP", 'L-CN'] },
    { faculty_name: "Dr.Swapna Borde", teaching_subjects: ["DLCOA", "AOA", 'L-DLCOA'] },
    { faculty_name: "Dr.Sonia Khatu", teaching_subjects: ["MP", "CG", "CN", 'L-CN'] },
    { faculty_name: "Dr.Smita Jawale", teaching_subjects: ["DBMS", "ADBMS"] },
    { faculty_name: "Dr.Aashi Cynth", teaching_subjects: ["PCE-2", 'L-PCE-2'] }
];

// Mapping subjects to teachers
const subjectToFacultyMap = {};
faculties.forEach(faculty => {
    faculty.teaching_subjects.forEach(subject => {
        subjectToFacultyMap[subject] = faculty.faculty_name;
    });
});

// Day and period setup
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const rows = daysOfWeek.length;
const columns = 9; // 9 periods: 8 for subjects and 1 for break
const matrix = [];

// Subject assignment count
const subjectCount = {};

// Initialize counts for all subjects
[...subjects, ...lab_subjects].forEach(subject => {
    subjectCount[subject] = 0;
});

let assignedLabSubjects = []; // To track which lab subjects have been assigned

for (let i = 0; i < rows; i++) {
    const row = [];
    const shuffledSubjects = [...subjects];
    shuffleArray(shuffledSubjects);

    let subjectIndex = 0;
    const rowUsedSubjects = new Set();
    const availableSlots = [0, 1, 3, 4, 6, 7, 8]; // Exclude the break slot (2 and 5)

    // Assign a different lab subject for each day
    let labSubjectForDay;
    if (assignedLabSubjects.length < lab_subjects.length) {
        do {
            labSubjectForDay = lab_subjects[Math.floor(Math.random() * lab_subjects.length)];
        } while (assignedLabSubjects.includes(labSubjectForDay) || subjectCount[labSubjectForDay] >= 3);

        assignedLabSubjects.push(labSubjectForDay);
    } else {
        // Once all lab subjects are assigned, keep using them cyclically
        labSubjectForDay = lab_subjects[i % lab_subjects.length];
    }

    // Try to place the lab subject in consecutive periods
    let labPlaced = false;
    for (let j = 0; j < availableSlots.length - 1; j++) {
        const firstSlot = availableSlots[j];
        if (availableSlots.includes(firstSlot + 1) && !labPlaced) {
            row[firstSlot] = [labSubjectForDay, subjectToFacultyMap[labSubjectForDay]];
            row[firstSlot + 1] = [labSubjectForDay, subjectToFacultyMap[labSubjectForDay]];
            rowUsedSubjects.add(labSubjectForDay);
            subjectCount[labSubjectForDay] += 2;
            labPlaced = true;
            break;
        }
    }

    // Assign the remaining subjects to the row
    for (let j = 0; j < columns; j++) {
        if (j === 2 || j === 5) {
            // Empty slots for breaks (skip period 2 and 5)
            row.push([null, null]);
        } else {
            // If the slot is empty, assign a non-lab subject
            if (!row[j]) {
                let subject;
                let attempts = 0;
                do {
                    subject = shuffledSubjects[subjectIndex % shuffledSubjects.length];
                    subjectIndex++;
                    attempts++;
                    if (attempts > 50) {
                        console.warn('Max attempts reached for subject assignment, skipping this subject.');
                        break; // Prevent infinite loop
                    }
                } while (
                    rowUsedSubjects.has(subject) ||
                    lab_subjects.includes(subject) ||
                    subjectCount[subject] >= 3
                );

                if (subject && subjectCount[subject] < 3) {
                    row.push([subject, subjectToFacultyMap[subject]]);
                    rowUsedSubjects.add(subject);
                    subjectCount[subject]++;
                } else {
                    row.push([null, null]); // If no valid subject, leave blank
                }
            }
        }
    }

    matrix.push(row);
}

// Function to generate the timetable table
const timetableBody = document.querySelector('#timetable tbody');
matrix.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');

    // Day column
    const dayCell = document.createElement('td');
    dayCell.textContent = daysOfWeek[rowIndex];
    tr.appendChild(dayCell);

    let colIndex = 0;
    while (colIndex < row.length) {
        const [currentSubject, currentTeacher] = row[colIndex];

        if (currentSubject === null) {
            // Handle empty cells (breaks)
            const emptyCell = document.createElement('td');
            emptyCell.classList.add('empty-cell');
            tr.appendChild(emptyCell);
            colIndex++;
            continue;
        }

        // Determine the span for consecutive same-subject cells
        let colspan = 1;
        while (
            colIndex + colspan < row.length &&
            row[colIndex + colspan][0] === currentSubject &&
            row[colIndex + colspan][1] === currentTeacher
        ) {
            colspan++;
        }

        // Create a cell for the current subject
        const td = document.createElement('td');
        if (colspan > 1) {
            td.setAttribute('colspan', colspan);
        }

        const subjectCell = document.createElement('div');
        subjectCell.classList.add('subject-cell');

        const subjectName = document.createElement('div');
        subjectName.classList.add('subject-name');
        subjectName.textContent = currentSubject;

        const teacherName = document.createElement('div');
        teacherName.classList.add('teacher-name');
        teacherName.textContent = currentTeacher;

        subjectCell.appendChild(subjectName);
        subjectCell.appendChild(teacherName);
        td.appendChild(subjectCell);

        tr.appendChild(td);

        // Skip over the merged columns
        colIndex += colspan;
    }

    timetableBody.appendChild(tr);
});

// Function to shuffle array
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
}
