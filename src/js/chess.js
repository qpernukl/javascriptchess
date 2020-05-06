import {ChessBoard} from "./chessboard";

function initGame() {
    let board = new ChessBoard();
    board.draw(document.getElementById("board-panel"));
    window.addEventListener("unload", () => {
        board.destroy();
    });
}

window.addEventListener("load", () => initGame());
