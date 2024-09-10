
function collapseListConditionAreas(listElement) {
    /* 
    If the tag area is empty, collapse it
    */
    let area = listElement.querySelector(".list-condition-area");
    if (area.innerText.trim() == '') {
        area.style.padding = '0px';
    }
}

export {
    collapseListConditionAreas
}