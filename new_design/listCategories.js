
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

function play(tasks) {
    let conditional = document.querySelector(".conditional");
    let backlog = document.querySelector(".backlog");
    let conditionalContent = '';
    let backlogContent = '';
    const conditionals = new Set();
    for (let task of tasks) {
        if (task.conditional) {
            conditionalContent += '<br>' + task.title;
            conditionals.add(task.conditional);
        } else {
            backlogContent += '<br>' + task.title;
        }

    }
    conditional.innerHTML += conditionalContent;
    backlog.innerHTML += backlogContent;

}

// play(upkeepTask);