

function removeClickableElements() {
    let clickableElements = [
        ...document.querySelectorAll("input[type=checkbox]"),
        ...document.querySelectorAll(".checkmark"),
        ...document.querySelectorAll(".inputBackground")
    ];

    for (let element of clickableElements) {
        element.remove();
    }
}

export {
    removeClickableElements
}