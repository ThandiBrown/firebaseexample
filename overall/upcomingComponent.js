import * as ch from './component_helper.js';
import * as _ from './getThis.js';
import * as d from './dataManager.js';

function createPillar(title, status) {
    let pillarString = `
        <div class="flexible pillar ${ch.getClassName(title)}">
            <h1 class="pillar-title">${title}</h1>
            <div class="flexible pillar-main">
                <div class="flexible noti-area">
                
                </div>
            </div>
        </div>
        `

    d.newPillar(title, status);
    return ch.appendAndRetrieve(_.getPage(), pillarString);
}

function createUpcomingTask(pillar, notiName) {
    let task = `
        <div class="notification flexible">
            <div class="noti-name">${notiName}</div>
            <div class="noti-tag-area flexible"></div>
        </div>
    `;

    // d.newList(_.getPillarName(pillar), listTitle);
    return ch.appendAndRetrieve(_.getNotiArea(pillar), task);
}


function createNotiTag(notification, notis) {
    let tag = '';
    for (let notiName of notis) {
        tag += `
            <div class="noti-tag">${notiName}</div>
        `;
    }

    // d.newList(_.getPillarName(pillar), listTitle);
    return ch.appendAndRetrieve(_.getNotiTagArea(notification), tag);
}

export {
    createPillar,
    createUpcomingTask,
    createNotiTag
}