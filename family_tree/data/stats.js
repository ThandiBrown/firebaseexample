// import { originalFamilyData } from './stats.js'

function originalFamilyData() {
  return {
    "a": {
      "parents": [],
      "children": [
        "b",
        "c",
        "d",
        "e"
      ]
    },
    "b": {
      "parents": [
        "a"
      ],
      "children": [
        "f",
        "g"
      ]
    },
    "c": {
      "parents": [
        "a"
      ],
      "children": [
        "h",
        "i"
      ]
    },
    "d": {
      "parents": [
        "a", "u"
      ],
      "children": [
        "j",
        "k"
      ]
    },
    "u": {
      "parents": [],
      "children": [
        "r",
        "s"
      ]
    },
    "e": {
      "parents": [
        "a"
      ],
      "children": [
        "l",
        "m"
      ]
    },
    "f": {
      "parents": [
        "b"
      ],
      "children": []
    },
    "g": {
      "parents": [
        "b"
      ],
      "children": [
        "n"
      ]
    },
    "h": {
      "parents": [
        "c"
      ],
      "children": []
    },
    "i": {
      "parents": [
        "c"
      ],
      "children": []
    },
    "j": {
      "parents": [
        "d"
      ],
      "children": [
        "o"
      ]
    },
    "k": {
      "parents": [
        "d"
      ],
      "children": [
        "p"
      ]
    },
    "l": {
      "parents": [
        "e"
      ],
      "children": [
        "q"
      ]
    },
    "m": {
      "parents": [
        "e"
      ],
      "children": []
    },
    "n": {
      "parents": [
        "g"
      ],
      "children": []
    },
    "o": {
      "parents": [
        "j"
      ],
      "children": []
    },
    "p": {
      "parents": [
        "k"
      ],
      "children": []
    },
    "q": {
      "parents": [
        "l"
      ],
      "children": []
    }
  }
}


export {
  originalFamilyData
}
