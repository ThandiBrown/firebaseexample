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
        Chinue: ['The Lies You Wrote',],
        Kareem: ['Unwind', 'The Lies You Wrote',],
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
        'The Lies You Wrote',
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