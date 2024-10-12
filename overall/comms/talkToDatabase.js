
import { getDatabase, set, ref, get, child, update, remove }
    from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

let folderName = "lifeMgmtInfo";
let db;


function getStarted() {
    db = getDatabase();
}

function writeDB(value) {
    console.log("value"); console.log(value);

    // total2 = ref(db)
    // console.log("total2");console.log(total2);
    let total = ref(db, folderName)

    console.log("total"); console.log(total);
    set(total, JSON.stringify(value))
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

        // Get the data
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            method(
                true,
                JSON.parse(snapshot.val()),
                [...args]
            );
            // return JSON.parse(snapshot.val()); // Access the data
        } else {
            method(false, {}, [...args]);
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

async function readDBHistory(method) {
    try {
        // Reference to a specific path (e.g., 'users/userId123')

        // Get the data
        const userData = await get(ref(db, folderName));
        console.log("userData");console.log(userData);
        const dataHistory = await get(ref(db, 'lifeMgmtHistory'));
        console.log("dataHistory");console.log(dataHistory);



        if (dataHistory.exists() && userData.exists()) {
            method(JSON.parse(dataHistory.val()), userData.val());
            // method(snapshot.val());
            // return JSON.parse(snapshot.val()); // Access the data
        } else {
            // No data available at the path
            console.log('No history available');
            alert('no history to retrieve')
            return null;
        }
    } catch (error) {
        // Handle any errors
        alert('Error fetching history')
        console.error('Error fetching history:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

function writeDBHistory(value) {
    set(ref(db, 'lifeMgmtHistory'), JSON.stringify(value))
        .then(() => {
            // alert("data stored successfully");
            console.log("data stored successfully");
        })
        .catch((error) => {
            alert('unsuccessful, error ' + error);
        });
}



export {
    getStarted,
    writeDB,
    readDB,
    readDBHistory,
    writeDBHistory
}