
class Printer {
    constructor(height, width){
        this.spaceChar = ' | ';
        this.linebreack = '<br>';
        this.consoleDiv = document.getElementById("console");
        this.height = height;
        this.width = width;
    }

    print( grid, index, position = [], error = "", ) {
        this.reset();
        let indexHeight = Math.floor(index / this.height);
        let indexWidth = index % this.height;
        for (let i = 0; i < grid.length; i++) {
            this.consoleDiv.innerHTML += this.spaceChar;
            for (let j = 0; j < grid[i].length; j++) {
                // add selected tag if case is in the index pos
                
                if ( indexHeight == i && indexWidth == j) {
                    this.consoleDiv.innerHTML +='<span class="selected">' +  grid[i][j] + '</span>' + this.spaceChar;
                }
                // add found tag if it the found case or if it the case right before the selected
                else if ( position.length == 2 && ( position[0].height == i && position[0].width == j ) || (position[1] && position[1].height == i && position[1].width == j)) {
                    this.consoleDiv.innerHTML += '<span class="found">' +  grid[i][j] + '</span>' + this.spaceChar;
                }
                else this.consoleDiv.innerHTML +=  grid[i][j] +  this.spaceChar;
            }
            this.addLineBreak();
        }
        this.addLineBreak();
        this.consoleDiv.innerHTML += error;
    }

    reset() {
        this.consoleDiv.innerHTML = '';
    }

    addLineBreak() {
        this.consoleDiv.innerHTML += this.linebreack;
    }
}

export default Printer;