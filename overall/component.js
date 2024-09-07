import {
    getClassName,
    printIfTrue, appendAndRetrieve, append
} from './component_helper.js';
import * as _ from './data.js';

function createPillar(title) {

    let pillarString = `
        Will<div class="flexible pillar ${getClassName(title)}">
            <h1 class="boxTitle">${title}</h1>
            <div class="flexible boxMain">
                <div class="flexible list-area"></div>
                <div class="flexible submission-area"></div>
            </div>
        </div>
        `
    return appendAndRetrieve(_.getPage(), pillarString);
}

function createList(pillar, listTitle) {
    let listString = `
        <div class="flexible wrapper ${getClassName(listTitle)}">
            <div class="list scrolling">
                <div class="list-title">${listTitle}</div>
                <div class="list-item-area">
                </div>
            </div>
            <div class="flexible list-tag-area"></div>
        </div>
    `;
    return appendAndRetrieve(_.getListArea(pillar), listString);
}







export {
    createPillar,
    createList
}