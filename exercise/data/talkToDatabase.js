
import { getDatabase, set, ref, get, child, update, remove }
    from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

let folderName = "exerciseInformation"
const db = getDatabase();

function writeDB(subfolder, value) {
    // console.log("write");
    // console.log(folderName + subfolder);
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

    // console.log("read");

    return get(child(dbref, folderName + divider + subfolder))
        .then((snapshot) => {
            if (snapshot.exists()) {

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

                // alert('No data found');
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

function runIt() {

    let good, b;
    b = { "date": "09/02/2023", "weekday": "Monday", "exercisesCompleted": ["back_rows", "lat_pulldown", "chest_press", "single_leg_glute_bridges", "chest_stretches", "arm_stretches", "leg_stretches"] }
    good = {
        "info": JSON.stringify(b)
    }
    writeDB(b["date"].replaceAll("/", "_"), good);

    b = { "date": "09/03/2023", "weekday": "Monday", "exercisesCompleted": ["leg_stretches"] }
    good = {
        "info": JSON.stringify(b)
    }
    writeDB(b["date"].replaceAll("/", "_"), good);

    b = { "date": "09/04/2023", "weekday": "Monday", "exercisesCompleted": [] }
    good = {
        "info": JSON.stringify(b)
    }
    writeDB(b["date"].replaceAll("/", "_"), good);

    b = { "date": "09/05/2023", "weekday": "Tuesday", "exercisesCompleted": [] }
    good = {
        "info": JSON.stringify(b)
    }
    writeDB(b["date"].replaceAll("/", "_"), good);

    b = { "date": "09/06/2023", "weekday": "Wednesday", "exercisesCompleted": [] }
    good = {
        "info": JSON.stringify(b)
    }
    writeDB(b["date"].replaceAll("/", "_"), good);

    b = { "date": "09/10/2023", "weekday": "Sunday", "exercisesCompleted": ["back_rows", "front_raise", "lateral_raise", "biceps", "quad_leg_raise"] }
    good = {
        "info": JSON.stringify(b)
    }
    writeDB(b["date"].replaceAll("/", "_"), good);

    b = { "date": "09/13/2023", "weekday": "Wednesday", "exercisesCompleted": ["chest_stretches"] }
    good = {
        "info": JSON.stringify(b)
    }
    writeDB(b["date"].replaceAll("/", "_"), good);

    b = { "date": "09/14/2023", "weekday": "Thursday", "exercisesCompleted": ["straight_leg_raise", "glute_bridges", "single_leg_glute_bridges", "chest_stretches"] }
    good = {
        "info": JSON.stringify(b)
    }
    writeDB(b["date"].replaceAll("/", "_"), good);

    b = { "date": "09/15/2023", "weekday": "Friday", "exercisesCompleted": ["banded_joint_isolation", "soft_tissue_work", "dynamic_arm_movement", "extensors", "flexors"] }
    good = {
        "info": JSON.stringify(b)
    }
    writeDB(b["date"].replaceAll("/", "_"), good);

    b = { "date": "09/16/2023", "weekday": "Saturday", "exercisesCompleted": ["banded_joint_isolation", "dynamic_arm_movement", "itwys", "extensors", "finger_bands"] }
    good = {
        "info": JSON.stringify(b)
    }
    writeDB(b["date"].replaceAll("/", "_"), good);

    b = { "date": "09/20/2023", "weekday": "Wednesday", "exercisesCompleted": [] }
    good = {
        "info": JSON.stringify(b)
    }
    writeDB(b["date"].replaceAll("/", "_"), good);

    b = { "date": "09/26/2023", "weekday": "Tuesday", "exercisesCompleted": ["dynamic_arm_movement", "banded_joint_isolation", "biceps", "external_rotation", "itwys"] }
    good = {
        "info": JSON.stringify(b)
    }
    writeDB(b["date"].replaceAll("/", "_"), good);

    b = { "date": "09/27/2023", "weekday": "Wednesday", "exercisesCompleted": ["dynamic_arm_movement", "itwys", "extensors", "flexors", "finger_bands", "shoulder_shrugs", "shoulder_pinches", "arm_stretches", "leg_stretches"] }
    good = {
        "info": JSON.stringify(b)
    }
    writeDB(b["date"].replaceAll("/", "_"), good);

}


export {
    writeDB,
    readDB
}