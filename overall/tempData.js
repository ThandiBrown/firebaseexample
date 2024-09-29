
// Step 1: Define arrays of words or phrases
const subjects = ["The cat", "A scientist", "The programmer", "An astronaut", "A teacher"];
const verbs = ["jumps over", "analyzes", "writes", "explores", "teaches"];
const objects = ["the moon.", "a new theory.", "a complex algorithm.", "a distant planet.", "mathematics."];

// Step 2: Function to generate a random sentence
function generateRandomSentence() {
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const object = objects[Math.floor(Math.random() * objects.length)];

    return `${subject} ${verb} ${object}`;
}

// Step 3: Function to generate multiple sentences and append them as a list
function genSentences(numberOfSentences) {
    let sentences = [];
    for (let i = 0; i < numberOfSentences; i++) {
        // sentences.push(generateRandomSentence()); // Set the sentence as the text of the <li>
        sentences.push({
            'title': generateRandomSentence()
        });
    }
    return sentences
}

function generateRandomDates(daysBeforeToday) {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - daysBeforeToday);

    // Calculate the total number of days in the range
    const totalDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;

    // Determine a random number of dates to generate (between 1 and totalDays)
    const numberOfDates = Math.floor(Math.random() * totalDays) + 5;

    const dates = [];
    const usedDates = new Set(); // To ensure uniqueness

    // Generate random dates
    for (let i = 0; i < numberOfDates; i++) {

        // Random day offset
        const randomOffset = Math.floor(Math.random() * totalDays);
        const randomDate = new Date(startDate);
        randomDate.setDate(startDate.getDate() + randomOffset);

        // Format the date as YYYY-MM-DD
        const formattedDate = randomDate.toISOString().split('T')[0];

        // Add date to the list if it's not already included
        if (!usedDates.has(formattedDate)) {
            dates.push(formattedDate);
            usedDates.add(formattedDate);
        }
    }

    return dates;
}


function getData() {
    return {
        "Upcoming": {},
        // "Upkeep": {
        //     "status": {},
        //     "calendar": [
        //         {
        //             "type": "exercise",
        //             "startDate": "2024-09-16",
        //             "fulfilled": [
        //                 "2024-09-16"
        //             ],
        //             "progressed": []
        //         },
        //         {
        //             "type": "eating",
        //             "startDate": "2024-09-16",
        //             "fulfilled": [],
        //             "progressed": [
        //                 "2024-09-20"
        //             ]
        //         }
        //     ],
        //     "lists": {
        //         "Time Sensitive": {
        //             "items": [
        //                 {
        //                     "title": "Christmas flight ✈️"
        //                 },
        //                 {
        //                     "title": "Buy Christmas gifts",
        //                     "tag": ""
        //                 },
        //                 {
        //                     "title": "By Dad Birthday Gift",
        //                     "tag": ""
        //                 }
        //             ],
        //             "selectedTags": []
        //         },
        //         "Conditional": {
        //             "items": [
        //                 {
        //                     "title": "Ask company to mail w2 to chinue address",
        //                     "checked": false,
        //                     "in-progress": false
        //                 },
        //                 {
        //                     "title": "Makeup with chinue",
        //                     "tag": "Chinue's House"
        //                 }
        //             ],
        //             "selectedTags": []
        //         },
        //         "Backlog": {
        //             "items": [
        //                 {
        //                     "title": "Find happypages site",
        //                     "checked": false,
        //                     "in-progress": false
        //                 },
        //                 {
        //                     "title": "Determine non tech things",
        //                     "checked": false,
        //                     "in-progress": false
        //                 },
        //                 {
        //                     "title": "Chinue advice on stainless pans"
        //                 },
        //                 {
        //                     "title": "300 questions social program"
        //                 },
        //                 {
        //                     "title": "Figure out how to recover dragon if hard reset"
        //                 },
        //                 {
        //                     "title": "How to save computer if destroyed"
        //                 },
        //                 {
        //                     "title": "fidelity, change email to: thanbrown22@gmail.com "
        //                 },
        //                 {
        //                     "title": "umb health services, change email to: thanbrown22@gmail.com"
        //                 },
        //                 {
        //                     "title": "same for State Farm ^"
        //                 },
        //                 {
        //                     "title": "All new emails",
        //                     "checked": false,
        //                     "in-progress": true
        //                 }
        //             ],
        //             "selectedTags": []
        //         },
        //         "Day Checkpoints": {
        //             "items": [
        //                 {
        //                     "title": "Hygiene, shower and start work by 630"
        //                 },
        //                 {
        //                     "title": "Technique: make green tea 1st, ear buds knox hill video"
        //                 },
        //                 {
        //                     "title": "Water / liquid only day"
        //                 },
        //                 {
        //                     "title": "Prop up laptop for neck"
        //                 },
        //                 {
        //                     "title": "Use counters as stand up desk"
        //                 },
        //                 {
        //                     "title": "*Follow* day's layout / routine"
        //                 }
        //             ],
        //             "selectedTags": []
        //         },
        //         "Shopping": {
        //             "items": [
        //                 {
        //                     "title": "Magnesium gummies",
        //                     "tag": ""
        //                 },
        //                 {
        //                     "title": "K gingerade,gingerberry",
        //                     "tag": ""
        //                 }
        //             ],
        //             "selectedTags": []
        //         },
        //         "Notes": {
        //             "items": [
        //                 {
        //                     "title": "9/26 New Batch K",
        //                     "tag": ""
        //                 }
        //             ],
        //             "selectedTags": []
        //         }
        //     }
        // },
        // "Entertainment": {
        //     "status": {
        //         "collapsed": true
        //     },
        //     "lists": {
        //         "Hobbies to Try": {
        //             "items": [],
        //             "selectedTags": []
        //         },
        //         "Things to Watch": {
        //             "items": [
        //                 {
        //                     "title": "Mayfair witches"
        //                 },
        //                 {
        //                     "title": "Amc, stars, showtime, apple shows"
        //                 },
        //                 {
        //                     "title": "Penguin hbomax site"
        //                 }
        //             ],
        //             "selectedTags": []
        //         },
        //         "Foods to Make": {
        //             "items": [],
        //             "selectedTags": []
        //         },
        //         "Backlog": {
        //             "items": [],
        //             "selectedTags": []
        //         }
        //     }
        // },
        // "Relationships": {
        //     "status": {
        //         "collapsed": false
        //     },
        //     "lists": {
        //         "Calls and Messaging": {
        //             "items": [
        //                 {
        //                     "title": "Respond to Lashonda",
        //                     "tag": ""
        //                 }
        //             ],
        //             "selectedTags": []
        //         },
        //         "Gifts List": {
        //             "items": [
        //                 {
        //                     "title": "Her dryer - made slides ",
        //                     "tag": "Chinue"
        //                 },
        //                 {
        //                     "title": "Chinue friend's walking at desk device",
        //                     "tag": ""
        //                 }
        //             ],
        //             "selectedTags": []
        //         }
        //     }
        // },
        // "Labor": {
        //     "status": {
        //         "collapsed": true
        //     },
        //     "lists": {
        //         "Backlog": {
        //             "items": [
        //                 {
        //                     "title": "look into pyenvironment, removing/uninstalling global downloads",
        //                     "tag": ""
        //                 }
        //             ],
        //             "selectedTags": []
        //         }
        //     }
        // }
    }
}

function getDataOld() {
    return {
        'Upkeep': {
            'goals': [
                'Build muscle and endurance',
                'Maintain a healthy diet',
                'Be proficient in tech interview questions'
            ],
            'calendar': [
                {
                    'type': 'exercise',
                    'startDate': '2024-09-16',
                    'fulfilled': []
                },
                {
                    'type': 'eating',
                    'startDate': '2024-09-16',
                    'fulfilled': []
                }
            ],
            'lists': {
                "Time Sensitive": [
                    {
                        "title": "Christmas flight",
                        "tag": "phone"
                    },
                    {
                        "title": "Create bsw health account",
                        "tag": "phone"
                    }
                ],
                "Conditional": [
                    {
                        "title": "Truist/CD/MMA",
                        // "tag": "car"
                    },
                    {
                        "title": "Ask company to mail w2 to chinue address",
                        // "tag": "work hours"
                    },
                    {
                        "title": "Pop and swap lens",
                        "tag": "work hours"
                    },
                    {
                        "title": "Work transcript",
                        "tag": "work hours"
                    },
                    {
                        "title": "Amazon returns",
                        "tag": "car"
                    },
                    {
                        "title": "Makeup with chinue",
                        "tag": "Chinue's House"
                    }
                ],
                "Backlog": [
                    {
                        "title": "All new emails"
                    },
                    {
                        "title": "Tsa precheck"
                    },
                    {
                        "title": "Find happypages site"
                    },
                    {
                        "title": "Determine non tech things"
                    },
                    {
                        "title": "Chinue advice on stainless pans"
                    },
                    {
                        "title": "300 questions social program"
                    },
                    {
                        "title": "Figure out how to recover dragon if hard reset"
                    },
                    {
                        "title": "V2 (Notes Section?/relationships) - gift list"
                    },
                    {
                        "title": "How to save computer if destroyed"
                    },
                    {
                        "title": "Mayfair witches"
                    },
                    {
                        "title": "Amc, stars, showtime, apple shows"
                    }
                ]
            }
        },
        'Entertainment': {
            'lists': {
                'Hobbies to Try': genSentences(5),
                'Things to Watch': genSentences(5),
                'Foods to Make': genSentences(5)
            }
        }
    };
}


export {
    getData
}