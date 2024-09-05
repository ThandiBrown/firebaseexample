import {
    getClassName,
    printIfTrue
} from './listBoxes.js'

function getPillar(title, data) {
    console.log("getPillar");
    return `
    <div class="flexible pillar ${getClassName(title)}">
      <h1 class="boxTitle">${title}</h1>
      <div class="flexible boxMain">
        ${data ? getContent(data) : ''}
      </div>
    </div>
    `
}

function getContent(data) {
    console.log("getContent");

    let content = '';
    if (data.calendar)
        content += getCalendarArea(data.calendars);

    if (data.lists)
        content += getLists(data.lists);

    content += getSubmissionArea(Object.keys(data.lists));
    return content
}

function getCalendarArea(calendars) {
    let calendarContent = '';
    for (let calendar of calendars) {
        calendarContent += getCalendar(calendar);
    }
    return `
    <div class="flexible calendar-area">
        ${calendarContent}
    </div>
    `
}

function getLists(lists) {
    console.log("getLists");

    let listContent = '';
    for (let [title, listData] of Object.entries(lists)) {
        listContent += getList(title, listData);
    }
    return `
    <div class="flexible list-boxes">
        ${listContent}
    </div>
    `;

}

function getList(title, tasks, wrapper = false, filters = []) {
    let titleClass = getClassName(title);

    return `
    ${printIfTrue('<div class="flexible wrapper">', wrapper)}
    <div class="list-box ${titleClass} scrolling">
        <div class="title">${title}</div>
        <div class="listBoxMain ${printIfTrue('hidden', wrapper)}">
            ${printIfTrue(
        () => tasks.map(task => getListItem(task.title, getClassName(task.conditional))).join(''),
        wrapper && tasks
    )}
            ${printIfTrue(
        () => tasks.map(task => getListItem(task.title)).join(''),
        !wrapper && tasks
    )}
        </div>
    </div>
    ${printIfTrue(
        () => getSubmissionConditionFilters(filters) + '</div>',
        wrapper)}
    `;
}


function getListItem(task, conditional = null) {
    return `
    <div class="flexible list-item ${printIfTrue('hidden ' + conditional, conditional)}">
        <div class="check"></div>
        <div class="flexible list-value">${task}
        </div>
        <div class="delete-line"></div>
    </div>
    `;
}

function getSubmissionConditionFilters(filters) {
    return `
    <div class="flexible condition-filters">
        ${filters.map(filter => `<div class="flexible bubble">${filter}</div>`).join('')}
    </div>
    `;
}

function getSubmissionTitleFilters(titles) {
    return `
    <div class="flexible list-titles">
        ${titles.map(title => `<div class="flexible bubble">${title}</div>`).join('')}
    </div>
    `;
}

function getSubmissionArea(listTitles = null, filters = null) {
    return `
    <div class="flexible submission-area">
        <div class="list-submission flexible">
          <textarea class="submit-text-area"></textarea>
          <button class="submit-button"></button>
        </div>
        ${printIfTrue(
        () => getSubmissionTitleFilters(listTitles), listTitles
    )}
        ${printIfTrue(
        () => getSubmissionConditionFilters(filters), filters
    )}
    </div>
    `;
}

function getBubble(tagName) {
    return `<div class="flexible bubble">${tagName}</div>`
}

export {
    getPillar,
    getContent,
    getCalendarArea,
    getLists,
    getList,
    getListItem,
    getSubmissionConditionFilters,
    getSubmissionTitleFilters,
    getSubmissionArea,
    getBubble
}