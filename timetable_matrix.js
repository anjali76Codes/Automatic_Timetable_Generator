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

// Days of the week for the timetable
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// Timetable generation logic
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

    // We need to track if we have placed the repeated subject in consecutive cells
    let repeatedSubjectPlaced = false;

    // Valid slots excluding the empty slots at indices 2 and 5
    const availableSlots = [0, 1, 3, 4, 6, 7, 8]; // We exclude 2 and 5
    let consecutiveSlots = [];

    // Select two consecutive slots for the repeated subject
    while (consecutiveSlots.length === 0) {
        const randomSlotIndex = Math.floor(Math.random() * availableSlots.length);
        const firstSlot = availableSlots[randomSlotIndex];

        if (availableSlots.includes(firstSlot + 1)) {
            consecutiveSlots = [firstSlot, firstSlot + 1];
        } else {
            availableSlots.splice(randomSlotIndex, 1); // Remove invalid slot options
        }
    }

    // Generate the timetable for this day
    for (let j = 0; j < columns; j++) {
        if (j === 2 || j === 5) {
            row.push([null, null]); // Empty cells at index 2 and 5 (11:00 AM - 11:15 AM and 12:15 PM - 1:15 PM)
        } else {
            let subject;
            if (rowUsedSubjects.size < 7) {
                if (!repeatedSubjectPlaced && consecutiveSlots.includes(j)) {
                    // Place the repeated subject in two consecutive slots
                    row.push([subjectToRepeat, subjectToFacultyMap[subjectToRepeat]]);
                    row.push([subjectToRepeat, subjectToFacultyMap[subjectToRepeat]]);
                    rowUsedSubjects.add(subjectToRepeat);
                    repeatedSubjectPlaced = true;
                    j++; // Skip the next index since the repeated subject occupies two slots
                } else {
                    // Otherwise pick the next available subject
                    subject = shuffledSubjects[subjectIndex % shuffledSubjects.length];
                    row.push([subject, subjectToFacultyMap[subject]]);
                    rowUsedSubjects.add(subject);
                    subjectIndex++;
                }
            }
        }
    }

    matrix.push(row);
}

// Render timetable into HTML
const timetableBody = document.querySelector('#timetable tbody');

matrix.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');

    // Add Day column (e.g., Monday, Tuesday, etc.)
    const dayCell = document.createElement('td');
    dayCell.textContent = daysOfWeek[rowIndex];
    tr.appendChild(dayCell);

    row.forEach(([subject, teacher]) => {
        const td = document.createElement('td');
        if (subject) {
            const subjectCell = document.createElement('div');
            subjectCell.classList.add('subject-cell');

            const subjectName = document.createElement('div');
            subjectName.classList.add('subject-name');
            subjectName.textContent = subject;

            const teacherName = document.createElement('div');
            teacherName.classList.add('teacher-name');
            teacherName.textContent = teacher;

            subjectCell.appendChild(subjectName);
            subjectCell.appendChild(teacherName);

            td.appendChild(subjectCell);
        } else {
            td.classList.add('empty-cell');
        }

        tr.appendChild(td);
    });

    timetableBody.appendChild(tr);
});

// Shuffle function for randomizing subjects
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
