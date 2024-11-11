
import { getDatabase, set, ref, get, child, update, remove }
    from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

let folderName = "bookclub";
let db;


function getStarted() {
    console.log(71);
    db = getDatabase();
    // console.log("db"); console.log(db);
}

function writeDB(value) {

    set(ref(db, folderName), value)
        .then(() => {
            // alert("data stored successfully");
            console.log("data stored successfully");
        })
        .catch((error) => {
            alert('unsuccessful, error ' + error);
        });
}

function writeDBHistory(value) {

    set(ref(db, 'bookclubHistory'), value)
        .then(() => {
            // alert("data stored successfully");
            console.log("data stored successfully");
        })
        .catch((error) => {
            alert('unsuccessful, error ' + error);
        });
}

async function readDB(method, ...args) {
    try {
        // Reference to a specific path (e.g., 'users/userId123')
        const dbRef = ref(db, folderName);
        // const dbRef2 = ref(db, 'bookclubAssignment');

        // Get the data
        const snapshot = await get(dbRef);
        // const snapshot2 = await get(dbRef2);

        if (snapshot.exists()) {
            let data = snapshot.val();
            // data.assignment = snapshot2.val();
            method(
                data,
                [...args]
            );
            // return JSON.parse(snapshot.val()); // Access the data
        } else {
            method({}, [...args]);
            // No data available at the path
            console.log('No data available');
            alert('no data to retrieve')
            return null;
        }
    } catch (error) {
        // Handle any errors
        alert('Error fetching data')
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

async function readAssignmentDB(method, ...args) {
    try {
        // Reference to a specific path (e.g., 'users/userId123')
        const dbRef2 = ref(db, 'bookclubAssignment');

        // Get the data
        const snapshot2 = await get(dbRef2);

        if (snapshot2.exists()) {
            let data = snapshot2.val();
            method(
                data,
                [...args]
            );
            // return JSON.parse(snapshot.val()); // Access the data
        } else {
            method({}, [...args]);
            // No data available at the path
            console.log('No data available');
            alert('no data to retrieve')
            return null;
        }
    } catch (error) {
        // Handle any errors
        alert('Error fetching data')
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}



export {
    getStarted,
    writeDB,
    readDB,
    writeDBHistory,
    readAssignmentDB
}