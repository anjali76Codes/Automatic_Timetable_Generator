const subjects = ['CN', 'DLCOA', 'ADBMS', 'SE', 'TCS', 'PCE-2'];
const labSubjects = ['L-CN', 'L-DLCOA', 'L-SE', 'L-PCE-2', 'Mini Project'];
const teachers = ['Priti Rumao', 'Dr.Dinesh Patil', 'Smita Jawale', 'Soniya Khatu', 'Swapna Borde', 'Dr.Aashi Cynth'];

const lec_rooms = [215, 216, 218, 219, 313, 314, 417, 418];
const lab_rooms = [1, 2, 3, 4, 5, 6];

const divisions = ['TE1', 'TE2', 'TE3']; // Divisions
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
const columns = 9; // Including breaks

// Function to shuffle the array
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Function to assign rooms (either lecture or lab rooms)
function assignRoom(isLab) {
    if (isLab) {
        return lab_rooms[Math.floor(Math.random() * lab_rooms.length)];
    } else {
        return lec_rooms[Math.floor(Math.random() * lec_rooms.length)];
    }
}

// Function to generate a timetable for a division
function generateTimetableForDivision(division) {
    const matrix = [];
    const subjectCounts = {}; // Track the count of each subject
    subjects.forEach(subject => (subjectCounts[subject] = 0));

    for (let i = 0; i < daysOfWeek.length; i++) {
        const row = new Array(columns).fill([null, null, null]);
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

        // Assign lab subject to consecutive slots
        const labRoom = assignRoom(true);
        row[consecutiveSlots[0]] = [labSubject, labTeacher, labRoom];
        row[consecutiveSlots[1]] = [labSubject, labTeacher, labRoom];
        rowUsedSubjects.add(labSubject);

        // Fill the remaining slots sequentially
        for (let j = 0; j < columns; j++) {
            if (j === 2 || j === 5 || row[j][0] !== null) {
                continue; // Skip breaks and already filled slots
            }

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
                subjectCounts[subject] >= 3
            );

            if (subject && subjectCounts[subject] < 3) {
                const room = assignRoom(false);
                row[j] = [subject, subjectToFacultyMap[subject], room];
                rowUsedSubjects.add(subject);
                subjectCounts[subject]++;
            } else {
                // Fill remaining slots with empty if no subject is available
                for (let k = j; k < columns; k++) {
                    if (k !== 2 && k !== 5) {
                        row[k] = [null, null, null];
                    }
                }
                break;
            }
        }

        matrix.push(row);
    }

    return matrix;
}

// Function to render the timetable in the HTML container
function renderTimetable(division, matrix) {
    const timetableContainer = document.getElementById('timetable-container');
    if (!timetableContainer) {
        console.error('Container not found!');
        return;
    }

    const timetableBody = document.createElement('table');
    timetableBody.classList.add('timetable');

    const timetableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Day/Time</th>
        <th>9:00 AM - 10:00 AM</th>
        <th>10:00 AM - 11:00 AM</th>
        <th>11:00 AM - 11:15 AM</th>
        <th>11:15 AM - 12:15 PM</th>
        <th>12:15 PM - 1:15 PM</th>
        <th>1:15 PM - 2:00 PM</th>
        <th>2:00 PM - 3:00 PM</th>
        <th>3:00 PM - 4:00 PM</th>
        <th>4:00 PM - 5:00 PM</th>
    `;
    timetableHeader.appendChild(headerRow);
    timetableBody.appendChild(timetableHeader);

    matrix.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');

        // Create the first cell for the day
        const dayCell = document.createElement('td');
        dayCell.textContent = daysOfWeek[rowIndex];
        tr.appendChild(dayCell);

        let colIndex = 0;
        while (colIndex < row.length) {
            const [currentSubject, currentTeacher, currentRoom] = row[colIndex];

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
                row[colIndex + colspan][1] === currentTeacher &&
                row[colIndex + colspan][2] === currentRoom
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

            const roomNumber = document.createElement('div');
            roomNumber.classList.add('room-number');
            roomNumber.textContent = `Room: ${currentRoom}`;

            subjectCell.appendChild(subjectName);
            subjectCell.appendChild(teacherName);
            subjectCell.appendChild(roomNumber);
            td.appendChild(subjectCell);

            tr.appendChild(td);

            // Skip over the merged columns
            colIndex += colspan;
        }

        timetableBody.appendChild(tr);
    });

    const divisionHeading = document.createElement('h2');
    divisionHeading.textContent = `${division} Timetable`;
    timetableContainer.appendChild(divisionHeading);
    timetableContainer.appendChild(timetableBody);
}

// Function to generate and render timetables for all divisions
function generateAndRenderAllTimetables() {
    // Clear existing content
    const timetableContainer = document.getElementById('timetable-container');
    if (timetableContainer) {
        timetableContainer.innerHTML = ''; // Clear any previously rendered
// content in the container
    }

    // Generate timetable for each division and render it
    divisions.forEach(division => {
        const timetableMatrix = generateTimetableForDivision(division);
        renderTimetable(division, timetableMatrix);
    });
}

// Trigger timetable generation on page load or button click
document.addEventListener('DOMContentLoaded', () => {
    generateAndRenderAllTimetables();
});
