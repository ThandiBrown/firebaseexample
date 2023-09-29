
import { getDatabase, set, ref, get, child, update, remove} 
from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

const db = getDatabase();

function writeDB(folder, value) {
    console.log("write");

    set(ref(db, folder), value)
    .then(() => {
        alert("data stored successfully");
    })
    .catch((error) => {
        alert('unsuccessful, error ' + error);
    })
    ;
}

function readDB(folder) {
    console.log("read");
    const dbref = ref(db);
    let base;

    return get(child(dbref, folder))
    .then((snapshot) => {
        if (snapshot.exists()) {
            base = snapshot.val();
            return base
        } else {
            alert('No data found');
        }
    })
    .catch((error) => {
        alert('unsuccessful, error ' + error);
    });
    
}

function updateDB(folder, value) {
    console.log("update");

    update(ref(db, folder), value)
    .then(() => {
        alert("data updated successfully");
    })
    .catch((error) => {
        alert('unsuccessful, error ' + error);
    })
    ;
}

function deleteDB(folder) {
    console.log("update");

    remove(ref(db, folder))
    .then(() => {
        alert("data removed successfully");
    })
    .catch((error) => {
        alert('unsuccessful, error ' + error);
    })
    ;
}

export {
    writeDB,
    readDB
}