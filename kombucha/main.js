import { readDB, writeDB } from './data/talkToDatabase.js'




// loadingSettings();

function loadingSettings() {
		
		quantity = {
				"mango": 3,
				"apple": 2,
				"passionfruit": 3
		}
		
		// writeDB({'info':JSON.stringify({})});
		readDB("", loadingPage);
}

function loadingPage(response) {
		console.log("response")
		console.log(response[0])

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
	const order = returnDictionary();
	
	// saveData();
	let message = formMessage(order);
	confirmOrder(message);
}

function returnDictionary() {
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

	console.log(result);
	return result;
}

function saveData() {
	
}

function formMessage(order) {
	const orderString = Object.entries(order).map(([flavor, qty]) => `${flavor}: ${qty}`).join('\n');
	if (!orderString.trim()) {
		return ;
	}
	const message = `Kombucha Order\n` + orderString;
	console.log(message);
	return message;
}

function sendMessage(message) {
	const url = `sms:$+17067508106?&body=${encodeURIComponent(message)}`;
	window.location.href = url;
}

document.querySelectorAll('.flavor').forEach(el => {
	el.addEventListener('click', (e) => process(e));
});

document.getElementById("button").addEventListener("click", () => submitOrder());

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

  // Example usage
  
function confirmOrder(message) {
	customConfirm(`Please confirm this is your order.\n${message}`).then((result) => {
		if (result) 
			sendMessage(message);
		else 
			console.log("User cancelled the action.");
	});
}
  
