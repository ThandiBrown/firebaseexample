


function main(data) {
    displayRemainingBudget(data.remainingBudget);
    displayItems(data.items);
    displayItemInput();
}

function displayRemainingBudget(remainingBudget) {
    /* 
    add remaining budget to page
    */
}

function displayItems(items) {
    /* 
    loop through items, adding each item to the page
    */
    displayItem(description, date, price);
}

function selectItemEL(itemElement) {
    /* 
    toggle the selected class of the element, when it's select button is clicked
    */
}

function deleteItemEL(itemElement) {
    /* 
    delete the element && it's data, when it's delete button is clicked
    */
    updateRemainingBudget(price);
    deleteItem(description, date, price);
}

function deleteItem(description, date, price) {
    /* 
    delete the item data from the items list
    */
}

function displayItemInput() {
    /* 
    add item input area to the page
    */
    submitItemEL(inputElement);
}

function submitItemEL(inputElement) {
    /* 
    add event listener to the submit button, submitting the description, date && price
    */
    updateRemainingBudget(price);
    updateItems(description, date, price);
    displayItem(description, date, price);
}

function updateItems(description, date, price) {
    /* 
    add new item to items list
    */
}

function displayItem(description, date, price) {
    /* 
    display item and add event listeners
    */

    selectItemEL(itemElement);
    deleteItemEL(itemElement);
}

function updateRemainingBudget(price) {
    /* 
    calculate the new budget && display to page
    */

    displayRemainingBudget(remainingBudget);
}




























