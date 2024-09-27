import Analyser from "./analyser.js";
import Printer from "./printer.js";

let input = document.getElementById("input");
let panelDiv = document.getElementById("panel");
panelDiv.addEventListener('click', () => {
    input.focus();
});


let valueRef =  [ 'r1', 'r2', 'r3','j1', 'j2', 'j3','b1', 'b2', 'b3', 'v1', 'v2', 'v3'];
let grid = [];
let height = 4;
let width = 6;
let index = 0;

let analyser = new Analyser(height, width);
let printer = new Printer(height, width);

newGame();

input.addEventListener('input', (e) => {
    onChange(e.target.value);
});

addRaccourciButton();

function onChange(value)  {
    let found = false;
    let position = [];
    let error = "";

    switch ( value ) {
        case 'n':
            newGame();
            found = true;
            break;
        case '-':
            MouvCursor(-1);
            printer.print(grid, index, position, error);
            found = true;
            break;
        case '+':
            MouvCursor(1);
            printer.print(grid, index, position, error);
            found = true;
            break;
        case 'é':
            found = true;
    }

    if ( found ) {
        input.value = '';
        return;
    }

    for (let i = 0; i < valueRef.length; i++) {
        if (valueRef[i] == value ) {
            found = true;
            let isUnique = analyser.check(grid, value, index);
            position = analyser.getPosition();
            console.log(isUnique);
            console.log(position);
            
            if ( !isUnique ) {
                error = "Blop déjà trouver";
                break;
            }
            addToGrid(value);
            break;
        }
    }

    if ( found ) {
        input.value = '';
        printer.print(grid, index, position, error);
    }
}

function addToGrid(value) {
    grid[Math.floor(index / height)][index % height] = value;
    MouvCursor(1);
}

function newGame() {
    index = 0;
    initArray();
    printer.print(grid, index);
}

function MouvCursor(value) {
    if ( index + value < 0 || index + value > height * width) return;
    index += value;
}

function initArray() {
    let char = '---';
    for (let i = 0; i < width; i++) {
        let part = [];
        for (let j = 0; j < height; j++) {
            part[j] = char;
        }
        grid[i] = part;
    }
}

function addRaccourciButton() {

    let otherButton = [
        {
            name: "Plus",
            change: "+"
        },
        {
            name: "Moin",
            change: "-"
        },
        {
            name: "New",
            change: "n"
        },
    ];
    raccourci = document.getElementById("raccourci");

    for (let i = 0; i < valueRef.length; i++) {
        let button = document.createElement("button");
        button.setAttribute("id", valueRef[i]);
        button.innerHTML = valueRef[i].toUpperCase();
        button.addEventListener("click",(e) => {
            onChange(e.target.id);
        });
        raccourci.append(button);
    }

    for (let i = 0; i < otherButton.length; i++) {
        ;
        let plusButton = document.createElement("button");
        plusButton.setAttribute("id", otherButton[i].name.toLowerCase());
        plusButton.innerHTML = otherButton[i].name;
        plusButton.addEventListener("click",() => {
            onChange(otherButton[i].change);
        });
        raccourci.append(plusButton);
    }
}
