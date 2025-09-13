import { readDB, writeDB } from './data/talkToDatabase.js'


let inventory = {
	"mango": 3,
	"apple": 2,
	"passionfruit": 3
};
let readyNow = inventory;

// loadingSettings();
loadingPage([{
	"inventory": inventory,
	"readyNow": readyNow
}]);

function loadingSettings() {
	// readDB("", loadingPage);
	writeDB("", {
		"inventory": inventory,
		"readyNow": {}
	});
	
}

function loadingPage(response) {
	// let inventory = {
	// 	"mango": 3,
	// 	"apple": 2,
	// 	"passionfruit": 3
	// }

	
	console.log(3);
	console.log("response");
	console.log(response[0]);
	
	let storage = response[0];
	inventory = storage["inventory"] || {};
	readyNow = storage["readyNow"] || {};
	console.log("inventory:" + JSON.stringify(inventory));
	console.log("readyNow:" + JSON.stringify(readyNow));
	// writeDB("", {
	// 	"inventory": inventory,
	// 	"readyNow": inventory
	// }); // initialize the database if empty

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

		selectedFlavors += `<div class="flavor-selected" id="${flavor}-selected" style="display:none;">${flavor.charAt(0).toUpperCase() + flavor.slice(1)}</div>`;

		selectedQuantities += `<input type="number" id="${flavor}-quantity" class="quantity-selected arrow-only" readonly onkeydown="return false;" min="1" max="${quantity}" step="1" value="1" style="display:none;">`;
	}
	for (let [flavor, quantity] of Object.entries(readyNow)) {
		flavorsRN += `<div class="flavor" id="${flavor}-rn">${flavor.charAt(0).toUpperCase() + flavor.slice(1)}</div>`;

		quantitiesRN += `<div class="quantity">${quantity}</div>`;

		selectedFlavorsRN += `<div class="flavor-selected-rn" id="${flavor}-rn-selected" style="display:none;" data-name="${flavor.charAt(0).toUpperCase() + flavor.slice(1)}">${flavor.charAt(0).toUpperCase() + flavor.slice(1)} (RN)</div>`;

		selectedQuantitiesRN += `<input type="number" id="${flavor}-rn-quantity" class="quantity-selected-rn arrow-only" readonly min="1" max="${quantity}" step="1" value="1" style="display:none;">`;
	}

	console.log(document.getElementsByClassName("page")[0]);
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
            <div class="box-title">Build Order</div>
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
	
	document.querySelectorAll('.flavor').forEach(el => {
	el.addEventListener('click', (e) => process(e));
});

document.getElementById("button").addEventListener("click", () => submitOrder());
}


function process(e) {
	console.log(e.target.id);
	toggleDisplay(e.target.id + "-selected");
	toggleDisplay(e.target.id + "-quantity");
}

function toggleDisplay(id) {
	const el = document.getElementById(id);
	if (!el) return; // safety check

	if (el.style.display != "block") {
		el.style.display = "block"; // show it
	} else {
		el.style.display = "none"; // hide it
	}
}

function submitOrder() {
	const order = returnOrder();
	const readyNow = returnReadyNow();
	console.log("order:" + JSON.stringify(order));
	console.log("readyNow:" + JSON.stringify(readyNow));

	let message = formMessage(order, readyNow);
	confirmOrder(message, order, readyNow);
	// refresh the page
}

function returnOrder() {
	const result = {};
	const flavors = document.querySelectorAll('.flavor-selected');
	const quantities = document.querySelectorAll('.quantity-selected');

	flavors.forEach((flavor, index) => {
		const style = window.getComputedStyle(flavor);
		if (style.display === "block") {
			const quantityInput = quantities[index];
			const quantity = quantityInput.value || quantityInput.placeholder || "0";
			result[flavor.textContent.trim()] = quantity;
		}
	});

	return result;
}

function returnReadyNow() {
	const result = {};
	const flavors = document.querySelectorAll('.flavor-selected-rn');
	const quantities = document.querySelectorAll('.quantity-selected-rn');

	flavors.forEach((flavor, index) => {
		const style = window.getComputedStyle(flavor);
		if (style.display === "block") {
			const quantityInput = quantities[index];
			const quantity = quantityInput.value || quantityInput.placeholder || "0";
			
			result[flavor.dataset.name.trim()] = quantity;
		}
	});

	return result;
}


function formMessage(order, readyNow) {
	const orderString = Object.entries(order).map(([flavor, qty]) => `${flavor}: ${qty}`).join('\n');
	const readyNowString = Object.entries(readyNow).map(([flavor, qty]) => `${flavor}: ${qty}`).join('\n');
	let message = "";
	
	if (orderString.trim() && readyNowString.trim()) {
		message += `Ready Now Order\n` + readyNowString;
		message += "\n\n";
		message += `Next Kombucha Order\n` + orderString;
	} else if (orderString.trim()) {
		message += `Kombucha Order\n` + orderString;
	}
	else if (readyNowString.trim()) {
		message += `Ready Now Order\n` + readyNowString;
	}
	
	
	console.log(message);
	return message;
}

function confirmOrder(message, order, readyNow) {
	customConfirm(`Please confirm this is your order.\n${message}`).then((result) => {
		if (result) {
			let update = {
				"inventory": updateInventory(inventory, order),
				"readyNow": updateInventory(inventory, readyNow)
			}	
			// writeDB("", update);
			console.log(update);
			// sendMessage(message);
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


function sendMessage(message) {
	const url = `sms:$+17067508106?&body=${encodeURIComponent(message)}`;
	window.location.href = url;
}

function updateInventory(inventory, order) {
  // Make a copy so the original inventory is not mutated
  let updatedInventory = { ...inventory };

  for (let item in order) {
    let normalizedItem = item.toLowerCase(); // normalize casing
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

