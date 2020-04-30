import {elt} from "./utils";

export class Piece {
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