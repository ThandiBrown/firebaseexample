
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

function organizeUpkeepTasks() {
    let listDictionary = {
        'conditional': [],
        'backlog': [],
        'time-sensitive': [],
    };
    for (let task of upkeepTask) {
        if (task.conditional) {
            listDictionary['conditional'].push(task);
        } else
            if (Object.keys(task).length === 1) {
                listDictionary['backlog'].push(task);
            } else if (task.tag && task.tag == 'time sensitive') {
                listDictionary['time-sensitive'].push(task);
            }
    }
    return listDictionary
}


function getClassName(value) {
    return value.toLowerCase().replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '')
}


function printIfTrue(statement, condition, returnValue = '') {
    if (typeof statement === 'function')
        return condition ? statement() : returnValue
    return condition ? statement : returnValue
}

export {
    organizeUpkeepTasks,
    getClassName,
    printIfTrue
}