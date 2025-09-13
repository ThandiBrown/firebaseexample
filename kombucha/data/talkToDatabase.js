
import { getDatabase, set, ref, get, child, update, remove }
    from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

let folderName = "kombucha"
const db = getDatabase();

function writeDB(subfolder, value) {
    console.log("write");
    console.log(folderName + subfolder);
    let divider = "/";
    set(ref(db, folderName + divider + subfolder), value)
        .then(() => {
            // alert("data stored successfully");
        })
        .catch((error) => {
            alert('unsuccessful, error ' + error);
        })
        ;
}

function readDB(subfolder, method, ...args) {
    // console.log("subfolder:" + JSON.stringify(subfolder));
    let divider = "/";
    if (subfolder == "") {
        divider = "";
    }

    const dbref = ref(db);

    console.log("read");

    return get(child(dbref, folderName + divider + subfolder))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // alert('data found');
                if (subfolder == "") {
                    let exerciseInformationObj = snapshot.val();
                    method([exerciseInformationObj, ...args]);
                } else {
                    let taskInformation = snapshot.val();
                    taskInformation = JSON.parse(taskInformation.info);
                    method([taskInformation, ...args]);
                }

            } else {
                method([{}, ...args]);

                alert('No data found');
                // let good = {
                //     "info":JSON.stringify({})
                // }
                // writeDB(subfolder, good);
            }
        })
        .catch((error) => {
            alert('unsuccessful, error ' + error);
        });

}


export {
    writeDB,
    readDB
}