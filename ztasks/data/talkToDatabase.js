
import { getDatabase, set, ref, get, child, update, remove} 
from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

let folderName = "taskInformation"
const db = getDatabase();

function writeDB(value) {
    console.log("write");
    console.log(folderName);
    set(ref(db, folderName), value)
    .then(() => {
        // alert("data stored successfully");
    })
    .catch((error) => {
        alert('unsuccessful, error ' + error);
    })
    ;
}

function readDB(method, ...args) {
    
    const dbref = ref(db);
    
    console.log("read");
    
    return get(child(dbref, folderName))
    .then((snapshot) => {
        if (snapshot.exists()) {
            
            let taskInformation = snapshot.val();
            taskInformation = JSON.parse(taskInformation.info);
            
            // console.log("File data retrieved:\n" + JSON.stringify(taskInformation));
            method([taskInformation, ...args]);
            
        } else {
            alert('No data found');
            let good = {
                "info":JSON.stringify({"break":[["Vacuum downstairs",false],["warm and stretch feet",false]],"todos":[],"shopping":[["Gold Bond",false],["hand soap",false]]})
            }
            updateDB(good);
        }
    })
    .catch((error) => {
        alert('unsuccessful, error ' + error);
    });
    
}

function updateDB(value) {
    
    console.log("update");

    update(ref(db, folderName), value)
    .then(() => {
        alert("data updated successfully");
    })
    .catch((error) => {
        alert('unsuccessful, error ' + error);
    })
    ;
}

function deleteDB() {
    console.log("update");

    remove(ref(db, folderName))
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
    readDB,
    deleteDB,
    updateDB
}