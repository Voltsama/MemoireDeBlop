let input = document.getElementById("input");
let consoleDiv = document.getElementById("console");
let panelDiv = document.getElementById("panel");
panelDiv.addEventListener('click', () => {
    input.focus();
});

let array = [];
let height = 4;
let width = 6;
let index = 0;

let foundPosition = '';
let foundIndexWidth = -1;
let foundIndexHeight = -1;

initArray();

input.addEventListener('input', onChange );

let valueRef =  ['v1', 'v2', 'v3', 'r1', 'r2', 'r3','j1', 'j2', 'j3','b1', 'b2', 'b3'];

function onChange()  {
    let value = input.value;
    foundPosition = '';
    foundIndexWidth = -1;
    foundIndexHeight = -1;
    let found = false;
    for (let i = 0; i < valueRef.length; i++) {
        if (valueRef[i] == value ) {
            checkArray(value);
            addToArray(value);
            found = true;
            break;
        }
    }

    switch ( value ) {
        case 'n':
            newGame();
            found = true;
            break;
        case '-':
            MouvCursor(-1);
            found = true;
            break;
        case '+':
            MouvCursor(1);
            found = true;
            break;
        case 'é':
            found = true;
    }

    if ( found ) {
        input.value = '';
    }
}

function addToArray(value) {
    array[Math.floor(index / height)][index % height] = value;
    MouvCursor(1);
    printArray();
}

function newGame() {
    index = 0;
    initArray();
}

function MouvCursor(value) {
    index += value;
    printArray();
}

function printArray(){
    let spaceChar = ' | ';
    let linebreack = '<br>'
    consoleDiv.innerHTML = '';
    console.log(foundIndexWidth);

    for (let i = 0; i < array.length; i++) {
        consoleDiv.innerHTML = consoleDiv.innerHTML + ' | '
        for (let j = 0; j < array[i].length; j++) {
            // add selected tag if case is in the index pos
            if ( Math.floor(index / height) == i && index % height == j) {
                consoleDiv.innerHTML = consoleDiv.innerHTML + '<span class="selected">' +  array[i][j] + '</span>' + spaceChar ;
            }
            // add found tag if it the found case or if it the case right before the selected
            else if ( foundIndexWidth == i && foundIndexHeight == j || foundIndexWidth >= 0 && Math.floor((index - 1) / height) == i && (index - 1) % height == j) {
                consoleDiv.innerHTML = consoleDiv.innerHTML + '<span class="found">' +  array[i][j] + '</span>' + spaceChar ;
            }
            else consoleDiv.innerHTML = consoleDiv.innerHTML +  array[i][j] +  spaceChar;
        }
        consoleDiv.innerHTML = consoleDiv.innerHTML +  linebreack;
    }
    consoleDiv.innerHTML += linebreack;
    consoleDiv.innerHTML += foundPosition;
}

function initArray() {
    let char = '---';
    for (let i = 0; i < width; i++) {
        let part = [];
        for (let j = 0; j < height; j++) {
            part[j] = char;
        }
        array[i] = part;
    }
    printArray();
}

function checkArray(value) {
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            if ( array[i][j] == value ) {
                foundPosition = 'Col: '+ (i + 1) + ' Row: ' + (j + 1);
                foundIndexHeight = j;
                foundIndexWidth = i;
            }
        }
    }
}
