import {KnightIterator} from "./knight-iterator";
import {BoardIterator} from "./board-iterator";
import {PawnIterator} from "./pawn-iterator";

export function elt(name, attrs = {}, ...children) {
    let dom = document.createElement(name);
    for (let attr of Object.keys(attrs)) {
        dom.setAttribute(attr, attrs[attr]);
    }
    for (let child of children) {
        dom.appendChild(child);
    }
    return dom;
}

export function stringToArray(square) {
    return [square[0], ... square[1]].map((s) => parseInt(s));
}

export function inbounds(x, y) {
    return x >=0 && x < 8 && y >= 0 && y < 8;
}

export function pawnOnStartSquare(square) {
    return square[0] == 1 || square[0] == 6;
}

export function collectMoves(pieces, square) {
    if(!pieces.has(square)) {
        return [];
    }
    let iterators = [];
    switch(pieces.get(square).type) {
        case "knight":
            iterators.push(KnightIterator.knight(pieces, square));
            break;
        case "bishop":
            iterators.push(BoardIterator.diag(pieces, square));
            break;
        case "rook":
            iterators.push(BoardIterator.rank(pieces, square));
            iterators.push(BoardIterator.file(pieces, square));
            break;
        case "queen":
            iterators.push(BoardIterator.rank(pieces, square));
            iterators.push(BoardIterator.file(pieces, square));
            iterators.push(BoardIterator.diag(pieces, square));
            break;
        case "pawn":
            iterators.push(PawnIterator.pawn(pieces, square));
            break;
    }
    return runIterators(iterators);
}

function runIterators(iterators) {
    let moves = [];
    iterators.forEach((iter) => {
        for(let move of iter) {
            moves.push(move);
        }
    });
    return moves;
}

