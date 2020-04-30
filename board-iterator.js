import {stringToArray} from "./utils";

export class BoardIterator {
    constructor(pieces, type, start, end) {
        this.pieces = pieces;
        this.dx = (type == "diag" || type == "rank") ? 1 : 0;
        this.dy = (type == "diag" || type == "file") ? 1 : 0;
        this.type = type;
        this.start = stringToArray(start);
    }

    static diag(pieces, start, end) {
        return new BoardIterator(pieces, "diag", start, end)
    }

    static rank(pieces, start, end) {
        return new BoardIterator(pieces, "rank", start, end)
    }

    static file(pieces, start, end) {
        return new BoardIterator(pieces, "file", start, end)
    }
}

BoardIterator.prototype[Symbol.iterator] = function* () {
    const inbounds = (x, y) => {
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    };

    let directions = [[1, 1], [-1,-1]];

    if(this.type == "diag") {
        directions.push([-1,1]);
        directions.push([1,-1]);
    }

    for (let k of directions) {
        let i = this.start[0] + this.dy * k[0];
        let j = this.start[1] + this.dx * k[1];
        while (inbounds(i, j)) {
            if(this.pieces.has(`${i}${j}`)) {
                if(this.pieces.get(`${i}${j}`).color !=
                    this.pieces.get(`${this.start[0]}${this.start[1]}`).color) {
                    yield `${i}${j}`;
                }
                break;
            }
            yield `${i}${j}`;
            i += this.dy * k[0];
            j += this.dx * k[1];
        }
    }
};