
let upkeepTask = [
    {
        'title': 'Truist/CD/MMA',
        'conditional': 'car'
    },
    {
        'title': 'All new emails',
    },
    {
        'title': 'Tsa precheck',
    },
    {
        'title': 'Ask company to mail w2 to chinue address',
        'conditional': 'work hours'
    },
    {
        'title': 'Find happypages site',
    },
    {
        'title': 'Pop and swap lens',
        'conditional': 'work hours'
    },
    {
        'title': 'Work transcript',
        'conditional': 'work hours'
    },
    {
        'title': 'Determine non tech things',
    },
    {
        'title': 'Amazon returns',
        'conditional': 'car'
    },
    {
        'title': 'Chinue advice on stainless pans',
    },
    {
        'title': '300 questions social program',
    },
    {
        'title': 'Figure out how to recover dragon if hard reset',
    },
    {
        'title': 'Christmas flight',
        'tag': 'time sensitive'
    },
    {
        'title': 'V2 (Notes Section?/relationships) - gift list',
    },
    {
        'title': 'How to save computer if destroyed',
    },
    {
        'title': 'Mayfair witches',
    },
    {
        'title': 'Amc, stars, showtime, apple shows',
    },
    {
        'title': 'Makeup with chinue',
        'conditional': 'Chinue\'s House'
    },
    {
        'title': 'Create bsw health account',
        'tag': 'time sensitive'
    },
];

function taskCategories(category, useTagWrapper = false) {

    let categoryNames = document.querySelector(".category-names");
    let categoryContainer = document.querySelector(".list-categories");
    let items = '';
    const conditionals = new Set();
    for (let task of upkeepTask) {
        if (category == 'Conditional' && task.conditional) {
            items += getConditionalListItem(task.title, task.conditional);
            conditionals.add(task.conditional);
        } else if (category == 'Backlog' && Object.keys(task).length === 1) {
            items += getListItem(task.title);
        } else if (category == 'Time Sensitive' && task.tag && task.tag == 'time sensitive') {
            items += getListItem(task.title);
        }

    }
    if (useTagWrapper) {
        categoryContainer.innerHTML += tagWrapper(
            getListCategory(category, items), conditionalTopics(conditionals)
        );
    } else {
        categoryContainer.innerHTML += getListCategory(category, items);
    }
    categoryNames.innerHTML += `<div class="flexible bubble ">${category}</div>`;
}

function getConditionalListItem(task, classValue) {
    let listItem = `
    <div class="flexible list-item hidden ${getClassName(classValue)}">
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

function getListCategory(category, container) {
    let listCategory = `
    <div class="list-category ${getClassName(category)} scrolling">
        <div class="title">${category}</div>
        <div class="main">
            ${container}
        </div>
    </div>
    `;
    return listCategory
}

function conditionalTopics(topics) {
    let bubbles = '';
    for (let topic of topics) {
        bubbles += `<div class="flexible bubble">${topic}</div>`;
    }

    let conditionalTopics = `
    <div class="flexible conditional-topics">
        ${bubbles}
    </div>
    `;
    return conditionalTopics;
}

function tagWrapper(div, tags) {
    let wrapper = `
    <div class="flexible wrapper">${div}${tags}</div>
    `;
    return wrapper;
}

function getClassName(value) {
    return value.toLowerCase().replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '')
}


export {
    taskCategories,
    conditionalTopics,
    getClassName,
    getListItem,
    getConditionalListItem
}