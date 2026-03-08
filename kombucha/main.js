import { readDB, writeDB } from './data/talkToDatabase.js'


let fruitSeries = {
	"orange guava": 10,
	"pineapple": 10,

	// "guava": 0,
	"mango": 2,
	"watermelon": 10,

	// "pear": 1,
	// "tropic guava": 0,	
	// "ginger tea": 10,
	// "*Temporarily Closed*": 0
};

let teaSeries = {
	"lemon verbena": 10,
	"lemon verbena lavender": 10,
	"chamomile lavender": 10,
	"chamomile lavender 2x": 10,
	"spearmint": 10,
	"tumeric ginger": 10
};

let workshop = ["Hibiscus", "Ginger"];

let descriptions = {
	// "lemon verbena": "Bright and citrusy herbal tea",
	// "lemon verbena lavender": "Floral blend with calming lavender",
	// "orange guava": "Tropical sweet citrus",
	// "pineapple": "Tropical pineapple burst",
	// "mango": "Smooth mango flavor",
	"watermelon": "Unique: quantity of 1 recommended for first time",
	"chamomile lavender": "Greater emphasis on the chamomile flavor",
	"chamomile lavender 2x": "Greater balance of the two flavors",
	"spearmint": "Unique: quantity of 1 recommended for first time"
	// "tumeric ginger": "Spicy anti-inflammatory blend"
};

let fullInventory = {...fruitSeries, ...teaSeries};

let inventory = fullInventory;
let readyNow = {};

function loadingSettings() {

	if (true) {
		readDB("", loadingPage);
	} else if (true) {
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
	inventory = fullInventory || {};
	// inventory = storage["inventory"] || {};
	readyNow = storage["readyNow"] || {};

	let fruitItems = "";
	let fruitSelectedItems = "";
	let teaItems = "";
	let teaSelectedItems = "";
	let readyItems = "";
	let readySelectedItems = "";
	for (let [flavor, quantity] of Object.entries(inventory)) {
		// separate tea series flavors
		if (flavor in teaSeries) {
			if (quantity > 0) {
				teaItems += `<div class="item-row">
					<div class="flavor-item-wrapper">
						<div class="flavor selectable" id="${flavor}">${flavor.charAt(0).toUpperCase() + flavor.slice(1)}</div>
						<div style="font-size: 0.85em; color: #666;">${descriptions[flavor] || ""}</div>
					</div>
					<div class="quantity-item-wrapper">
						<div class="quantity">${quantity}</div>
					</div>
				</div>`;
				teaSelectedItems += `<div class="item-row selected-row" id="${flavor}-selected-row">
					<div class="flavor-item-wrapper">
						<div class="flavor-selected" id="${flavor}-selected">${flavor.charAt(0).toUpperCase() + flavor.slice(1)}</div>
					</div>
					<div class="quantity-item-wrapper">
						<div class="input" id="${flavor}-quantity">
							<div class="number quantity-selected">1</div>
							<div class="arrows">
								<div class="up" data-min="1" data-max="${quantity}"></div>
								<div class="down" data-min="1" data-max="${quantity}"></div>
							</div>
						</div>
					</div>
				</div>`;
			}
			continue;
		}

		if (quantity > 0) {
			fruitItems += `<div class="item-row">
				<div class="flavor-item-wrapper">
					<div class="flavor selectable" id="${flavor}">${flavor.charAt(0).toUpperCase() + flavor.slice(1)}</div>
					<div style="font-size: 0.85em; color: #666;">${descriptions[flavor] || ""}</div>
				</div>
				<div class="quantity-item-wrapper">
					<div class="quantity">${quantity}</div>
				</div>
			</div>`;

			fruitSelectedItems += `<div class="item-row selected-row" id="${flavor}-selected-row">
				<div class="flavor-item-wrapper">
					<div class="flavor-selected" id="${flavor}-selected">${flavor.charAt(0).toUpperCase() + flavor.slice(1)}</div>
				</div>
				<div class="quantity-item-wrapper">
					<div class="input" id="${flavor}-quantity">
						<div class="number quantity-selected">1</div>
						<div class="arrows">
							<div class="up" data-min="1" data-max="${quantity}"></div>
							<div class="down" data-min="1" data-max="${quantity}"></div>
						</div>
					</div>
				</div>
			</div>`;
		}
	}
	for (let [flavor, quantity] of Object.entries(readyNow)) {
		if (quantity > 0) {
			readyItems += `<div class="item-row">
				<div class="flavor-item-wrapper">
					<div class="flavor selectable" id="${flavor}-rn">${flavor.charAt(0).toUpperCase() + flavor.slice(1)}</div>
				</div>
				<div class="quantity-item-wrapper">
					<div class="quantity">${quantity}</div>
				</div>
			</div>`;

			readySelectedItems += `<div class="item-row selected-row" id="${flavor}-rn-selected-row">
				<div class="flavor-item-wrapper">
					<div class="flavor-selected-rn" id="${flavor}-rn-selected" data-name="${flavor.charAt(0).toUpperCase() + flavor.slice(1)}">${flavor.charAt(0).toUpperCase() + flavor.slice(1)} (RN)</div>
				</div>
				<div class="quantity-item-wrapper">
					<div class="input" id="${flavor}-rn-quantity">
						<div class="number quantity-selected-rn">1</div>
						<div class="arrows">
							<div class="up" data-min="1" data-max="${quantity}"></div>
							<div class="down" data-min="1" data-max="${quantity}"></div>
						</div>
					</div>
				</div>
			</div>`;
		}
	}

	let workshopItems = "";
	for (let flavor of workshop) {
		workshopItems += `<div class="flavor workshop-flavor">${flavor.charAt(0).toUpperCase() + flavor.slice(1)}</div>`;
	}

	let page = document.getElementsByClassName("page")[0];

	// only render "Ready Now" box if there's at least one item
	let readySection = "";
	if (readyItems) {
		readySection = `
		<div class="box">
            <div class="box-title">Ready Now</div>
            <div class="items-container">
				<div class="item-row header-row">
					<div class="flavor-item-wrapper"><div class="title">Flavor</div></div>
					<div class="quantity-item-wrapper"><div class="title">Availability</div></div>
				</div>
                ${readyItems}
            </div>
        </div>`;
	}

	page.innerHTML = `
		<h2>Homepage</h2>
		${readySection}
		<div class="box">
            <div class="box-title">Fruit Series<span id="quantity-warning" style="color: red;display: none;">&nbsp;&nbsp;&nbsp;Please only select up to 6 unique flavors</span></div>
            <div class="items-container">
				<div class="item-row header-row">
					<div class="flavor-item-wrapper"><div class="title">Flavor</div></div>
					<div class="quantity-item-wrapper"><div class="title">Availability</div></div>
				</div>
                ${fruitItems}
            </div>
        </div>
		<div class="box">
            <div class="box-title">Tea Series</div>
            <div class="items-container">
				<div class="item-row header-row">
					<div class="flavor-item-wrapper"><div class="title">Flavor</div></div>
					<div class="quantity-item-wrapper"><div class="title">Availability</div></div>
				</div>
                ${teaItems}
            </div>
        </div>
		<div class="box workshop-box">
            <div class="box-title">Flavors in the Workshop</div>
            <div class="items-container workshop-container">
                ${workshopItems}
            </div>
        </div>
		<div class="box">
            <div class="box-title">Selected</div>
            <div class="items-container">
				<div class="item-row header-row">
					<div class="flavor-item-wrapper"><div class="title">Flavor</div></div>
					<div class="quantity-item-wrapper"><div class="title">Amount</div></div>
				</div>
                ${fruitSelectedItems}
				${teaSelectedItems}
				${readySelectedItems}
            </div>
            </div>
        </div>
	` + page.innerHTML;


	runEventListeners();
}

function process(e) {
	if (countFlexFlavors() >= 6 && e.target.style.backgroundColor != "rgb(116, 189, 213)") {
		toggleDisplay("quantity-warning");
		return;
	}
	let selectedId = e.target.id + "-selected-row";
	if (e.target.id.endsWith("-rn")) {
		selectedId = e.target.id + "-selected-row";
	} else {
		selectedId = e.target.id + "-selected-row";
	}
	toggleDisplay(selectedId);
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
		const row = flavor.closest('.selected-row');
		if (row && window.getComputedStyle(row).display === 'flex') {
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
		if ([
			"pineapple",
			"orange guava",
			"lemon verbena",
			"lemon verbena lavender",
			"chamomile lavender",
			"spearmint",
			"tumeric ginger"
		].includes(normalizedItem)) {
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
	const elements = document.querySelectorAll('.selected-row');
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
	document.querySelectorAll('.selectable').forEach(el => {
		el.addEventListener('click', (e) => process(e));
	});

	document.querySelectorAll(".up, .down").forEach(arrow => {
		arrow.addEventListener("click", changeQuantity);
	});

}

export {
	loadingSettings
}

