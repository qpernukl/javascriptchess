const pieceMap = new Map([['pawn', ''], ['knight', 'N'], ['bishop', 'B'], ['rook', 'R'], ['queen', 'Q'],  ['king', 'K']]);
const fileMap = new Map([['0', 'a', ], ['1', 'b'], ['2', 'c'], ['3', 'd'], ['4', 'e'],['5','f'],['6', 'g'], ['7', 'h']]);
export class PGNGenerator {
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