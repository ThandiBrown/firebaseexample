

function removeClickableElements() {
    let clickableElements = [
        ...document.querySelectorAll("input[type=checkbox]"),
        ...document.querySelectorAll(".checkmark"),
        ...document.querySelectorAll(".inputBackground"),

    ];

    for (let element of clickableElements) {
        element.remove();
    }

    // let i = 0;
    // document.querySelectorAll('.container').forEach(
    //     function (label) {
    //         if (i < 34) {
    //             label.remove();
    //             i++;
    //         }
    //     }
    // );
}

export {
    removeClickableElements
}