import * as d from './tempData.js'
// import * as e from './eventListeners.js'
import * as a from './comms/alternate.js'
import * as t from './comms/talkToDatabase.js'

let globalBookData;

if (true) {
    a.initializeFirebase()
        .then(() => {

            // Runs after initializeFirebase is complete
            t.getStarted();
            // t.writeDB(d.getData());

            // t.readAssignmentDB(loadPage);
            // t.readDB(getRandomBookAssignments);
            // t.readDB(reset);
            t.readDB(loadPage);
            // loadPage(d.getSelection());

        })
        .catch((error) => {
            console.error("Error initializing Firebase:", error);
        });

} else {
    // loadPage(d.getData());
    loadPage(d.getSelection());
}

function reset() {
    console.log('reset');
    globalBookData['Chinasa'] = [''];
    t.writeDB(globalBookData);
}

function valid(assignments) {
    console.log(27);
    let number = 0;
    for (let [name, selection] of Object.entries(assignments)) {
        if (globalBookData[name].includes(selection)) {
            return false;
        }
        // if (selection.includes('The Power of Now')) {
        //     const valueToRemove = 'The Power of Now';

        //     const index = selection.indexOf(valueToRemove);
        //     if (index !== -1) {
        //         selection.splice(index, 1);
        //     }
        //     number++;
        // }
        // if (name.includes('Chinue', 'Thandiwe')) {
        //     selection.push('The Lies You Wrote');
        // }
        // if (name.includes('Kareem')) {
        //     selection.push('Unwind');
        // }
    }
    return true;
}

function loadPage(userData) {
    /* 
        NEXT:
        adding the upcoming element, maybe some reoccurring features
    */

    if (typeof userData === 'string') {
        userData = JSON.parse(userData);
    }

    globalBookData = userData;
    // console.log("globalBookData"); console.log(globalBookData);
    // console.log('Honey and Spice' == globalBookData['Chinasa']);
    // globalBookData.assignments = d.getSelection();
    // t.writeDB(globalBookData);
    // analysis();
    // reset();
    // return;
    // t.writeDBHistory(globalBookData);
    // console.log(JSON.stringify(globalBookData.assignments, null, 2));
    // console.log(globalBookData);
    // return;

    let allSelections = true;
    for (let [name, selection] of Object.entries(globalBookData)) {
        if (selection[0] == '') {
            allSelections = false;
            break;
        }
    }
    // delete globalBookData.assignments;
    if (allSelections) {
        let assignments;
        if (!('assignments' in globalBookData)) {
            assignments = getRandomBookAssignments(globalBookData);
            while (!valid(assignments)) {
                assignments = getRandomBookAssignments(globalBookData);
            }
            console.log("new assignments");
            console.log(JSON.stringify(globalBookData.assignments, null, 2));
            t.writeDB(globalBookData);
        } else {
            assignments = globalBookData.assignments;
        }

        let colors = 'red orange yellow green blue purple pink burntorange gold darkgreen'.split(' ');

        let i = 0;
        document.querySelector(`.page .name-area`).innerHTML = '';
        for (let [name, book] of Object.entries(assignments)) {
            document.querySelector(`.page .name-area`).insertAdjacentHTML('beforeend',
                `<button class="name tag ${colors[i]}">${name}</button>`
            );
            document.querySelector(`.page .book-area`).insertAdjacentHTML('beforeend',
                `<button class="name tag ${colors[i]}">${book}</button>`
            );
            i++;
        }
        // analysis();

    } else {
        displayNameArea(globalBookData);
        displayBookArea();
        submitEventListener();
    }
}

function displayNameArea() {
    let namesString = ``;
    for (let [name, selection] of Object.entries(globalBookData)) {
        // for (let [name, selection] of Object.entries(globalBookData)) {
        if (selection[0] == '') {
            namesString += `<button class="name tag">${name}</button>`;
        }
    }

    document.querySelector(`.page .name-area`).insertAdjacentHTML('beforeend', namesString);

    for (let nameTag of document.querySelectorAll(`.name`)) {
        nameTag.addEventListener('click', function () {
            // only allows one category to be selected at a time
            for (let element of document.querySelectorAll(".name-selected")) {
                if (nameTag != element)
                    element.classList.remove('name-selected');
            }
            // de/select current category
            nameTag.classList.toggle('name-selected');
        });
    }
}

function displayBookArea() {
    let booksString = ``;
    for (let title of d.getBookTitles()) {
        booksString += `<button class="book tag">${title}</button>`;
    }

    document.querySelector(`.page .book-area`).insertAdjacentHTML('beforeend', booksString);

    for (let bookTag of document.querySelectorAll(`.book`)) {
        bookTag.addEventListener('click', function () {
            bookTag.classList.toggle('book-selected');
        });
    }
}

function submitEventListener() {
    document.querySelector(`.submit`).addEventListener('click', function () {
        let nameTag = document.querySelector(`.name-selected`);
        nameTag.classList.toggle('submitted');
        let name = nameTag.innerText;
        let books = document.querySelectorAll(`.book-selected`);
        let bookTitles = [];
        for (let book of books) {
            bookTitles.push(book.innerText);
            book.classList.toggle('submitted');
        }

        globalBookData[name] = bookTitles;
        // console.log("globalBookData"); console.log(globalBookData);

        t.writeDB(globalBookData);
    });
}


function getRandomBookAssignments() {
    const allBooks = d.getBookTitles();
    const peopleSelections = globalBookData;
    // const peopleSelections = d.getSelection();

    // Create a deep copy of all books for random assignment
    let availableBooks = [...allBooks];

    // Object to store the final assignments
    const assignments = {};

    // Shuffle the available books array to introduce randomness
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffle(availableBooks);

    for (const person in peopleSelections) {
        const readBooks = new Set(peopleSelections[person]);

        // Find a book they haven't read yet
        const unreadBookIndex = availableBooks.findIndex(book => !readBooks.has(book));

        // If a book is found, assign it and remove it from available books
        if (unreadBookIndex !== -1) {
            assignments[person] = availableBooks[unreadBookIndex];
            availableBooks.splice(unreadBookIndex, 1);
        }
    }

    // Check if every person has been assigned a book
    for (const person in peopleSelections) {
        if (!assignments[person] && availableBooks.length > 0) {
            assignments[person] = availableBooks.pop();
        }
    }

    globalBookData.assignments = assignments;

    // console.log(JSON.stringify(assignments, null, 2));
    return assignments;
}

