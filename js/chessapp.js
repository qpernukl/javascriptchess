class Piece {
    constructor(color, type) {
        this.color = color;
        this.type = type;
    }

    draw(parent) {
        let el = elt('div',
            {class: `piece ${this.color} ${this.type}`});
        parent.appendChild(el);
    }
}

class PawnIterator {
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

class BoardIterator {
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

class KnightIterator {
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

function elt(name, attrs = {}, ...children) {
    let dom = document.createElement(name);
    for (let attr of Object.keys(attrs)) {
        dom.setAttribute(attr, attrs[attr]);
    }
    for (let child of children) {
        dom.appendChild(child);
    }
    return dom;
}

function stringToArray(square) {
    return [square[0], ... square[1]].map((s) => parseInt(s));
}

function inbounds(x, y) {
    return x >=0 && x < 8 && y >= 0 && y < 8;
}

function pawnOnStartSquare(square) {
    return square[0] == 1 || square[0] == 6;
}

function collectMoves(pieces, square) {
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

class Board {
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

class ChessBoard extends Board {
    constructor() {
        let pieces = new Map();
        pieces.set("00", new Piece("black", "rook"));
        pieces.set("01", new Piece("black", "knight"));
        pieces.set("02", new Piece("black", "bishop"));
        pieces.set("03", new Piece("black", "queen"));
        pieces.set("04", new Piece("black", "king"));
        pieces.set("05", new Piece("black", "bishop"));
        pieces.set("06", new Piece("black", "knight"));
        pieces.set("07", new Piece("black", "rook"));

        pieces.set("70", new Piece("white", "rook"));
        pieces.set("71", new Piece("white", "knight"));
        pieces.set("72", new Piece("white", "bishop"));
        pieces.set("73", new Piece("white", "queen"));
        pieces.set("74", new Piece("white", "king"));
        pieces.set("75", new Piece("white", "bishop"));
        pieces.set("76", new Piece("white", "knight"));
        pieces.set("77", new Piece("white", "rook"));

        for (let i = 0; i < 8; i++) {
            pieces.set(`1${i}`, new Piece("black", "pawn"));
            pieces.set(`6${i}`, new Piece("white", "pawn"));
        }
        let moveList = new MoveList(document.getElementById("move-list-panel"));
        super(8, pieces, (move) => {
            moveList.syncUI(move);
        });
    }
}

const pieceMap = new Map([['pawn', ''], ['knight', 'N'], ['bishop', 'B'], ['rook', 'R'], ['queen', 'Q'],  ['king', 'K']]);
const fileMap = new Map([['0', 'a', ], ['1', 'b'], ['2', 'c'], ['3', 'd'], ['4', 'e'],['5','f'],['6', 'g'], ['7', 'h']]);

class PGNGenerator {
    constructor() {
    }

    convertMove = (move) => {
        let pgn = '';
        pgn = pgn.concat(pieceMap.get(move.piece.type));
        if(move.capturing) {
            if(move.piece.type == "pawn") {
                pgn = pgn.concat(fileMap.get(move.start[1]));
            }
            pgn = pgn.concat('x');
        }
        pgn = pgn.concat(fileMap.get(move.end[1]));
        pgn = pgn.concat(parseInt(8 - move.end[0]));
        return pgn;
    }
}

class MoveList {
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

