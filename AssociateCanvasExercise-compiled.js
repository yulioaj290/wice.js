'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Project: wice.js.
 * Author: Yulio Aleman Jimenez [@yulioaj290]
 * Date: 22/09/18
 * Created by WebStorm
 */

/**
 * AssociateCanvasExercise extends from CanvasExercise superclass.
 * Define the associate object exercises
 */
var AssociateCanvasExercise = function (_CanvasExercise) {
    _inherits(AssociateCanvasExercise, _CanvasExercise);

    /**
     * Constructor of the AssociateCanvasExercise class.
     * @param canvasElementId
     * @param canvasWidth
     * @param imageSrc
     * @param lineWidth
     * @param lineColor
     * @param lineHead
     * @param fontFamily
     * @param fontSize
     * @param fontColor
     * @param fontStyle
     * @param fontAlign
     * @param fontBaseline
     * @param mark
     * @param orderType
     * @param listObjectsCoords
     * @param listObjectsConnections
     * @param strokeRectObject
     */
    function AssociateCanvasExercise(canvasElementId) {
        var canvasWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var imageSrc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        var lineWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '2';
        var lineColor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '#000000';
        var lineHead = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
        var fontFamily = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'Arial';
        var fontSize = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : '20';
        var fontColor = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : '#000000';
        var fontStyle = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 'regular';
        var fontAlign = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 'center';
        var fontBaseline = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 'middle';
        var mark = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 'X';
        var orderType = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : ORDER_TYPE_NUM;
        var listObjectsCoords = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : [];
        var listObjectsConnections = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : [];
        var strokeRectObject = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : true;

        _classCallCheck(this, AssociateCanvasExercise);

        // own properties of the class
        var _this = _possibleConstructorReturn(this, (AssociateCanvasExercise.__proto__ || Object.getPrototypeOf(AssociateCanvasExercise)).call(this, canvasElementId, canvasWidth, imageSrc, lineWidth, lineColor, lineHead, fontFamily, fontSize, fontColor, fontStyle, fontAlign, fontBaseline, mark, orderType));

        _this._listObjectsCoords = listObjectsCoords; // array of objects coordinates in the image
        _this._listObjectsConnections = listObjectsConnections; // array of objects connections in the image
        _this._listObjectsAssociated = []; // array to store the array of objects coordinates associated by user
        _this._strokeRectObject = strokeRectObject; // define if object will be put into a rectangle
        _this._beginClickCoord = []; // store the coordinates of the 1st click event in format [x,y]
        _this._numberAssociationsConnected = 0;

        // binding click event to canvas element to allow the associate object exercise execution
        _this._canvasElement.addEventListener("click", _this.clickAction.bind(_this), false);
        return _this;
    }

    /**
     * Perform an associate action using a line between objects based on two click event over canvas element.
     * This function uses the coordinates of the objects inside canvas element and the coordinates of the click event.
     * @param event
     * @returns {*}
     */


    _createClass(AssociateCanvasExercise, [{
        key: 'clickAction',
        value: function clickAction(event) {

            // Obtain mouse click position
            var current_x = event.pageX - event.currentTarget.offsetLeft,
                current_y = event.pageY - event.currentTarget.offsetTop;
            // alert(`cursorX: ${cur_x}, cursorY: ${cur_y}`);

            if (this._canvasElement.getContext) {
                // getting 2d context from canvas element
                var ctx = this._canvasElement.getContext("2d");

                // asking if there is Associations to be perform
                if (this._numberAssociationsConnected < this._getNumberOfConnections()) {

                    // asking if it's the 1st click event
                    if (this._beginClickCoord.length === 0) {
                        // Storing the 1st click event coordinates
                        this._beginClickCoord = [current_x, current_y];
                    } else {

                        // getting coordinates of real objects, begin & end objects
                        var beginObject = this._findObjectThroughCoords(this._beginClickCoord),
                            endObject = this._findObjectThroughCoords([current_x, current_y]),
                            connection = this._findConnection(beginObject, endObject);

                        if (!!beginObject && !!endObject) {
                            if (connection === 1) {
                                this._listObjectsAssociated.push([beginObject, endObject]);
                            } else if (connection === 0) {
                                this._listObjectsAssociated.push([endObject, beginObject]);
                            }
                        }

                        ctx.lineWidth = this._lineWidth;
                        ctx.strokeStyle = this._lineColor;
                        ctx.beginPath();
                        ctx.moveTo(this._beginClickCoord[0], this._beginClickCoord[1]);
                        ctx.lineTo(current_x, current_y);
                        ctx.stroke();

                        this._numberAssociationsConnected++;

                        // Resetting begin click coordinates
                        this._beginClickCoord = [];
                    }

                    return this.getListObjectsAssociated();
                }
            }
        }
    }, {
        key: '_findConnection',
        value: function _findConnection(beginObject, endObject) {
            if (this._findEndCoordsInConnections(endObject, this._findBeginCoordsInConnections(beginObject))) {
                return 1;
            } else if (this._findEndCoordsInConnections(beginObject, this._findBeginCoordsInConnections(endObject))) {
                return 0;
            } else {
                return -1;
            }
        }
    }, {
        key: '_findBeginCoordsInConnections',
        value: function _findBeginCoordsInConnections(beginObject) {
            // looping the list of objects coordinates
            for (var i = 0; i < this._listObjectsCoords.length; i++) {

                var value1 = JSON.stringify(this._listObjectsCoords[i]),
                    value2 = JSON.stringify(beginObject);

                // looking for the index of the begin object
                if (value1 === value2) {
                    return i;
                }
            }
        }
    }, {
        key: '_findEndCoordsInConnections',
        value: function _findEndCoordsInConnections(endObject, index) {
            // looping the list of objects connections coordinates
            for (var i = 0; i < this._listObjectsConnections[index].length; i++) {

                var value1 = JSON.stringify(this._listObjectsConnections[index][i]),
                    value2 = JSON.stringify(endObject);

                // looking for the index of the begin object
                if (value1 === value2) {
                    return true;
                }
            }

            return false;
        }
    }, {
        key: '_findObjectThroughCoords',
        value: function _findObjectThroughCoords(coords) {

            // declaring variables
            var x = void 0,
                y = void 0,
                x1 = void 0,
                y1 = void 0;

            // looping the list of objects coordinates
            for (var i = 0; i < this._listObjectsCoords.length; i++) {

                // Coordinates of the images
                // The canvas divisor allow to calc the exact position of every coordinate,
                // even if the canvas element is positioned anywhere inside the web page
                x = Math.round(this._listObjectsCoords[i][0] / this._canvasDivisor);
                y = Math.round(this._listObjectsCoords[i][1] / this._canvasDivisor);
                x1 = Math.round(this._listObjectsCoords[i][2] / this._canvasDivisor);
                y1 = Math.round(this._listObjectsCoords[i][3] / this._canvasDivisor);

                // asking if a valid object was clicked, based on coordinates of objects and click event
                if (x <= coords[0] && coords[0] <= x1 && y <= coords[1] && coords[1] <= y1) {

                    return this._listObjectsCoords[i];
                }
            }

            return false;
        }
    }, {
        key: '_getNumberOfConnections',
        value: function _getNumberOfConnections() {
            var counter = 0;
            for (var i = 0; i < this._listObjectsConnections.length; i++) {
                counter += this._listObjectsConnections[i].length;
            }
            return counter;
        }

        /**
         * Return and print in JS console the array of the list of associated objects
         * @returns {Array}
         */

    }, {
        key: 'getListObjectsAssociated',
        value: function getListObjectsAssociated() {
            console.log(JSON.stringify(this._listObjectsAssociated));
            return this._listObjectsAssociated;
        }
    }]);

    return AssociateCanvasExercise;
}(CanvasExercise);

AssociateCanvasExercise.exports = AssociateCanvasExercise;

// Live execution of code
var coords = [[80, 35, 375, 283], [395, 120, 715, 370], [36, 352, 88, 404], [520, 20, 590, 76]],
    connections = [[[36, 352, 88, 404], [520, 20, 590, 76]], [[36, 352, 88, 404]], [[395, 120, 715, 370], [520, 20, 590, 76]], [[80, 35, 375, 283], [395, 120, 715, 370]]];

var ex = new AssociateCanvasExercise('myCanvas');
ex._listObjectsCoords = coords;
ex._listObjectsConnections = connections;
ex._canvasWidth = 700;
ex._imageSrc = 'plasma-desktop.jpg';
ex.initializeCanvas();

var marks = [];

for (var i = 0; i < ex._getNumberOfConnections(); i++) {
    marks[i] = " | ";
}

document.getElementById("options").innerText = JSON.stringify(marks);

ex._canvasElement.addEventListener("click", function () {
    if (ex._beginClickCoord.length === 0) {
        marks.shift();
        document.getElementById("options").innerText = JSON.stringify(marks);
        document.getElementById("result").innerText = JSON.stringify(ex.getListObjectsAssociated());
    }
}, false);

console.log(ex);

//# sourceMappingURL=AssociateCanvasExercise-compiled.js.map