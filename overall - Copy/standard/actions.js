




function toggleMultipleStatuses(element, statuses) {
    let updated = false;
    let status = '';
    let previous = '';

    for (let i = 0; i < statuses.length - 1; i++) {
        if (element.classList.contains(statuses[i])) {
            element.classList.remove(statuses[i]);
            element.classList.add(statuses[i + 1]);
            status = statuses[i + 1];
            previous = statuses[i];
            updated = true;
            break;
        }
    }
    if (!updated) {
        if (element.classList.contains(statuses[statuses.length - 1])) {
            // contains last class
            element.classList.remove(statuses[statuses.length - 1]);
            previous = statuses[statuses.length - 1];
        } else {
            // contains no classes
            element.classList.add(statuses[0]);
            status = statuses[0];
        }
    }


    return [status, previous];
}










export {
    toggleMultipleStatuses
}