import * as _ from '../getThis.js';

let budgetContainer;

// Function to initialize the page
function main(data) {

    let financePillar = document.createElement('div');
    financePillar.classList = 'flexible pillar finance';
    let insideFinancePillar = `
        <h1 class="pillar-title">Finances</h1>
        <div class="flexible pillar-main budget-container">
        </div>
    `;
    financePillar.insertAdjacentHTML('beforeend', insideFinancePillar);
    budgetContainer = financePillar.querySelector(".budget-container");

    displayRemainingBudget(data.remainingBudget);
    displayItems(data.items);
    displayItemInput();
    _.getPage().appendChild(financePillar);
}

// Display the remaining budget on the page
function displayRemainingBudget(remainingBudget) {
    let remainingBudgetStr = `
    <div class="remaining-budget" class="remaining-budget">${remainingBudget}</div>
    `;

    budgetContainer.insertAdjacentHTML('beforeend', remainingBudgetStr);
}

// Loop through items and display each
function displayItems(items) {
    let itemListStr = `
  <div class="item-list flexible-column">
  </div>
  `;

    budgetContainer.insertAdjacentHTML('beforeend', itemListStr);
    items.forEach(item => displayItem(item.description, item.date, item.price));
}

// Add input area to submit new items
function displayItemInput() {
    let today = new Date().toISOString().split("T")[0];
    let itemInputStr = `
	<div class="item-input flexible">
		<input type="date" class="input-date" value="${today}" required>
		<input type="text" class="input-description" placeholder="Description" value='pizza' required>
		<input type="number" class="input-price" placeholder="Price" value='50' required>
		<button class="input-button" onclick="submitItemEL(this)"></button>
	</div>
	`;

    budgetContainer.insertAdjacentHTML('beforeend', itemInputStr);
}

// Event listener to submit a new item
function submitItemEL(inputBtn) {
    // console.log("inputElement");console.log(inputElement);
    // console.log("inputElement:" + JSON.stringify(inputElement));
    let inputElement = inputBtn.parentElement;
    let date = inputElement.querySelector(".input-date").value;
    let description = inputElement.querySelector(".input-description").value;
    let price = parseFloat(inputElement.querySelector(".input-price").value)

    if (description && date && !isNaN(price)) {
        updateItems(description, date, price);
        updateRemainingBudget(price);
        displayItem(description, date, price);
    }
}

// Add item to the data structure
function updateItems(description, date, price) {
    data.items.push({ date, description, price });
    console.log(18);
    console.log(JSON.stringify(data.items, null, 2));
}

// Display a single item with event listeners for select and delete
function displayItem(description, date, price) {
    const [year, month, day] = date.split("-");
    let displayDate = `${month}/${day}`;

    let itemsStr = `
    <div class="item flexible">
      <button class="select" onclick="selectItemEL(this)"></button>
      <div class="item-date">${displayDate}</div>
      <div class="item-description">${description}</div>
      <div class="item-price">${price}</div>
			<button class="delete" onclick="deleteItemEL(this, '${description}', '${date}', ${price})"></button>
    </div>
	`;
    budgetContainer.querySelector(".item-list").insertAdjacentHTML('beforeend', itemsStr);
}

// Toggle the selected class for an item
function selectItemEL(selectButton) {
    let itemElement = selectButton.parentElement;
    itemElement.classList.toggle("selected");
}

// Delete item data and update display
function deleteItemEL(deleteButton, description, date, price) {
    let itemElement = deleteButton.parentElement;

    if (itemElement.classList.contains('selected')) {
        console.log(22);
        console.log(JSON.stringify(data.items, null, 2));
        data.items = data.items.filter(item => !(item.description == description && item.date == date && item.price == price));
        updateRemainingBudget(-price); // Restore budget
        itemElement.remove();
        console.log(24);
        console.log(JSON.stringify(data.items, null, 2));
    }
}

// Update the remaining budget
function updateRemainingBudget(price) {
    data.remainingBudget -= price;
    budgetContainer.querySelector(".remaining-budget").textContent = data.remainingBudget;
}

export {
    main
}