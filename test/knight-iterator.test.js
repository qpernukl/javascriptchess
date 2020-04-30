import {KnightIterator} from "../js/knight-iterator";
import {Piece} from "../js/piece";

describe("KnightIterator", () => {
    let result = [];
    let pieces = new Map();
    pieces.set("43", new Piece("white", "knight"))
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

    test("generates all knight moves", () => {
        let knightIterator = KnightIterator.knight(pieces, "43");
        iterate(knightIterator);
        expect(result.length).toEqual(8);
        expect(result).toContain("55", "35", "64", "24", "31", "51", "22", "62");
    });
});






