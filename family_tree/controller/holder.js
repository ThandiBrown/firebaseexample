function executeAssignment() {
    let parentOf = [
        'a, b',
        'a, c',
        'a, d',
        'a, e',
        'b, f',
        'b, g',
        'c, h',
        'c, i',
        'd, j',
        'd, k',
        'e, l',
        'e, m',
        'g, n',
        'j, o',
        'k, p',
        'l, q',
    ];

    let familyTree = {};
    for (let relationship of parentOf) {
        let [parent, child] = relationship.split(', ');

        if (parent in familyTree && !(child in familyTree[parent].children)) {
            familyTree[parent].children.push(child);
        } else {
            familyTree[parent] = {
                parents: [],
                children: [child]
            };
        }

        if (child in familyTree && !(parent in familyTree[parent].parents)) {
            familyTree[child].parents.push(parent);
        } else {
            familyTree[child] = {
                parents: [parent],
                children: []
            };
        }
    }

    console.log(familyTree);
}



import { readDB, writeDB } from './data/talkToDatabase.js'




// function loadingSettings() {

//     // writeDB({'info':JSON.stringify({})});
//     readDB("", loadingPage);
// }

// function loadingPage(response) {
//     console.log("response")
//     console.log(response[0])

// }
