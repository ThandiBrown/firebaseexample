function getData() {
    return {
        Thandiwe: [''],
        Chinue: [''],
        Kareem: [''],
        Ty: [''],
        Jovan: [''],
        Shonnie: [''],
        Tharisa: [''],
        Ben: [''],
        RaShunda: [''],
        Chinasa: ['']
    }
}

function getSelection() {
    return {
        // Thandiwe: getBookTitles(),
        Thandiwe: ['Verity',],
        Chinue: ['The Power of Now',],
        Kareem: ['Unwind', 'The Power of Now',],
        Ty: ['Honey and Spice',],
        Jovan: ['When no one is watching',],
        Shonnie: ['First Lie Wins',],
        Tharisa: ['The Nightingale', 'Blood at the root',],
        Ben: ['Blood at the root',],
        RaShunda: ['When Christmas Comes', 'Enders Game', 'Unwind',],
        Chinasa: ['Enders Game',]
    }
}

function getReaderChoices() {
    return {
        Placeholder1: [],
        Placeholder2: [],
        Placeholder3: [],
        Placeholder4: [],
        Placeholder5: [],
    }
}

function getBookTitles() {
    return [
        'Verity',
        'The Power of Now',
        'Unwind',
        'Honey and Spice',
        'When no one is watching',
        'First Lie Wins',
        'The Nightingale',
        'Blood at the root',
        'When Christmas Comes',
        'Enders Game',
    ]
}

export {
    getData,
    getSelection,
    getReaderChoices,
    getBookTitles
}