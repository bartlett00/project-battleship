/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/create-ship-list.js":
/*!*********************************!*\
  !*** ./src/create-ship-list.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createShipList)\n/* harmony export */ });\n//ships require a size and a name attribute\nfunction createShipList() {\n  return {\n    carrier: {\n      name: \"Carrier\",\n      size: 5,\n    },\n    battleship: {\n      name: \"Battleship\",\n      size: 4,\n    },\n    destroyer: {\n      name: \"Destroyer\",\n      size: 3,\n    },\n    submarine: {\n      name: \"Submarine\",\n      size: 3,\n    },\n    patrolBoat: {\n      name: \"Patrol Boat\",\n      size: 2,\n    },\n  };\n}\n\n\n//# sourceURL=webpack:///./src/create-ship-list.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _create_ship_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./create-ship-list */ \"./src/create-ship-list.js\");\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ GameBoard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nfunction GameBoard() {\n  /*\n      placeShip method\n        creates new ship\n        saves ship across specific coordinates\n\n      receiveAttack method\n        accepts pair of coordinates\n        if coordinates contain part of a ship\n          call hit function on correct ship\n        else\n          record coords of miss\n\n      tracks missed shots\n      checkForDefeat method\n        if all ships are sunk\n          return true\n    */\n  function createTile(row, col) {\n    return {\n      x: row,\n      y: col,\n      ship: null,\n      hit: false,\n      miss: false,\n    };\n  }\n\n  function generateBoard() {\n    let board = [];\n    for (let i = 0; i < 10; i++) {\n      let column = [];\n      for (let j = 0; j < 10; j++) {\n        let newTile = createTile(j, i);\n        column.push(newTile);\n      }\n      board.push(column);\n    }\n    return board;\n  }\n  let board = generateBoard();\n  //stores refs to all ships on the board\n  let fleet = [];\n\n  // start and end are arrays in format of [x, y]\n  const placeShip = (start, end, shipType, shipSize) => {\n    const startX = start[0];\n    const startY = start[1];\n    const endX = end[0];\n    const endY = end[1];\n\n    if (startX < 0 || startY < 0 || endX < 0 || endY < 0) {\n      throw new Error(\"cannot place ship outside of board!\");\n    }\n\n    let newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(shipType, shipSize);\n    fleet.push(newShip);\n\n    if (startX == endX) {\n      if (startY < endY) {\n        for (let i = startY; i <= endY; i++) {\n          board[startX][i].ship = newShip;\n        }\n      } else if (startY > endY) {\n        for (let i = startY; i >= endY; i--) {\n          board[startX][i].ship = newShip;\n        }\n      }\n    } else if (startY == endY) {\n      if (startX < endX) {\n        for (let i = startX; i <= endX; i++) {\n          board[i][startY].ship = newShip;\n        }\n      } else if (startX > endX) {\n        for (let i = startX; i >= endX; i--) {\n          board[i][startY].ship = newShip;\n        }\n      }\n    }\n    //if x is the same, only increment/decrement y\n    //if y is the same, only increment/decrement x\n    //ships can only be placed vertically or horizontally\n  };\n\n  const receiveAttack = (x, y) => {\n    if (board[x][y].ship !== null) {\n      board[x][y].hit = true;\n      board[x][y].ship.hit();\n    } else {\n      board[x][y].miss = true;\n    }\n  };\n\n  const checkDefeat = () => {\n    let defeatedShips = 0;\n    for (let i = 0; i < fleet.length; i++) {\n      if (fleet[i].isSunk()) {\n        defeatedShips++;\n      }\n    }\n\n    if (defeatedShips == fleet.length) {\n      return true;\n    } else {\n      return false;\n    }\n  };\n\n  return { board, placeShip, receiveAttack, checkDefeat };\n}\n\n\n//# sourceURL=webpack:///./src/gameboard.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\n\nfunction Player(name = \"Computer\") {\n  const playerName = name;\n  let gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  return {\n    playerName,\n    gameboard,\n  };\n}\n\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nfunction Ship(type, size) {\n  let length = size;\n  let hitsTaken = 0;\n  let sunk = false;\n  const shipClass = type;\n  const hit = () => {\n    hitsTaken++;\n  };\n\n  const isSunk = () => {\n    if (hitsTaken >= length) {\n      sunk = true;\n      return sunk;\n    } else {\n      sunk = false;\n      return sunk;\n    }\n  };\n\n  const checkDamage = () => {\n    return hitsTaken;\n  };\n\n  return { shipClass, length, sunk, hitsTaken, hit, isSunk, checkDamage };\n}\n\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/game.js");
/******/ 	
/******/ })()
;