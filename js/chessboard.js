import {Board} from "./board";
import {Piece} from "./piece";
import {MoveList} from "./move-list";

export class ChessBoard extends Board {
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
