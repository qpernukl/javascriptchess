import {stringToArray, inbounds, pawnOnStartSquare} from "./utils";

export class PawnIterator {
    constructor(pieces, start) {
        this.start = start;
        this.pieces = pieces;
    }

    static pawn(pieces, start) {
        return new PawnIterator(pieces, start);
    }
}

PawnIterator.prototype[Symbol.iterator] = function*() {
    let s = stringToArray(this.start);
    let dy = this.pieces.get(this.start).color == "white" ? -1 : 1;
    let currentColor = this.pieces.get(this.start).color;
    let N = pawnOnStartSquare(s) ? s[0]+dy*2 : s[0]+dy;
    for(let i=s[0]+dy; i!=N+dy && inbounds(i, s[1]); i+=dy) {
        let square = `${i}${s[1]}`;
        if(inbounds(i, s[1]) && !this.pieces.has(square)) {
            yield square;
        }
    }

    let square;
    for(let dx of [-1,1]) {
        square = `${s[0]+dy}${s[1] + dx}`;
        if(inbounds(s[0]+dy, s[1] + dx)
            && this.pieces.has(square) && this.pieces.get(square).color != currentColor) {
            yield square;
        }
    }
};