const subjects = ['CN', 'DLCOA', 'ADBMS', 'SE', 'TCS', 'PCE-2'];
const labSubjects = ['L-CN', 'L-DLCOA', 'L-SE', 'L-PCE-2', 'Mini Project'];
const teachers = ['Priti Rumao', 'Dr.Dinesh Patil', 'Smita Jawale', 'Soniya Khatu', 'Swapna Borde', 'Dr.Aashi Cynth'];

const faculties = [
    { faculty_name: "Dr.Dinesh Patil", teaching_subjects: ["OS", "SE", "L-SE"] },
    { faculty_name: "Dr.Priti Rumao", teaching_subjects: ["TCS", "CP", "L-CN"] },
    { faculty_name: "Dr.Swapna Borde", teaching_subjects: ["DLCOA", "AOA", "L-DLCOA"] },
    { faculty_name: "Dr.Sonia Khatu", teaching_subjects: ["MP", "CG", "CN", "L-CN"] },
    { faculty_name: "Dr.Smita Jawale", teaching_subjects: ["DBMS", "ADBMS"] },
    { faculty_name: "Dr.Aashi Cynth", teaching_subjects: ["PCE-2", "L-PCE-2"] },
    { faculty_name: "External", teaching_subjects: ["Mini Project"] }
];

const subjectToFacultyMap = {};
faculties.forEach(faculty => {
    faculty.teaching_subjects.forEach(subject => {
        subjectToFacultyMap[subject] = faculty.faculty_name;
    });
});

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const rows = daysOfWeek.length;
const columns = 9; // Including breaks
const matrix = [];

const subjectCounts = {}; // Track the count of each subject
subjects.forEach(subject => (subjectCounts[subject] = 0));

for (let i = 0; i < rows; i++) {
    const row = [];
    const shuffledSubjects = [...subjects];
    shuffleArray(shuffledSubjects);

    let subjectIndex = 0;
    const rowUsedSubjects = new Set();

    // Assign lab subject for the day
    const labSubject = labSubjects[i % labSubjects.length];
    const labTeacher = subjectToFacultyMap[labSubject];

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

        if (availableSlots.length === 0) {
            throw new Error("No consecutive slots available for lab subjects.");
        }
    }

    for (let j = 0; j < columns; j++) {
        if (j === 2 || j === 5) {
            row.push([null, null]); // Breaks
        } else if (consecutiveSlots.includes(j)) {
            // Assign lab subject to consecutive slots
            row.push([labSubject, labTeacher]);
            if (consecutiveSlots[0] === j) {
                j++; // Skip the next slot
                row.push([labSubject, labTeacher]);
            }
            rowUsedSubjects.add(labSubject);
        } else {
            // Assign a unique non-lab subject
            let subject;
            let attempts = 0;
            do {
                subject = shuffledSubjects[subjectIndex % shuffledSubjects.length];
                subjectIndex++;
                attempts++;
                if (attempts > subjects.length) {
                    break; // Avoid infinite loop if no valid subject is found
                }
            } while (
                rowUsedSubjects.has(subject) || 
                subject === labSubject || 
                subjectCounts[subject] >= 3
            );

            if (subject && subjectCounts[subject] < 3) {
                row.push([subject, subjectToFacultyMap[subject]]);
                rowUsedSubjects.add(subject);
                subjectCounts[subject]++;
            } else {
                row.push([null, null]); // If no valid subject is found, leave cell empty
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
