const page = '.page'


function getPage() {
    return document.querySelector(".page");
}

function getListArea(pillar) {
    return pillar.querySelector(".list-area");
}

export {
    getPage,
    getListArea
}