

// addEventListeners();

function addEventListeners() {
    // Select all textarea elements
    const pillars = document.querySelectorAll('.pillar');
    const days = document.querySelectorAll('.today');
    
    // Loop through each textarea and print its name attribute
    pillars.forEach(pillar => {
        const content = pillar.querySelector('.content');
        const textarea = pillar.querySelector('.submit-text-area');
        const submitButton = pillar.querySelector('.submit-button');
        const listItems = pillar.querySelectorAll('.list-item');
        
        if (content && textarea && submitButton) {
            submitButton.addEventListener('click', function() {
            
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
        day.addEventListener('click', function() {
            day.classList.toggle('fulfilled');
        });
    });
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


function addListItemEventListeners(listItems, content) {
    
    for (let listItem of listItems) {
        const checkButton = listItem.querySelector('.check');
        const deleteButton = listItem.querySelector('.delete-line');
        checkButton.addEventListener('click', function() {
            checkButton.classList.toggle('checked');
        });
        deleteButton.addEventListener('click', function() {
            content.removeChild(listItem);
        });
    }
}
