import {PawnIterator} from "../js/pawn-iterator";
import {Piece} from "../js/piece";


const pieces = new Map();
pieces.set("63", new Piece("white", "pawn"));
pieces.set("52", new Piece("black", "pawn"));
pieces.set("54", new Piece("black", "rook"));

describe("PawnIterator", () => {
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

    describe("capturing moves", () => {
        test("finds capturing moves", () => {
            let iter = new PawnIterator(pieces, "63");
            iterate(iter);
            expect(result).toContain("52");
            expect(result).toContain("54");
        });

        test("find capturing move with same color piece", () => {
            afterEach(() => {
                pieces.delete("52");
            });
            pieces.delete("52");
            let iter = new PawnIterator(pieces, "63");
            iterate(iter);
            expect(result).not.toContain("52");
            expect(result).toContain("54");
        });
    });

    describe("forward moves", () => {
        test("finds forward moves", () => {
            let iter = new PawnIterator(pieces, "63");
            iterate(iter);
            expect(result).toContain("53");
            expect(result).toContain("43");
        });

        test("finds forward when piece is obstructing", () => {
            afterEach(() => {
               pieces.delete("43");
            });
            pieces.set("43", new Piece("black", "knight"));
            let iter = new PawnIterator(pieces, "63");
            iterate(iter);
            expect(result).toContain("53");
            expect(result).not.toContain("43");
        });

        test("find forward piece when it's not the first move", () => {
            afterEach(() => {
                pieces.delete("43");
            });
            pieces.set("43", new Piece("white", "pawn"));
            let iter = new PawnIterator(pieces, "43");
            iterate(iter);
            expect(result).toContain("33");
            expect(result.length).toEqual(1);
        });
    });
});






