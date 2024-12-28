// Adjusted timetable generation logic to ensure unique subjects and handle two-hour subjects
const subjects = ['CN', 'DLCOA', 'ADBMS', 'SE', 'TCS', 'PCE-2'];
const teachers = ['Priti Rumao', 'Dr.Dinesh Patil', 'Smita Jawale', 'Soniya Khatu', 'Swapna Borde', 'Dr.Aashi Cynth'];

const faculties = [
    { faculty_name: "Dr.Dinesh Patil", teaching_subjects: ["OS", "SE"] },
    { faculty_name: "Dr.Priti Rumao", teaching_subjects: ["TCS", "CP"] },
    { faculty_name: "Dr.Swapna Borde", teaching_subjects: ["DLCOA", "AOA"] },
    { faculty_name: "Dr.Sonia Khatu", teaching_subjects: ["MP", "CG", "CN"] },
    { faculty_name: "Dr.Smita Jawale", teaching_subjects: ["DBMS", "ADBMS"] },
    { faculty_name: "Dr.Aashi Cynth", teaching_subjects: ["PCE-2"] }
];

const subjectToFacultyMap = {};
faculties.forEach(faculty => {
    faculty.teaching_subjects.forEach(subject => {
        subjectToFacultyMap[subject] = faculty.faculty_name;
    });
});

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const rows = daysOfWeek.length;
const columns = 9;
const matrix = [];

for (let i = 0; i < rows; i++) {
    const row = [];
    const shuffledSubjects = [...subjects];
    shuffleArray(shuffledSubjects);

    let subjectIndex = 0;
    const rowUsedSubjects = new Set();

    const subjectToRepeat = shuffledSubjects[Math.floor(Math.random() * shuffledSubjects.length)];
    let repeatedSubjectPlaced = false;

    const availableSlots = [0, 1, 3, 4, 6, 7, 8];
    let consecutiveSlots = [];

    while (consecutiveSlots.length === 0) {
        const randomSlotIndex = Math.floor(Math.random() * availableSlots.length);
        const firstSlot = availableSlots[randomSlotIndex];

        if (availableSlots.includes(firstSlot + 1)) {
            consecutiveSlots = [firstSlot, firstSlot + 1];
        } else {
            availableSlots.splice(randomSlotIndex, 1);
        }
    }

    for (let j = 0; j < columns; j++) {
        if (j === 2 || j === 5) {
            row.push([null, null]);
        } else {
            if (!repeatedSubjectPlaced && consecutiveSlots.includes(j)) {
                row.push([subjectToRepeat, subjectToFacultyMap[subjectToRepeat]]);
                if (consecutiveSlots[0] === j) {
                    j++; // Skip the next slot for the repeated subject
                    row.push([subjectToRepeat, subjectToFacultyMap[subjectToRepeat]]);
                }
                rowUsedSubjects.add(subjectToRepeat);
                repeatedSubjectPlaced = true;
            } else {
                let subject;
                do {
                    subject = shuffledSubjects[subjectIndex % shuffledSubjects.length];
                    subjectIndex++;
                } while (rowUsedSubjects.has(subject) || subject === subjectToRepeat);

                row.push([subject, subjectToFacultyMap[subject]]);
                rowUsedSubjects.add(subject);
            }
        }
    }

    matrix.push(row);
}

const timetableBody = document.querySelector('#timetable tbody');
matrix.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');

    // Create the first cell for the day
    const dayCell = document.createElement('td');
    dayCell.textContent = daysOfWeek[rowIndex];
    tr.appendChild(dayCell);

    let colIndex = 0;
    while (colIndex < row.length) {
        const [currentSubject, currentTeacher] = row[colIndex];

        if (currentSubject === null) {
            // Handle empty cells
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


function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
