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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/main.css */ \"./src/css/main.css\");\n/* harmony import */ var _ts_GameRunner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ts/GameRunner */ \"./src/ts/GameRunner.ts\");\n\n\nvar gameRoot = document.querySelector('.gameRoot');\n\nif (gameRoot !== null) {\n  var runner = new _ts_GameRunner__WEBPACK_IMPORTED_MODULE_1__.GameRunner(gameRoot);\n  runner.start();\n} else {\n  var p = document.createElement('p');\n  p.innerText = 'Error load game script - root element not found';\n  document.body.append(p);\n}\n\n//# sourceURL=webpack://otus-ts-game-of-life/./src/index.ts?");

/***/ }),

/***/ "./src/ts/GameEngine.ts":
/*!******************************!*\
  !*** ./src/ts/GameEngine.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameEngine\": () => (/* binding */ GameEngine)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar GameEngine = /*#__PURE__*/function () {\n  // private gameField: Playground;\n  function GameEngine(gameField, height, weight) {\n    _classCallCheck(this, GameEngine);\n\n    if (gameField !== undefined) {\n      this.gameField = gameField;\n    } else {\n      this.gameField = [];\n\n      for (var i = 0; i < (height !== null && height !== void 0 ? height : 10); i += 1) {\n        this.gameField.push(Array(weight !== null && weight !== void 0 ? weight : 10).fill(0));\n      }\n    }\n\n    return this;\n  }\n\n  _createClass(GameEngine, [{\n    key: \"isGameOver\",\n    value: function isGameOver() {\n      return this.gameField.every(function (r) {\n        return r.every(function (el) {\n          return el === 0;\n        });\n      });\n    }\n  }, {\n    key: \"togglePoint\",\n    value: function togglePoint(posY, posX) {\n      if (posY < this.gameField.length && posX < this.gameField[posY].length) {\n        this.gameField[posY][posX] = this.gameField[posY][posX] === 0 ? 1 : 0;\n      }\n\n      return this.gameField;\n    }\n  }, {\n    key: \"gameField\",\n    get: function get() {\n      return this.gameField;\n    },\n    set: function set(value) {\n      this.gameField = value;\n    }\n  }, {\n    key: \"stepGame\",\n    value: function stepGame() {\n      // - Если клетка жива и у нее 2−3 живых соседа, то она остается живой, иначе умирает.\n      // - Если клетка мертва и у нее 3 живых соседа, то она становится живой, иначе остается мертвой.\n      //\n      // const upperY = this.gameField.length-1;\n      // const upperX = this.gameField[0].length-1;\n      this.gameField = this.gameField.map(function (row, indY, arr) {\n        return row.map(function (c, indX) {\n          var newCellState = GameEngine.newState(indY, indX, c, arr);\n          return newCellState;\n        });\n      });\n      return this.gameField;\n    }\n  }, {\n    key: \"resizeGameField\",\n    value: function resizeGameField(height, width) {\n      var originalHeight = this.gameField.length;\n      var originalWeight = this.gameField[0].length;\n\n      if (height < originalHeight) {\n        this.gameField.splice(height, originalHeight);\n      } else {\n        for (var r = originalHeight; r < height; r += 1) {\n          this.gameField.splice(height, 0, Array(width).fill(0));\n        }\n      }\n\n      if (width < originalWeight) {\n        this.gameField.forEach(function (r) {\n          r.splice(width, originalWeight);\n        });\n      } else {\n        this.gameField.forEach(function (r) {\n          for (var i = originalWeight; i < width; i += 1) {\n            r.push(0);\n          }\n\n          r.splice(width);\n        });\n      }\n\n      return this.gameField;\n    }\n  }], [{\n    key: \"newState\",\n    value: function newState(indY, indX, currState, play) {\n      var aliveCtn = 0;\n      var curPos = 0;\n\n      for (var y = indY - 1; y <= indY + 1; y += 1) {\n        for (var x = indX - 1; x <= indX + 1; x += 1) {\n          curPos += 1;\n\n          if (!(play[y] === undefined || play[y][x] === undefined) && play[y][x] === 1 && curPos !== 5) {\n            aliveCtn += 1;\n          }\n        }\n      }\n\n      return aliveCtn === 3 || aliveCtn === 2 && currState === 1 ? 1 : 0;\n    }\n  }]);\n\n  return GameEngine;\n}();\n\n//# sourceURL=webpack://otus-ts-game-of-life/./src/ts/GameEngine.ts?");

/***/ }),

/***/ "./src/ts/GamePresenter.ts":
/*!*********************************!*\
  !*** ./src/ts/GamePresenter.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GamePresenter\": () => (/* binding */ GamePresenter)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar CellClass;\n\n(function (CellClass) {\n  CellClass[\"LIVE\"] = \"cell-live\";\n  CellClass[\"DEAD\"] = \"cell-dead\";\n})(CellClass || (CellClass = {}));\n\nvar GamePresenter = /*#__PURE__*/function () {\n  function GamePresenter(rootElement, gameEngine) {\n    _classCallCheck(this, GamePresenter);\n\n    this.rootElement = rootElement;\n    this.gameEngine = gameEngine;\n\n    _defineProperty(this, \"gameTable\", void 0);\n\n    _defineProperty(this, \"gameTableBody\", void 0);\n\n    _defineProperty(this, \"intervalHolder\", 0);\n\n    this.gameTable = document.createElement('table');\n    this.gameTableBody = this.gameTable.createTBody();\n  }\n\n  _createClass(GamePresenter, [{\n    key: \"renderActionToolBar\",\n    value: function renderActionToolBar() {\n      var _this = this;\n\n      var actionDiv = document.createElement('div');\n      var startButton = document.createElement('button');\n      startButton.innerText = 'Start';\n      actionDiv.append(startButton);\n      startButton.addEventListener('click', function (ev) {\n        ev.preventDefault();\n        clearInterval(_this.intervalHolder); // @ts-ignore\n\n        _this.intervalHolder = setInterval(function () {\n          //   console.log(this.gameEngine.stepGame());\n          _this.gameEngine.stepGame();\n\n          _this.renderGameTable();\n        }, 1000);\n      });\n      this.rootElement.append(actionDiv);\n    }\n  }, {\n    key: \"renderGameTable\",\n    value: function renderGameTable() {\n      var _this2 = this;\n\n      var gameArray = this.gameEngine.gameField;\n      this.gameTableBody.remove();\n      this.gameTableBody = this.gameTable.createTBody();\n      gameArray.forEach(function (r, index) {\n        var row = _this2.gameTableBody.insertRow(index);\n\n        r.forEach(function (cellState) {\n          var cell = row.insertCell();\n          cell.classList.add(cellState === 0 ? CellClass.LIVE : CellClass.DEAD);\n        });\n      });\n    }\n  }, {\n    key: \"renderInitialPage\",\n    value: function renderInitialPage() {\n      var _this3 = this;\n\n      var gameField = document.createElement('div');\n      this.gameTable.createTHead();\n      this.gameTable.addEventListener('click', function (e) {\n        if (e.target instanceof HTMLTableCellElement) {\n          clearInterval(_this3.intervalHolder);\n          var row = e.target.parentNode; // e.target.cellIndex;\n          // row.rowIndex;\n\n          _this3.gameEngine.togglePoint(row.rowIndex, e.target.cellIndex);\n\n          _this3.renderGameTable(); // e.target.classList.remove(CellClass.LIVE);\n          // e.target.classList.add(CellClass.DEAD);\n\n        }\n      });\n      this.rootElement.append(this.gameTable);\n      this.rootElement.append(gameField);\n      this.renderGameTable();\n      this.renderActionToolBar();\n    }\n  }]);\n\n  return GamePresenter;\n}();\n\n//# sourceURL=webpack://otus-ts-game-of-life/./src/ts/GamePresenter.ts?");

/***/ }),

/***/ "./src/ts/GameRunner.ts":
/*!******************************!*\
  !*** ./src/ts/GameRunner.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameRunner\": () => (/* binding */ GameRunner)\n/* harmony export */ });\n/* harmony import */ var _GamePresenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GamePresenter */ \"./src/ts/GamePresenter.ts\");\n/* harmony import */ var _GameEngine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameEngine */ \"./src/ts/GameEngine.ts\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nvar GameRunner = function GameRunner(rootElement) {\n  _classCallCheck(this, GameRunner);\n\n  _defineProperty(this, \"start\", function () {});\n\n  var gameEngine = new _GameEngine__WEBPACK_IMPORTED_MODULE_1__.GameEngine(undefined, 10, 10);\n  var gamePresenter = new _GamePresenter__WEBPACK_IMPORTED_MODULE_0__.GamePresenter(rootElement, gameEngine);\n  gamePresenter.renderInitialPage();\n};\n\n//# sourceURL=webpack://otus-ts-game-of-life/./src/ts/GameRunner.ts?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/main.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/main.css ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".cell-live {\\n  background: white;\\n}\\n.cell-dead {\\n  background: black;\\n}\\n\\ntable {\\n  border-collapse: collapse;\\n  border: 1px solid black;\\n}\\n\\ntable td {\\n  border: 1px solid black;\\n  width: 1em;\\n  height: 1em;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://otus-ts-game-of-life/./src/css/main.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === \"string\") {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, \"\"]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://otus-ts-game-of-life/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./src/css/main.css":
/*!**************************!*\
  !*** ./src/css/main.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ \"./node_modules/css-loader/dist/cjs.js!./src/css/main.css\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_1__.default, options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});\n\n//# sourceURL=webpack://otus-ts-game-of-life/./src/css/main.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : 0;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://otus-ts-game-of-life/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;