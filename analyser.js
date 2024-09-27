
class Analyser {
    constructor( height, width ) {
        this.position = [];
        this.width = width;
        this.height = height;
    }

    check(grid, value, index) {
        let found = false;
        this.position = [];
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if ( grid[i][j] == value ) {
                    this.position.push( { height : i, width: j });
                    if ( found ){
                        return false
                    };
                    found = true;
                }
            }
        }
        this.position.push({ height : Math.floor(index / this.height), width: index % this.height });
        return true;
    }

    getPosition() {
        return this.position;
    }
}

export default Analyser;
