
import { getDatabase, set, ref, get, child, update, remove }
    from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

let folderName = "lifeMgmtInfo"
const db = getDatabase();

function writeDB(value) {

    set(ref(db, folderName), JSON.stringify(value))
        .then(() => {
            // alert("data stored successfully");
            console.log("data stored successfully");
        })
        .catch((error) => {
            alert('unsuccessful, error ' + error);
        })
        ;
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
            return null;
        }
    } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}






export {
    writeDB,
    readDB
}