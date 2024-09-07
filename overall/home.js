import { getData } from './tempData.js'
import {
    createPillar,
    createList
} from './component.js'


loadPage();
function loadPage() {
    for (let [pillarName, pillarData] of Object.entries(getData())) {
        let pillarElement = createPillar(pillarName);
        console.log(pillarElement);
        for (let [listName, listData] of Object.entries(pillarData.lists)) {
            let listElement = createList(pillarElement, listName);
        }
    }
}