
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

function taskCategories(category) {

    let categoryContainer = document.querySelector(".list-categories");
    let items = '';
    const conditionals = new Set();
    for (let task of upkeepTask) {
        if (category == 'Conditional' && task.conditional) {
            items += getListContainer(task.title);
            conditionals.add(task.conditional);
        } else if (category == 'Backlog' && Object.keys(task).length === 1) {
            items += getListContainer(task.title);
        } else if (category == 'Time Sensitive' && task.tag && task.tag == 'time sensitive') {
            items += getListContainer(task.title);
        }

    }
    categoryContainer.innerHTML += getListCategory(category, items);

}

function getListContainer(task) {
    let listContainer = `
    <div class="flexible list-item2">
        <div class="check2"></div>
        <div class="flexible list-value2">${task}
        </div>
        <div class="delete-line2"></div>
    </div>
    `;
    return listContainer;
}

function getListCategory(category, container) {
    let listCategory = `
    <div class="list-category ${category.toLowerCase()} scrolling">
        <div class="title">${category}</div>
        ${container}
    </div>
    `;
    return listCategory
}


export {
    taskCategories
}