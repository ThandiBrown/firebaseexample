import * as _ from '../getThis.js';

let finElem;
let budget = 0;
let totalSpent = 0;
let entries = null;

function main(finances) {
    entries = finances.purchases;
    budget = Number(finances.budget);
    totalSpent = Number(finances.totalSpent);

    createElement();
    _.getPage().appendChild(finElem);
}

function createElement() {

    let timeZone = moment.tz.guess();
    let todaysDate = moment().tz(timeZone).format('YYYY-MM-DD');
    let insideUpcoming = `
        <h1 class="pillar-title">Finances</h1>
        <div class="flexible pillar-main">
        
            <div class="flexible entry-list">
                ${getPurchases()}
            </div>
            
            <div class="flexible summary">
                ${getSummary()}
            </div>
        
        
            <div class="flexible finances-input">
                <input type="date" class="date" value="${todaysDate}">
                <input type="text" class="name" value="happy">
                <input type="text" class="price" value="20">
                <button class="submit"></div>
            </div>
        </div>
    `;

    finElem = document.createElement('div');
    finElem.classList = 'flexible pillar finances';
    finElem.innerHTML = insideUpcoming;
    addEventListeners();

}

function getPurchases() {
    let entryElements = '';
    entries.forEach((entry, index) => {
        // Create individual divs for date, activity, and price
        entryElements += `
            <div class="flexible purchase">
                <div class="date">${entry.date.slice(5).replace(/-/g, '/')}</div>
                <div class="name">${entry.activity}</div>
                <div class="price">${entry.price}</div>
                <button class="delete-btn" data-index="${index}"></button>
            </div>
        `;
    });
    return entryElements;
}

function getPurchaseElement(entry) {
    return `
        <div class="flexible purchase">
            <div class="date">${entry.date.slice(5).replace(/-/g, '/')}</div>
            <div class="name">${entry.activity}</div>
            <div class="price">${entry.price}</div>
            <button class="delete-btn" data-index="${index}"></button>
        </div>
    `;
}

function getSummary() {
    let summary = `
    <div class="date">${setTodayDate()}</div>
    <div class="budget">$${budget}</div>
    <div class="total-spent">$${totalSpent}</div>
    <div class="remaining">$${budget - totalSpent}</div>
    `;
    return summary;
}

function setTodayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${mm}/${dd}`;
    // const formattedDate = `${yyyy}-${mm}-${dd}`;

    return formattedDate;
}

function addEventListeners() {
    finElem.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            console.log(e.target.parentElement);
            e.target.parentElement.remove();
            const index = this.getAttribute('data-index');
            deleteEntry(index);
        });
    });

    let timeZone = moment.tz.guess();
    finElem.querySelector('.finances-input .submit').addEventListener('click', () => {
        const dateInput = finElem.querySelector('.finances-input .date');
        const activityInput = finElem.querySelector('.finances-input .name');
        const priceInput = finElem.querySelector('.finances-input .price');

        const date = dateInput.value;
        const activity = activityInput.value;
        let price = parseFloat(priceInput.value);

        if (!date || !activity || isNaN(price)) {
            // alert('Please fill out all fields correctly.');
            return;
        }

        // Add the entry
        addEntry(date, activity, price);

        // Clear input fields
        activityInput.value = '';
        priceInput.value = '';
        dateInput.value = moment().tz(timeZone).format('YYYY-MM-DD');
    });
}



// Function to delete an entry
function deleteEntry(index) {
    totalSpent -= parseFloat(entries[index].price); // Update total spent
    entries.splice(index, 1); // Remove entry from array
    updateSummary();
}

// Function to add a new entry
function addEntry(date, activity, price) {
    entries.push({ date, activity, price });
    totalSpent += parseFloat(price); // Update total spent
    updateSummary();
}

// Update total spent and remaining values
function updateSummary() {
    finElem.querySelector(".total-spent").textContent = `$${totalSpent.toFixed(2)}`;
    finElem.querySelector(".remaining").textContent = `$${(budget - totalSpent).toFixed(2)}`;
}


export {
    main
}