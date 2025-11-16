import { readDB, writeDB } from './data/talkToDatabase.js'


let fullInventory = {
	"mango": 24,
	"guava": 5,
	// "guava ras": 0,
	"orange guava": 10,
	"pineapple": 10,
	// "spicy pineapple": 0,
	// "tart cherry": 0,
	// "peach": 6,
	// "peach basil": 0,
	// "apple": 0,
	"pear": 12
};
let inventory = fullInventory;
let readyNow = {};
let priority = [
	"mango", "guava", "orange guava", "pear", "pineapple"

];



function loadingSettings() {

	if (true) {
		readDB("", loadingPage);
	} else if (false) {
		loadingPage([{
			"inventory": fullInventory,
			"readyNow": readyNow
		}]);
	} else {
		writeDB("", {
			"inventory": fullInventory,
			"readyNow": {}
		}, () => readDB("", loadingPage));
	}
}


function loadingPage(response) {

	console.log("loaded data");
	console.log(response[0]);

	let storage = response[0];
	fullInventory = storage["inventory"];
	inventory = getTopInventory(fullInventory, priority) || {};
	// inventory = storage["inventory"] || {};
	readyNow = storage["readyNow"] || {};

	let flavors = "";
	let quantities = "";
	let flavorsRN = "";
	let quantitiesRN = "";
	let selectedFlavors = "";
	let selectedQuantities = "";
	let selectedFlavorsRN = "";
	let selectedQuantitiesRN = "";
	for (let [flavor, quantity] of Object.entries(inventory)) {
		flavors += `<div class="flavor" id="${flavor}">${flavor.charAt(0).toUpperCase() + flavor.slice(1)}</div>`;

		quantities += `<div class="quantity">${quantity}</div>`;

		selectedFlavors += `<div class="flavor-selected" id="${flavor}-selected">${flavor.charAt(0).toUpperCase() + flavor.slice(1)}</div>`;

		selectedQuantities += `
			<div class="input" id="${flavor}-quantity">
				<div class="number quantity-selected">1</div>
				<div class="arrows">
					<div class="up" data-min="1" data-max="${quantity}"></div>
					<div class="down" data-min="1" data-max="${quantity}"></div>
				</div>
        	</div>
		`;
	}
	for (let [flavor, quantity] of Object.entries(readyNow)) {
		flavorsRN += `<div class="flavor" id="${flavor}-rn">${flavor.charAt(0).toUpperCase() + flavor.slice(1)}</div>`;

		quantitiesRN += `<div class="quantity">${quantity}</div>`;

		selectedFlavorsRN += `<div class="flavor-selected-rn" id="${flavor}-rn-selected" data-name="${flavor.charAt(0).toUpperCase() + flavor.slice(1)}">${flavor.charAt(0).toUpperCase() + flavor.slice(1)} (RN)</div>`;

		selectedQuantitiesRN += `
			<div class="input" id="${flavor}-rn-quantity">
				<div class="number quantity-selected-rn">1</div>
				<div class="arrows">
					<div class="up" data-min="1" data-max="${quantity}"></div>
					<div class="down" data-min="1" data-max="${quantity}"></div>
				</div>
        	</div>
		`;
	}

	let page = document.getElementsByClassName("page")[0];
	page.innerHTML = `
		<h2>Homepage</h2>
		<div class="box">
            <div class="box-title">Ready Now</div>
            <div class="box-container">
                <div class="flavor-column">
                    <div class="title">Flavor</div>
                    ${flavorsRN}
                </div>
                <div class="availability-column">
                    <div class="title">Availability</div>
                    ${quantitiesRN}
                </div>
                    
            </div>
        </div>
		<div class="box">
            <div class="box-title">Build Order<span id="quantity-warning" style="color: red;display: none;">&nbsp;&nbsp;&nbsp;Please only select up to 3 unique flavors</span></div>
            <div class="box-container">
                <div class="flavor-column">
                    <div class="title">Flavor</div>
                    ${flavors}
                </div>
                <div class="availability-column">
                    <div class="title">Availability</div>
                    ${quantities}
                </div>
                    
            </div>
        </div>
		<div class="box">
            <div class="box-title">Selected</div>
            <div class="box-container">
                <div class="flavor-column">
                    <div class="title">Flavor</div>
                    ${selectedFlavors}
					${selectedFlavorsRN}
                </div>
                <div class="availability-column">
                    <div class="title">Amount</div>
                    ${selectedQuantities}
					${selectedQuantitiesRN}
                </div>
                    
            </div>
        </div>
	` + page.innerHTML;


	runEventListeners();
}

function getTopInventory(inventory, priority, count = 3) {
	return inventory;
	let result = {};
	let added = 0;

	for (let item of priority) {
		if (inventory[item] && inventory[item] > 0) {
			result[item] = inventory[item];
			added++;
			if (added === count) break;
		}
	}

	return result;
}

function process(e) {
	if (countFlexFlavors() >= 3 && e.target.style.backgroundColor != "rgb(116, 189, 213)") {
		toggleDisplay("quantity-warning");
		return;
	}
	toggleDisplay(e.target.id + "-selected");
	toggleDisplay(e.target.id + "-quantity");
	toggleBackgroundColor(e.target, "lightblue", "rgb(116, 189, 213)");
}

function toggleDisplay(id) {
	const el = document.getElementById(id);
	if (!el) return; // safety check

	if (el.style.display != "flex") {
		el.style.display = "flex"; // show it
	} else {
		el.style.display = "none"; // hide it
	}
}

function toggleBackgroundColor(element, color1, color2) {
	if (element.style.backgroundColor == color1 || element.style.backgroundColor == "") {
		element.style.backgroundColor = color2;
	} else {
		element.style.backgroundColor = color1;
	}
}

function submitOrder() {
	const order = returnOrder(0);
	const orderRn = returnOrder(1);
	// console.log("order:" + JSON.stringify(order));
	// console.log("orderRn:" + JSON.stringify(orderRn));

	let message = formMessage(order, orderRn);
	confirmOrder(message, order, orderRn);
}

function returnOrder(orderRn) {
	const result = {};
	let flavors;
	let quantities;
	if (orderRn) {
		flavors = document.querySelectorAll('.flavor-selected-rn');
		quantities = document.querySelectorAll('.quantity-selected-rn');
	} else {
		flavors = document.querySelectorAll('.flavor-selected');
		quantities = document.querySelectorAll('.quantity-selected');
	}


	flavors.forEach((flavor, index) => {
		const style = window.getComputedStyle(flavor);
		if (style.display === "flex") {
			const quantityInput = quantities[index];
			const quantity = quantityInput.innerText || quantityInput.placeholder || "0";
			result[flavor.textContent.trim()] = quantity;
		}
	});

	return result;
}


function formMessage(order, orderRn) {
	const orderString = Object.entries(order).map(([flavor, qty]) => `${flavor}: ${qty}`).join('\n');
	const orderRnString = Object.entries(orderRn).map(([flavor, qty]) => `${flavor}: ${qty}`).join('\n');
	let message = "";

	if (orderString.trim() && orderRnString.trim()) {
		message += `Ready Now Order\n` + orderRnString;
		message += "\n\n";
		message += `Next Kombucha Order\n` + orderString;
	} else if (orderString.trim()) {
		message += `Next Order\n` + orderString;
	}
	else if (orderRnString.trim()) {
		message += `Ready Now Order\n` + orderRnString;
	}

	return message;
}

function confirmOrder(message, order, orderRn) {
	customConfirm(`Please confirm this is your order.\n${message}`).then((result) => {
		if (result) {
			let update = {
				"inventory": updateInventory(fullInventory, order),
				"readyNow": updateInventory(readyNow, orderRn)
			}
			// console.log(update);
			writeDB("", update, () => sendMessage(message));
		} else
			console.log("User cancelled the action.");
	});
}

function customConfirm(message) {
	return new Promise((resolve) => {
		const overlay = document.getElementById("confirm");
		const msg = document.getElementById("confirm-message");
		msg.textContent = message;

		overlay.style.display = "flex";

		const yes = document.getElementById("confirm-yes");
		const no = document.getElementById("confirm-no");

		function cleanup(result) {
			overlay.style.display = "none";
			yes.removeEventListener("click", yesHandler);
			no.removeEventListener("click", noHandler);
			resolve(result);
		}

		function yesHandler() { cleanup(true); }
		function noHandler() { cleanup(false); }

		yes.addEventListener("click", yesHandler);
		no.addEventListener("click", noHandler);
	});
}

function customRefresh() {
	return new Promise((resolve) => {
		const overlay = document.getElementById("refresh");

		overlay.style.display = "flex";

		const yes = document.getElementById("refresh-yes");

		function cleanup(result) {
			overlay.style.display = "none";
			yes.removeEventListener("click", yesHandler);
			location.reload(true);
		}

		function yesHandler() { cleanup(true); }

		yes.addEventListener("click", yesHandler);
	});
}


function sendMessage(message) {
	if (true) {
		customRefresh();
		const url = `sms:7067508106?&body=${encodeURIComponent(message)}`;
		window.location.href = url;
	} else {
		customRefresh();
		console.log("Sending Message...");
		// location.reload(true);

	}
}

function updateInventory(inventory, order) {
	// Make a copy so the original inventory is not mutated
	let updatedInventory = { ...inventory };

	for (let item in order) {
		let normalizedItem = item.toLowerCase(); // normalize casing
		if (["pineapple", "orange guava"].includes(normalizedItem)) {
			continue;
		}
		let quantitySold = parseInt(order[item], 10); // ensure number

		if (updatedInventory.hasOwnProperty(normalizedItem)) {
			updatedInventory[normalizedItem] -= quantitySold;

			// prevent negative stock
			if (updatedInventory[normalizedItem] < 0) {
				updatedInventory[normalizedItem] = 0;
			}
		}
	}

	return updatedInventory;
}

function changeQuantity(e) {
	const arrow = e.currentTarget;
	const input = arrow.closest(".input");
	const numberDiv = input.querySelector(".number");

	let value = parseInt(numberDiv.textContent, 10);
	const min = parseInt(arrow.dataset.min, 10);
	const max = parseInt(arrow.dataset.max, 10);

	if (arrow.classList.contains("up") && value < max) {
		value++;
		numberDiv.textContent = value;
	} else if (arrow.classList.contains("down") && value > min) {
		value--;
		numberDiv.textContent = value;
	}
}

function countFlexFlavors() {
	const elements = document.querySelectorAll('.flavor-selected');
	let count = 0;

	elements.forEach(el => {
		const display = window.getComputedStyle(el).display;
		if (display === 'flex') {
			count++;
		}
	});

	return count;
}


function runEventListeners() {
	document.getElementById("button").addEventListener("click", () => submitOrder());
	document.querySelectorAll('.flavor').forEach(el => {
		el.addEventListener('click', (e) => process(e));
	});

	document.querySelectorAll(".up, .down").forEach(arrow => {
		arrow.addEventListener("click", changeQuantity);
	});

}

export {
	loadingSettings
}

