import {collectMoves, elt} from "./utils";

export class Board {
    constructor(size, pieces, dispatch) {
        this.size = size;
        this.pieces = pieces;
        this.moveStart = null;
        this.dispatch = dispatch;
    }

    draw(parent) {
        this.board = elt("table", {id: "board"});
        for (let i = 0; i < this.size; i++) {
            let row = elt("tr");
            for (let j = 0; j < this.size; j++) {
                let td = elt("td",
                    {id: `${i}${j}`, class: (i + j) % 2 == 0 ? "even" : "odd"});
                row.appendChild(td);
                let square = `${i}${j}`;
                if (this.pieces.has(square)) {
                    this.pieces.get(square).draw(td);
                }
            }
            this.board.appendChild(row);
        }
        parent.appendChild(this.board);

        this.board.addEventListener("click", (event) => {
            let td = event.target.closest("td");
            let j = td.cellIndex;
            let i = event.target.closest("tr").rowIndex;
            let proposedMove = `${i}${j}`;
            if (!this.moveStart) {
                this.candidateMoves = collectMoves(this.pieces, proposedMove);
                if (this.candidateMoves.length > 0) {
                    this.candidateMoves.forEach((move) => {
                        document.getElementById(move).classList.add("candidate-move");
                    });
                    this.moveStart = this.pieces.has(proposedMove) ? proposedMove : null;
                }
            } else if (this.candidateMoves.indexOf(proposedMove) == -1) {
                this.moveStart = null;
                this.candidateMoves.forEach((move) => {
                    document.getElementById(move).classList.remove("candidate-move");
                });
                this.candidateMoves = [];
            } else {
                let capturing = this.pieces.has(proposedMove);
                this.move(this.moveStart, proposedMove);
                this.candidateMoves.forEach((move) => {
                    document.getElementById(move).classList.remove("candidate-move");
                });
                this.candidateMoves = [];
                this.dispatch({
                    capturing: capturing,
                    start: this.moveStart,
                    end: proposedMove,
                    piece: this.pieces.get(proposedMove)
                });
                this.moveStart = null;
            }
        });
    }

    move(start, end) {
        let tdStart = document.getElementById(`${start}`);
        let tdEnd = document.getElementById(`${end}`);

        if (!tdStart) {
            throw new Error(`No piece is currently on start square ${start}`);
        }

        let piece = tdStart.removeChild(tdStart.firstChild);
        if (tdEnd.firstChild) {
            tdEnd.removeChild(tdEnd.firstChild);
        }
        tdEnd.appendChild(piece);
        this.pieces.set(end, this.pieces.get(start));
        this.pieces.delete(start);
    }

    destroy() {
        this.board.removeEventListeners("click");
    }
}
