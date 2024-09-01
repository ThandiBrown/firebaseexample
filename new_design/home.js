

// addEventListeners();

function addEventListeners() {
    // Select all textarea elements
    const boxSections = document.querySelectorAll('.boxSection');
    const days = document.querySelectorAll('.today');

    // Loop through each textarea and print its name attribute
    boxSections.forEach(boxSection => {
        boxSection.innerHTML += submissionTextArea();
        const content = boxSection.querySelector('.boxMain');
        
        const textarea = boxSection.querySelector('.submit-text-area');
        const submitButton = boxSection.querySelector('.submit-button');
        const listItems = boxSection.querySelectorAll('.list-item');

        if (content && textarea && submitButton) {
            submitButton.addEventListener('click', function () {

                let submission = textarea.value.trim();
                if (submission) {
                    let newContent = '';
                    submission = submission.split("\n");
                    for (let line of submission) {
                        newContent += newListItem(line);
                    }
                    content.innerHTML += newContent;
                    textarea.value = '';
                    addListItemEventListeners(listItems, content);
                }

            });

            addListItemEventListeners(listItems, content);

        }

    });

    days.forEach(day => {
        day.addEventListener('click', function () {
            day.classList.toggle('fulfilled');
        });
    });

    // calendar.scrollTop = calendar.scrollHeight;
}


function newListItem(lineContent) {
    let listElement = `
    <div class="flexible list-item">
        <div class="check"></div>
        <div class="list-value">${lineContent}</div>
        <div class="delete-line"></div>
    </div>
    `;
    return listElement
}

function submissionTextArea() {
    let submissionTextArea = `
    <div class="submit-to-list flexible">
        <textarea class="submit-text-area" id=""></textarea>
        <button class="submit-button"></button>
    </div>
    `;
    return submissionTextArea;
}

function addListItemEventListeners(listItems, content) {

    for (let listItem of listItems) {
        const checkButton = listItem.querySelector('.check');
        const deleteButton = listItem.querySelector('.delete-line');
        checkButton.addEventListener('click', function () {
            checkButton.classList.toggle('checked');
        });
        deleteButton.addEventListener('click', function () {
            content.removeChild(listItem);
        });
    }
}
