import {BoardIterator} from "../js/board-iterator";
import {Piece} from "../js/piece";

const pieces = new Map();
pieces.set("45", new Piece("white", "bishop"));
pieces.set("12", new Piece("black", "pawn"));
pieces.set("14", new Piece("black", "knight"));
pieces.set("50", new Piece("white", "queen"));
pieces.set("56", new Piece("white", "queen"));
pieces.set("23", new Piece("black", "queen"));

describe("BoardIterator", () => {
    let result = [];

    const iterate = (iterator) => {
        for(let piece of iterator) {
            if(!!piece) {
                result.push(piece);
            }
        }
    };

    beforeEach(() => {
        result = [];
    });

    describe("iterating along a rank", () => {
        test("when x is increasing", () => {
            let diagIterator = BoardIterator.rank(pieces, "45", "47");
            iterate(diagIterator);
            expect(result).toEqual(["46", "47", "44", "43", "42", "41", "40"]);
        });
    });

    describe("iterating along a file", () => {
        test("when y is increasing", () => {
            let diagIterator = BoardIterator.file(pieces, "14", "64");
            iterate(diagIterator);
            expect(result).toEqual(["24", "34", "44", "54", "64", "74", "04"]);
        });
    });

    describe("iterating diagonally", () => {
        test("when y is increasing and x is increasing", () => {
            let diagIterator = BoardIterator.diag(pieces,  "12", "56");
            iterate(diagIterator);
            expect(result).toEqual(["01", "03", "21", "30"]);
        });
        test("when y is decreasing and x is decreasing", () => {
            let diagIterator = BoardIterator.diag(pieces, "56", "12");
            iterate(diagIterator);
            expect(result).toEqual(["67", "47", "65", "74"])
        });
        test("iterates when y is decreasing and x is increasing", () => {
            let diagIterator = BoardIterator.diag(pieces,"23", "05");
            iterate(diagIterator);
            expect(result).toEqual(["34", "45", "32", "41", "50"]);
        });
        test("iterates when x is decreasing and y is increasing", () => {
            let diagIterator = BoardIterator.diag(pieces,"23", "50");
            iterate(diagIterator);
            expect(result).toEqual(["34", "45", "32", "41", "50"]);
        });
    });
});






