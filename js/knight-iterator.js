import {stringToArray, inbounds} from "./utils";

export class KnightIterator {
    constructor(pieces, start) {
        this.dy = [1,-1,2,-2];
        this.dx = [2,2,1,1];

        this.pieces = pieces;
        this.start = start;
    }

    static knight(pieces, start) {
        return new KnightIterator(pieces, start);
    }
}

KnightIterator.prototype[Symbol.iterator] = function*() {
    let start = stringToArray(this.start);
    let currentColor = this.pieces.get(this.start).color;
    for(let k of [1,-1]) {
        for (let i = 0; i < this.dx.length; i++) {
            let y = this.dy[i] * k + start[0];
            let x = this.dx[i] * k + start[1];
            if(inbounds(x, y)) {
                let sq = `${y}${x}`;
                if(!this.pieces.has(sq) ||
                    this.pieces.get(sq).color != currentColor){
                    yield `${y}${x}`;
                }
            }
        }
    }
};