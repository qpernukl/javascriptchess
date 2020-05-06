/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/chess.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/board-iterator.js":
/*!**********************************!*\
  !*** ./src/js/board-iterator.js ***!
  \**********************************/
/*! exports provided: BoardIterator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BoardIterator\", function() { return BoardIterator; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n\n\nclass BoardIterator {\n    constructor(pieces, type, start, end) {\n        this.pieces = pieces;\n        this.dx = (type == \"diag\" || type == \"rank\") ? 1 : 0;\n        this.dy = (type == \"diag\" || type == \"file\") ? 1 : 0;\n        this.type = type;\n        this.start = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"stringToArray\"])(start);\n    }\n\n    static diag(pieces, start, end) {\n        return new BoardIterator(pieces, \"diag\", start, end)\n    }\n\n    static rank(pieces, start, end) {\n        return new BoardIterator(pieces, \"rank\", start, end)\n    }\n\n    static file(pieces, start, end) {\n        return new BoardIterator(pieces, \"file\", start, end)\n    }\n}\n\nBoardIterator.prototype[Symbol.iterator] = function* () {\n    const inbounds = (x, y) => {\n        return x >= 0 && x < 8 && y >= 0 && y < 8;\n    };\n\n    let directions = [[1, 1], [-1,-1]];\n\n    if(this.type == \"diag\") {\n        directions.push([-1,1]);\n        directions.push([1,-1]);\n    }\n\n    for (let k of directions) {\n        let i = this.start[0] + this.dy * k[0];\n        let j = this.start[1] + this.dx * k[1];\n        while (inbounds(i, j)) {\n            if(this.pieces.has(`${i}${j}`)) {\n                if(this.pieces.get(`${i}${j}`).color !=\n                    this.pieces.get(`${this.start[0]}${this.start[1]}`).color) {\n                    yield `${i}${j}`;\n                }\n                break;\n            }\n            yield `${i}${j}`;\n            i += this.dy * k[0];\n            j += this.dx * k[1];\n        }\n    }\n};\n\n//# sourceURL=webpack:///./src/js/board-iterator.js?");

/***/ }),

/***/ "./src/js/board.js":
/*!*************************!*\
  !*** ./src/js/board.js ***!
  \*************************/
/*! exports provided: Board */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Board\", function() { return Board; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n\n\nclass Board {\n    constructor(size, pieces, dispatch) {\n        this.size = size;\n        this.pieces = pieces;\n        this.moveStart = null;\n        this.dispatch = dispatch;\n    }\n\n    draw(parent) {\n        this.board = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"elt\"])(\"table\", {id: \"board\"});\n        for (let i = 0; i < this.size; i++) {\n            let row = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"elt\"])(\"tr\");\n            for (let j = 0; j < this.size; j++) {\n                let td = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"elt\"])(\"td\",\n                    {id: `${i}${j}`, class: (i + j) % 2 == 0 ? \"even\" : \"odd\"});\n                row.appendChild(td);\n                let square = `${i}${j}`;\n                if (this.pieces.has(square)) {\n                    this.pieces.get(square).draw(td);\n                }\n            }\n            this.board.appendChild(row);\n        }\n        parent.appendChild(this.board);\n\n        this.board.addEventListener(\"click\", (event) => {\n            let td = event.target.closest(\"td\");\n            let j = td.cellIndex;\n            let i = event.target.closest(\"tr\").rowIndex;\n            let proposedMove = `${i}${j}`;\n            if (!this.moveStart) {\n                this.candidateMoves = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"collectMoves\"])(this.pieces, proposedMove);\n                if (this.candidateMoves.length > 0) {\n                    this.candidateMoves.forEach((move) => {\n                        document.getElementById(move).classList.add(\"candidate-move\");\n                    });\n                    this.moveStart = this.pieces.has(proposedMove) ? proposedMove : null;\n                }\n            } else if (this.candidateMoves.indexOf(proposedMove) == -1) {\n                this.moveStart = null;\n                this.candidateMoves.forEach((move) => {\n                    document.getElementById(move).classList.remove(\"candidate-move\");\n                });\n                this.candidateMoves = [];\n            } else {\n                let capturing = this.pieces.has(proposedMove);\n                this.move(this.moveStart, proposedMove);\n                this.candidateMoves.forEach((move) => {\n                    document.getElementById(move).classList.remove(\"candidate-move\");\n                });\n                this.candidateMoves = [];\n                this.dispatch({\n                    capturing: capturing,\n                    start: this.moveStart,\n                    end: proposedMove,\n                    piece: this.pieces.get(proposedMove)\n                });\n                this.moveStart = null;\n            }\n        });\n    }\n\n    move(start, end) {\n        let tdStart = document.getElementById(`${start}`);\n        let tdEnd = document.getElementById(`${end}`);\n\n        if (!tdStart) {\n            throw new Error(`No piece is currently on start square ${start}`);\n        }\n\n        let piece = tdStart.removeChild(tdStart.firstChild);\n        if (tdEnd.firstChild) {\n            tdEnd.removeChild(tdEnd.firstChild);\n        }\n        tdEnd.appendChild(piece);\n        this.pieces.set(end, this.pieces.get(start));\n        this.pieces.delete(start);\n    }\n\n    destroy() {\n        this.board.removeEventListeners(\"click\");\n    }\n}\n\n\n//# sourceURL=webpack:///./src/js/board.js?");

/***/ }),

/***/ "./src/js/chess.js":
/*!*************************!*\
  !*** ./src/js/chess.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chessboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chessboard */ \"./src/js/chessboard.js\");\n\n\nfunction initGame() {\n    let board = new _chessboard__WEBPACK_IMPORTED_MODULE_0__[\"ChessBoard\"]();\n    board.draw(document.getElementById(\"board-panel\"));\n    window.addEventListener(\"unload\", () => {\n        board.destroy();\n    });\n}\n\nwindow.addEventListener(\"load\", () => initGame());\n\n\n//# sourceURL=webpack:///./src/js/chess.js?");

/***/ }),

/***/ "./src/js/chessboard.js":
/*!******************************!*\
  !*** ./src/js/chessboard.js ***!
  \******************************/
/*! exports provided: ChessBoard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ChessBoard\", function() { return ChessBoard; });\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/js/board.js\");\n/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./piece */ \"./src/js/piece.js\");\n/* harmony import */ var _move_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./move-list */ \"./src/js/move-list.js\");\n\n\n\n\nclass ChessBoard extends _board__WEBPACK_IMPORTED_MODULE_0__[\"Board\"] {\n    constructor() {\n        let pieces = new Map();\n        pieces.set(\"00\", new _piece__WEBPACK_IMPORTED_MODULE_1__[\"Piece\"](\"black\", \"rook\"));\n        pieces.set(\"01\", new _piece__WEBPACK_IMPORTED_MODULE_1__[\"Piece\"](\"black\", \"knight\"));\n        pieces.set(\"02\", new _piece__WEBPACK_IMPORTED_MODULE_1__[\"Piece\"](\"black\", \"bishop\"));\n        pieces.set(\"03\", new _piece__WEBPACK_IMPORTED_MODULE_1__[\"Piece\"](\"black\", \"queen\"));\n        pieces.set(\"04\", new _piece__WEBPACK_IMPORTED_MODULE_1__[\"Piece\"](\"black\", \"king\"));\n        pieces.set(\"05\", new _piece__WEBPACK_IMPORTED_MODULE_1__[\"Piece\"](\"black\", \"bishop\"));\n        pieces.set(\"06\", new _piece__WEBPACK_IMPORTED_MODULE_1__[\"Piece\"](\"black\", \"knight\"));\n        pieces.set(\"07\", new _piece__WEBPACK_IMPORTED_MODULE_1__[\"Piece\"](\"black\", \"rook\"));\n\n        pieces.set(\"70\", new _piece__WEBPACK_IMPORTED_MODULE_1__[\"Piece\"](\"white\", \"rook\"));\n        pieces.set(\"71\", new _piece__WEBPACK_IMPORTED_MODULE_1__[\"Piece\"](\"white\", \"knight\"));\n        pieces.set(\"72\", new _piece__WEBPACK_IMPORTED_MODULE_1__[\"Piece\"](\"white\", \"bishop\"));\n        pieces.set(\"73\", new _piece__WEBPACK_IMPORTED_MODULE_1__[\"Piece\"](\"white\", \"queen\"));\n        pieces.set(\"74\", new _piece__WEBPACK_IMPORTED_MODULE_1__[\"Piece\"](\"white\", \"king\"));\n        pieces.set(\"75\", new _piece__WEBPACK_IMPORTED_MODULE_1__[\"Piece\"](\"white\", \"bishop\"));\n        pieces.set(\"76\", new _piece__WEBPACK_IMPORTED_MODULE_1__[\"Piece\"](\"white\", \"knight\"));\n        pieces.set(\"77\", new _piece__WEBPACK_IMPORTED_MODULE_1__[\"Piece\"](\"white\", \"rook\"));\n\n        for (let i = 0; i < 8; i++) {\n            pieces.set(`1${i}`, new _piece__WEBPACK_IMPORTED_MODULE_1__[\"Piece\"](\"black\", \"pawn\"));\n            pieces.set(`6${i}`, new _piece__WEBPACK_IMPORTED_MODULE_1__[\"Piece\"](\"white\", \"pawn\"));\n        }\n        let moveList = new _move_list__WEBPACK_IMPORTED_MODULE_2__[\"MoveList\"](document.getElementById(\"move-list-panel\"));\n        super(8, pieces, (move) => {\n            moveList.syncUI(move);\n        });\n    }\n}\n\n\n//# sourceURL=webpack:///./src/js/chessboard.js?");

/***/ }),

/***/ "./src/js/knight-iterator.js":
/*!***********************************!*\
  !*** ./src/js/knight-iterator.js ***!
  \***********************************/
/*! exports provided: KnightIterator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"KnightIterator\", function() { return KnightIterator; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n\n\nclass KnightIterator {\n    constructor(pieces, start) {\n        this.dy = [1,-1,2,-2];\n        this.dx = [2,2,1,1];\n\n        this.pieces = pieces;\n        this.start = start;\n    }\n\n    static knight(pieces, start) {\n        return new KnightIterator(pieces, start);\n    }\n}\n\nKnightIterator.prototype[Symbol.iterator] = function*() {\n    let start = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"stringToArray\"])(this.start);\n    let currentColor = this.pieces.get(this.start).color;\n    for(let k of [1,-1]) {\n        for (let i = 0; i < this.dx.length; i++) {\n            let y = this.dy[i] * k + start[0];\n            let x = this.dx[i] * k + start[1];\n            if(Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"inbounds\"])(x, y)) {\n                let sq = `${y}${x}`;\n                if(!this.pieces.has(sq) ||\n                    this.pieces.get(sq).color != currentColor){\n                    yield `${y}${x}`;\n                }\n            }\n        }\n    }\n};\n\n//# sourceURL=webpack:///./src/js/knight-iterator.js?");

/***/ }),

/***/ "./src/js/move-list.js":
/*!*****************************!*\
  !*** ./src/js/move-list.js ***!
  \*****************************/
/*! exports provided: MoveList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MoveList\", function() { return MoveList; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n/* harmony import */ var _pgn_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pgn-generator */ \"./src/js/pgn-generator.js\");\n\n\n\nclass MoveList {\n    constructor(parentElement) {\n        this.moveList = [];\n        this.element = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"elt\"])(\"textarea\", {});\n        this.pgnGenerator = new _pgn_generator__WEBPACK_IMPORTED_MODULE_1__[\"PGNGenerator\"]();\n        parentElement.appendChild(this.element);\n        this.moveCount = 0;\n    }\n\n    displayMove(move) {\n        let pgn = this.pgnGenerator.convertMove(move);\n        this.moveList.push(pgn);\n        if(move.piece.color == 'white') {\n            this.element.value += `${++this.moveCount}. ${pgn}`;\n        } else {\n            this.element.value += ` ${pgn}\\n`;\n        }\n    }\n\n    syncUI(move) {\n        this.displayMove(move);\n    }\n}\n\n//# sourceURL=webpack:///./src/js/move-list.js?");

/***/ }),

/***/ "./src/js/pawn-iterator.js":
/*!*********************************!*\
  !*** ./src/js/pawn-iterator.js ***!
  \*********************************/
/*! exports provided: PawnIterator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PawnIterator\", function() { return PawnIterator; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n\n\nclass PawnIterator {\n    constructor(pieces, start) {\n        this.start = start;\n        this.pieces = pieces;\n    }\n\n    static pawn(pieces, start) {\n        return new PawnIterator(pieces, start);\n    }\n}\n\nPawnIterator.prototype[Symbol.iterator] = function*() {\n    let s = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"stringToArray\"])(this.start);\n    let dy = this.pieces.get(this.start).color == \"white\" ? -1 : 1;\n    let currentColor = this.pieces.get(this.start).color;\n    let N = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"pawnOnStartSquare\"])(s) ? s[0]+dy*2 : s[0]+dy;\n    for(let i=s[0]+dy; i!=N+dy && Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"inbounds\"])(i, s[1]); i+=dy) {\n        let square = `${i}${s[1]}`;\n        if(Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"inbounds\"])(i, s[1]) && !this.pieces.has(square)) {\n            yield square;\n        }\n    }\n\n    let square;\n    for(let dx of [-1,1]) {\n        square = `${s[0]+dy}${s[1] + dx}`;\n        if(Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"inbounds\"])(s[0]+dy, s[1] + dx)\n            && this.pieces.has(square) && this.pieces.get(square).color != currentColor) {\n            yield square;\n        }\n    }\n};\n\n//# sourceURL=webpack:///./src/js/pawn-iterator.js?");

/***/ }),

/***/ "./src/js/pgn-generator.js":
/*!*********************************!*\
  !*** ./src/js/pgn-generator.js ***!
  \*********************************/
/*! exports provided: PGNGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PGNGenerator\", function() { return PGNGenerator; });\nconst pieceMap = new Map([['pawn', ''], ['knight', 'N'], ['bishop', 'B'], ['rook', 'R'], ['queen', 'Q'],  ['king', 'K']]);\nconst fileMap = new Map([['0', 'a', ], ['1', 'b'], ['2', 'c'], ['3', 'd'], ['4', 'e'],['5','f'],['6', 'g'], ['7', 'h']]);\nclass PGNGenerator {\n    constructor() {\n    }\n\n    convertMove(move) {\n        let pgn = '';\n        pgn = pgn.concat(pieceMap.get(move.piece.type));\n        if(move.capturing) {\n            if(move.piece.type == \"pawn\") {\n                pgn = pgn.concat(fileMap.get(move.start[1]));\n            }\n            pgn = pgn.concat('x');\n        }\n        pgn = pgn.concat(fileMap.get(move.end[1]));\n        pgn = pgn.concat(parseInt(8 - move.end[0]));\n        return pgn;\n    }\n}\n\n//# sourceURL=webpack:///./src/js/pgn-generator.js?");

/***/ }),

/***/ "./src/js/piece.js":
/*!*************************!*\
  !*** ./src/js/piece.js ***!
  \*************************/
/*! exports provided: Piece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Piece\", function() { return Piece; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n\n\nclass Piece {\n    constructor(color, type) {\n        this.color = color;\n        this.type = type;\n    }\n\n    draw(parent) {\n        let el = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"elt\"])('div',\n            {class: `piece ${this.color} ${this.type}`});\n        parent.appendChild(el);\n    }\n}\n\n//# sourceURL=webpack:///./src/js/piece.js?");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! exports provided: elt, stringToArray, inbounds, pawnOnStartSquare, collectMoves */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"elt\", function() { return elt; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"stringToArray\", function() { return stringToArray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"inbounds\", function() { return inbounds; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pawnOnStartSquare\", function() { return pawnOnStartSquare; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"collectMoves\", function() { return collectMoves; });\n/* harmony import */ var _knight_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./knight-iterator */ \"./src/js/knight-iterator.js\");\n/* harmony import */ var _board_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board-iterator */ \"./src/js/board-iterator.js\");\n/* harmony import */ var _pawn_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pawn-iterator */ \"./src/js/pawn-iterator.js\");\n\n\n\n\nfunction elt(name, attrs = {}, ...children) {\n    let dom = document.createElement(name);\n    for (let attr of Object.keys(attrs)) {\n        dom.setAttribute(attr, attrs[attr]);\n    }\n    for (let child of children) {\n        dom.appendChild(child);\n    }\n    return dom;\n}\n\nfunction stringToArray(square) {\n    return [square[0], ... square[1]].map((s) => parseInt(s));\n}\n\nfunction inbounds(x, y) {\n    return x >=0 && x < 8 && y >= 0 && y < 8;\n}\n\nfunction pawnOnStartSquare(square) {\n    return square[0] == 1 || square[0] == 6;\n}\n\nfunction collectMoves(pieces, square) {\n    if(!pieces.has(square)) {\n        return [];\n    }\n    let iterators = [];\n    switch(pieces.get(square).type) {\n        case \"knight\":\n            iterators.push(_knight_iterator__WEBPACK_IMPORTED_MODULE_0__[\"KnightIterator\"].knight(pieces, square));\n            break;\n        case \"bishop\":\n            iterators.push(_board_iterator__WEBPACK_IMPORTED_MODULE_1__[\"BoardIterator\"].diag(pieces, square));\n            break;\n        case \"rook\":\n            iterators.push(_board_iterator__WEBPACK_IMPORTED_MODULE_1__[\"BoardIterator\"].rank(pieces, square));\n            iterators.push(_board_iterator__WEBPACK_IMPORTED_MODULE_1__[\"BoardIterator\"].file(pieces, square));\n            break;\n        case \"queen\":\n            iterators.push(_board_iterator__WEBPACK_IMPORTED_MODULE_1__[\"BoardIterator\"].rank(pieces, square));\n            iterators.push(_board_iterator__WEBPACK_IMPORTED_MODULE_1__[\"BoardIterator\"].file(pieces, square));\n            iterators.push(_board_iterator__WEBPACK_IMPORTED_MODULE_1__[\"BoardIterator\"].diag(pieces, square));\n            break;\n        case \"pawn\":\n            iterators.push(_pawn_iterator__WEBPACK_IMPORTED_MODULE_2__[\"PawnIterator\"].pawn(pieces, square));\n            break;\n    }\n    return runIterators(iterators);\n}\n\nfunction runIterators(iterators) {\n    let moves = [];\n    iterators.forEach((iter) => {\n        for(let move of iter) {\n            moves.push(move);\n        }\n    });\n    return moves;\n}\n\n\n\n//# sourceURL=webpack:///./src/js/utils.js?");

/***/ })

/******/ });