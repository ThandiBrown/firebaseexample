

function removeClickableElements() {
    let clickableElements = [
        ...document.querySelectorAll("checkbox"),
        ...document.querySelectorAll("checkmark"),
        ...document.querySelectorAll("inputBackground")
    ];
    console.log(clickableElements);
}

removeClickableElements();