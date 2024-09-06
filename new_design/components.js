import {
    getClassName,
    printIfTrue
} from './component_helper.js'
import { getCalendar } from './calendar.js'

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
    let output = { 'listContent': '', 'tags': [] };

    let content = '';
    if (data.calendars)
        content += getCalendarArea(data.calendars);

    if (data.lists)
        content += getLists(data.lists, output);

    content += getSubmissionArea(Object.keys(data.lists), output.tags);
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

function getLists(lists, output) {
    console.log("getLists");


    for (let [title, listData] of Object.entries(lists)) {
        getList(title, listData, output);
    }
    return `
    <div class="flexible listboxes">
        ${output.listContent}
    </div>
    `;

}


function getList(listTitle, tasks = [], output = {}) {
    // console.log("tasks:" + JSON.stringify(tasks));
    let tags = new Set();
    let listContent = '';
    let titleClass = getClassName(listTitle);
    // get list items
    for (let task of tasks) {
        if (task.tag) {
            tags.add(task.tag);
        }
        listContent += getListItem(task);
    }
    tags = [...tags];

    let hasTags = tags.length > 0;

    let listElement = `<div class="listbox scrolling">
        <div class="title">${listTitle}</div>
        <div class="listbox-main">
            ${listContent}
        </div>
    </div>`;

    listElement = `
    <div class="flexible wrapper ${titleClass}">
        ${listElement}    
        ${printIfTrue(() => getListTagArea(tags), hasTags)}
    </div>
    `;
    if (Object.keys(output).length) {
        output.tags = output.tags.concat(tags);
        output.listContent += listElement;
    }
    
    return listElement;
}

function getListItem(task, isHidden = true) {
    let hiddenValue = printIfTrue('hidden', isHidden)
    let tag = task.tag ? `${hiddenValue} ${getClassName(task.tag)}` : '';

    return `
    <div class="flexible list-item ${tag}">
        <div class="check"></div>
        <div class="flexible list-value">${task.title}
        </div>
        <div class="delete-line"></div>
    </div>
    `;
}

function getListTagArea(filters) {
    // console.log("filters:" + JSON.stringify(filters));
    return `
    <div class="flexible list-tag-area">
        ${filters.map(filter => `<div class="flexible tag">${filter}</div>`).join('')}
    </div>
    `;
}

function getSubmissionTagArea(filters) {
    // console.log("filters:" + JSON.stringify(filters));
    return `
    <div class="flexible submission-tag-area">
        ${filters.map(filter => getTag(filter)).join('')}
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
        () => getSubmissionTitleArea(listTitles), listTitles
    )}
        ${getSubmissionGeneralArea()}
        ${printIfTrue(
        () => getSubmissionTagArea(filters), filters
    )}
    </div>
    `;
}

function getSubmissionTitleArea(titles) {
    return `
    <div class="flexible submission-title-area">
        ${titles.map(title => getTag(title)).join('')}
    </div>
    `;
}

function getSubmissionGeneralArea() {
    let titles = ['New List', 'Delete List'];
    return `
    <div class="flexible submission-general-area">
        ${titles.map(title => getTag(title)).join('')}
    </div>
    `;
}

function getTag(tagName) {
    return `<div class="flexible tag">${tagName}</div>`
}

export {
    getPillar,
    getContent,
    getCalendarArea,
    getLists,
    getList,
    getListItem,
    getSubmissionTagArea,
    getSubmissionTitleArea,
    getSubmissionArea,
    getTag
}