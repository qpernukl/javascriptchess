import {elt} from "./utils";
import {PGNGenerator} from "./pgn-generator";

export class MoveList {
    constructor(parentElement) {
        this.moveList = [];
        this.element = elt("textarea", {});
        this.pgnGenerator = new PGNGenerator();
        parentElement.appendChild(this.element);
        this.moveCount = 0;
    }

    displayMove(move) {
        let pgn = this.pgnGenerator.convertMove(move);
        this.moveList.push(pgn);
        if(move.piece.color == 'white') {
            this.element.value += `${++this.moveCount}. ${pgn}`;
        } else {
            this.element.value += ` ${pgn}\n`;
        }
    }

    syncUI(move) {
        this.displayMove(move);
    }
}