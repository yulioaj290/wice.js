'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Project: ICE.js.
 * Author: Yulio Aleman Jimenez [@yulioaj290]
 * Date: 8/28/18
 * Created by WebStorm
 */

/**
 * GapMatchCanvasExercise extends from CanvasExercise superclass.
 * Define the gap matching exercises
 */
var GapMatchCanvasExercise = function (_CanvasExercise) {
    _inherits(GapMatchCanvasExercise, _CanvasExercise);

    /**
     * Constructor of the GapMatchCanvasExercise class.
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
     * @param listObjectsTags
     * @param strokeRectObject
     */
    function GapMatchCanvasExercise(canvasElementId) {
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
        var listObjectsTags = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : [];
        var strokeRectObject = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : true;

        _classCallCheck(this, GapMatchCanvasExercise);

        // own properties of the class
        var _this = _possibleConstructorReturn(this, (GapMatchCanvasExercise.__proto__ || Object.getPrototypeOf(GapMatchCanvasExercise)).call(this, canvasElementId, canvasWidth, imageSrc, lineWidth, lineColor, lineHead, fontFamily, fontSize, fontColor, fontStyle, fontAlign, fontBaseline, mark, orderType));

        _this._listObjectsCoords = listObjectsCoords; // array of objects coordinates in the image
        _this._listObjectsTags = listObjectsTags; // array of objects tags in the image
        _this._listObjectsTagged = []; // array to store the array of objects coordinates tagged by user
        _this._strokeRectObject = strokeRectObject; // define if object will be put into a rectangle

        // binding click event to canvas element to allow the gap match exercise execution
        _this._canvasElement.addEventListener("click", _this.clickAction.bind(_this), false);
        return _this;
    }

    /**
     * Assign a Tag of object selected by click event over canvas element.
     * This function uses the coordinates of the objects inside canvas element and the coordinates of the click event.
     * @param event
     * @returns {*}
     */


    _createClass(GapMatchCanvasExercise, [{
        key: 'clickAction',
        value: function clickAction(event) {
            // Obtain mouse click position
            var current_x = event.pageX - event.currentTarget.offsetLeft,
                current_y = event.pageY - event.currentTarget.offsetTop;
            // alert(`cursorX: ${cur_x}, cursorY: ${cur_y}`);

            if (this._canvasElement.getContext) {
                // getting 2d context from canvas element
                var ctx = this._canvasElement.getContext("2d");

                // asking if object clicked was matched before
                if (!this._isTaggedExercise(this._listObjectsTagged, [current_x, current_y], this._canvasDivisor, this._listObjectsTags.length)) {

                    // declaring variables
                    var x = void 0,
                        y = void 0,
                        x1 = void 0,
                        y1 = void 0,
                        cent_x = void 0,
                        cent_y = void 0,
                        op = void 0;

                    // looping the list of objects coordinates
                    for (var i = 0; i < this._listObjectsCoords.length; i++) {

                        // Coordinates of the images
                        // The canvas divisor allow to calc the exact position of every coordinate,
                        // even if the canvas element is positioned anywhere inside the web page
                        x = Math.round(this._listObjectsCoords[i][0] / this._canvasDivisor);
                        y = Math.round(this._listObjectsCoords[i][1] / this._canvasDivisor);
                        x1 = Math.round(this._listObjectsCoords[i][2] / this._canvasDivisor);
                        y1 = Math.round(this._listObjectsCoords[i][3] / this._canvasDivisor);

                        // init text properties
                        ctx.font = this._fontStyle + ' ' + this._fontSize + '  ' + this._fontFamily;
                        ctx.fillStyle = this._fontColor;
                        ctx.textAlign = this._fontAlign;
                        ctx.textBaseline = this._fontBaseline;

                        // loop control variable
                        op = false;

                        // asking if a valid object was clicked, based on coordinates of objects and click event
                        if (x <= current_x && current_x <= x1 && y <= current_y && current_y <= y1 && this._listObjectsTags.length > 0) {

                            // coordinates of the object center
                            cent_x = Math.round(x1 - (x1 - x) / 2);
                            cent_y = Math.round(y1 - (y1 - y) / 2);

                            // write tag string
                            ctx.fillText(this._listObjectsTags[0], cent_x, cent_y);

                            // Fill rectangle
                            if (this._strokeRectObject) {
                                ctx.lineWidth = this._lineWidth;
                                ctx.strokeStyle = this._lineColor;
                                ctx.strokeRect(x, y, x1 - x, y1 - y);
                            }

                            // update tagged exercises
                            this._listObjectsTagged[this._listObjectsTagged.length] = [this._listObjectsTags.shift(), this._listObjectsCoords[i]];

                            op = true;
                        }

                        if (op) {
                            break;
                        }
                    }
                }
            }
        }

        /**
         * Return an array of objects coordinates in the image
         * @returns {Array|*}
         */

    }, {
        key: 'getListObjectsCoords',
        value: function getListObjectsCoords() {
            console.log(JSON.stringify(this._listObjectsCoords));
            return this._listObjectsCoords;
        }

        /**
         * Return an array of objects tags in the image
         * @returns {Array|*}
         */

    }, {
        key: 'getListObjectsTags',
        value: function getListObjectsTags() {
            console.log(JSON.stringify(this._listObjectsTags));
            return this._listObjectsTags;
        }

        /**
         * Return an array of arrays. Each one contains the object coordinate and the tag assigned
         * @returns {Array}
         */

    }, {
        key: 'getListObjectsTagged',
        value: function getListObjectsTagged() {
            console.log(JSON.stringify(this._listObjectsTagged));
            return this._listObjectsTagged;
        }

        /**
         * Determine if the element selected by click coordinates have been matched before.
         * @param objectsTagged
         * @param current_xy
         * @param divisor
         * @param cantTagged
         * @returns {boolean}
         * @private
         */

    }, {
        key: '_isTaggedExercise',
        value: function _isTaggedExercise(objectsTagged, current_xy, divisor, cantTagged) {
            for (var i = 0; i < objectsTagged.length; i++) {

                // Coordinates of the images
                var x = Math.round(objectsTagged[i][0] / divisor),
                    y = Math.round(objectsTagged[i][1] / divisor),
                    x1 = Math.round(objectsTagged[i][2] / divisor),
                    y1 = Math.round(objectsTagged[i][3] / divisor);

                if (x <= current_xy[0] && current_xy[0] <= x1 && y <= current_xy[1] && current_xy[1] <= y1 && cantTagged > 0) {
                    return true;
                }
            }
            return false;
        }
    }]);

    return GapMatchCanvasExercise;
}(CanvasExercise);

GapMatchCanvasExercise.exports = GapMatchCanvasExercise;

//# sourceMappingURL=GapMatchCanvasExercise-compiled.js.map