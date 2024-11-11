import * as d from './tempData.js'
// import * as e from './eventListeners.js'
import * as a from './comms/alternate.js'
import * as t from './comms/talkToDatabase.js'

let bookData;

if (true) {
    a.initializeFirebase()
        .then(() => {

            // console.log('We Made It');
            // Runs after initializeFirebase is complete
            t.getStarted();
            // t.writeDB(d.getData());

            t.readDB(loadPage);
            // t.readDB(assignBooks);
            // t.readDB(reset);
            // loadPage('', d.getData());


        })
        .catch((error) => {
            console.error("Error initializing Firebase:", error);
        });

}

function reset(bookData) {
    bookData['Henry'] = [''];
    t.writeDB(bookData);
}

function loadPage(userData) {
    /* 
        NEXT:
        adding the upcoming element, maybe some reoccurring features
    */

    if (typeof userData === 'string') {
        userData = JSON.parse(userData);
    }

    // console.log("userData"); console.log(JSON.stringify(userData, null, 2));
    bookData = userData;
    displayNameArea(bookData);
    displayBookArea();
    submitEventListener();
}

function displayNameArea(bookData) {
    let namesString = ``;
    for (let [name, selection] of Object.entries(bookData)) {
        // for (let [name, selection] of Object.entries(bookData)) {
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

        bookData[name] = bookTitles;
        // console.log("bookData"); console.log(bookData);

        t.writeDB(bookData);
    });
}

// Backtracking function to find a valid assignment
function assignBooks(bookData) {
    // console.log("bookData"); console.log(bookData);
    const books = d.getBookTitles();
    // const selections = bookData;
    const selections = d.getSelection();
    const people = Object.keys(selections);

    const assignments = {}; // Stores the final book assignments for each person
    const assignedBooks = new Set(); // Tracks books that have already been assigned

    function backtrack(index) {
        if (index === people.length) {
            // All people have been assigned a book
            return true;
        }

        const person = people[index];
        const alreadyRead = new Set(selections[person]);

        for (let book of books) {
            if (!alreadyRead.has(book) && !assignedBooks.has(book)) {
                // Assign this book to the current person
                assignments[person] = book;
                assignedBooks.add(book);

                // Recursively assign the next person
                if (backtrack(index + 1)) {
                    return true;
                }

                // Backtrack: remove the assignment
                delete assignments[person];
                assignedBooks.delete(book);
            }
        }

        return false; // No valid assignment found for this person
    }

    let response;

    if (backtrack(0)) {
        // response = assignments;
        response = 'Valid Assignment Found';
    } else {
        response = "No valid assignment possible";
    }

    // console.log(JSON.stringify(response, null, 2));
    console.log(response);
}
