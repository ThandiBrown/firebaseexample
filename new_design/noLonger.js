
function taskCategories(category, addListFilters = false) {

    let listBoxes = document.querySelector(".list-boxes");
    let listTitles = document.querySelector(".list-titles");

    let listItems = '';
    const conditionals = new Set();

    // create list Items
    for (let task of upkeepTask) {
        if (category == 'Conditional' && task.conditional) {
            listItems += getConditionalListItem(task.title, task.conditional);
            conditionals.add(task.conditional);
        } else if (category == 'Backlog' && Object.keys(task).length === 1) {
            listItems += getListItem(task.title);
        } else if (category == 'Time Sensitive' && task.tag && task.tag == 'time sensitive') {
            listItems += getListItem(task.title);
        }
    }

    // add the new list to HTML
    if (addListFilters) {
        listBoxes.innerHTML += wrapInListFilters(getListBox(category, listItems), conditionals);
        listTitles.insertAdjacentHTML('afterend', getListFilters(conditionals));
    } else {
        listBoxes.innerHTML += getListBox(category, listItems);
    }

    // add new list title to the list of buttons
    listTitles.innerHTML += `<div class="flexible bubble">${category}</div>`;
}

function getConditionalListItem(task, classValue, hide = true) {
    console.log("hide:" + JSON.stringify(hide));
    if (hide)
        hide = 'hidden';
    else
        hide = '';
    let listItem = `
    <div class="flexible list-item ${hide} ${getClassName(classValue)}">
        <div class="check"></div>
        <div class="flexible list-value">${task}
        </div>
        <div class="delete-line"></div>
    </div>
    `;
    return listItem;
}

function getListItem(task) {
    let listItem = `
    <div class="flexible list-item">
        <div class="check"></div>
        <div class="flexible list-value">${task}
        </div>
        <div class="delete-line"></div>
    </div>
    `;
    return listItem;
}

function getListBox(category, container) {
    let listBox = `
    <div class="list-box ${getClassName(category)} scrolling">
        <div class="title">${category}</div>
        <div class="listBoxMain">
            ${container}
        </div>
    </div>
    `;
    return listBox
}

function getListFilters(filters) {
    // the lightblue holder containing all of the conditional bubbles
    let bubbles = '';
    for (let filter of filters) {
        bubbles += `<div class="flexible bubble">${filter}</div>`;
    }

    let getListFilters = `
    <div class="flexible condition-filters">
        ${bubbles}
    </div>
    `;
    return getListFilters;
}

function wrapInListFilters(element, conditionals) {
    let wrapper = `
    <div class="flexible wrapper">${element}${getListFilters(conditionals)}</div>
    `;
    return wrapper;
}