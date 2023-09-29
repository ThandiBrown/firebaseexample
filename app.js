import * as db from './talkToDatabase.js'

const folder = "users/"
    
function getName() {
    return document.getElementById("name").value;
}

function getEmail() {
    return document.getElementById("email").value;
}

function sendToDatabase() {
    let name = getName();
    let email = getEmail();
    let value = {
        'name': name,
        'email': email,
    };
    let folderName = folder + name;
    db.writeDB(folderName, value);
}

function retrieveFromDatabase() {
    let folderName = folder + getName();
    db.readDB(folderName).then(obj => {
        console.log(55);
        console.log(obj.name);
    });

}



document.getElementById("btn").addEventListener('click', () => sendToDatabase());
document.getElementById("btn2").addEventListener
('click', () => retrieveFromDatabase());