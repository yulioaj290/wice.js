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
 * OrderCanvasExercise extends from CanvasExercise superclass.
 * Define the ordering object exercises
 */
var OrderCanvasExercise = function (_CanvasExercise) {
    _inherits(OrderCanvasExercise, _CanvasExercise);

    /**
     * Constructor of the OrderCanvasExercise class.
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
     * @param strokeRectObject
     */
    function OrderCanvasExercise(canvasElementId) {
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
        var strokeRectObject = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : true;

        _classCallCheck(this, OrderCanvasExercise);

        // own properties of the class
        var _this = _possibleConstructorReturn(this, (OrderCanvasExercise.__proto__ || Object.getPrototypeOf(OrderCanvasExercise)).call(this, canvasElementId, canvasWidth, imageSrc, lineWidth, lineColor, lineHead, fontFamily, fontSize, fontColor, fontStyle, fontAlign, fontBaseline, mark, orderType));

        _this._listObjectsCoords = listObjectsCoords; // array of objects coordinates in the image
        _this._listObjectsOrdered = []; // array to store the array of objects coordinates arranged by user
        _this._lastOrderNumber = 0; // last order assigned
        _this._strokeRectObject = strokeRectObject; // define if object will be put into a rectangle

        // binding click event to canvas element to allow the order exercise execution
        _this._canvasElement.addEventListener("click", _this.clickAction.bind(_this), false);
        return _this;
    }

    /**
     * Assign an alphabetic/numerical order character to the object selected by click event over canvas element.
     * This function uses the coordinates of the objects inside canvas element and the coordinates of the click event.
     * @param event
     * @returns {*}
     */


    _createClass(OrderCanvasExercise, [{
        key: 'clickAction',
        value: function clickAction(event) {
            // Obtain mouse click position
            var current_x = event.pageX - event.currentTarget.offsetLeft,
                current_y = event.pageY - event.currentTarget.offsetTop;
            // alert(`cursorX: ${cur_x}, cursorY: ${cur_y}`);

            if (this._canvasElement.getContext) {
                // getting 2d context from canvas element
                var ctx = this._canvasElement.getContext("2d");

                // getting number of objects by list of object coordinates
                var numberObjects = this._listObjectsCoords.length;

                // asking if object clicked was ordered before
                if (!this._isOrderedExercise(this._listObjectsOrdered, [current_x, current_y], this._canvasDivisor, this._lastOrderNumber, numberObjects)) {

                    // declaring variables
                    var x = void 0,
                        y = void 0,
                        x1 = void 0,
                        y1 = void 0,
                        cent_x = void 0,
                        cent_y = void 0,
                        order = void 0,
                        tmp = void 0,
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

                        // alert(x + " <= " + cur_x + " - " + cur_x + " <= " + x1 + " --- " + y + " <= " + cur_y + " - " + cur_y + " <= " + y1);

                        // loop control variable
                        op = false;

                        // asking if a valid object was clicked, based on coordinates of objects and click event
                        if (x <= current_x && current_x <= x1 && y <= current_y && current_y <= y1 && this._lastOrderNumber < numberObjects) {

                            // increment order number to assign
                            this._lastOrderNumber++;

                            // coordinates of the object center
                            cent_x = Math.round(x1 - (x1 - x) / 2);
                            cent_y = Math.round(y1 - (y1 - y) / 2);

                            // write order number
                            order = this._lastOrderNumber.toString();

                            // asking what kind of order is being used
                            if (this._orderType === CanvasExercise.orderTypeAlpha) {

                                // if alphabetic order was selected, then calculate the letter order
                                tmp = Math.floor(this._lastOrderNumber / 26);
                                order = (tmp >= 1 ? String.fromCharCode(64 + this._lastOrderNumber / 26) : '') + String.fromCharCode(64 + this._lastOrderNumber % 26);
                            }

                            // fill number or letter of the order
                            ctx.fillText(order, cent_x, cent_y);

                            // fill rectangle
                            if (this._strokeRectObject) {
                                ctx.lineWidth = this._lineWidth;
                                ctx.strokeStyle = this._lineColor;
                                ctx.strokeRect(x, y, x1 - x, y1 - y);
                            }

                            // update list of ordered objects
                            this._listObjectsOrdered[this._listObjectsOrdered.length] = this._listObjectsCoords[i];

                            op = true;
                        }

                        if (op) {
                            break;
                        }
                    }
                    return this.getListObjectsOrdered();
                }
            }
        }

        /**
         * Determine if the element selected by click coordinates have been ordered before.
         * @param objectsOrdered
         * @param current_xy
         * @param divisor
         * @param lastOrderNumber
         * @param numberObjects
         * @returns {boolean} Return true if the element selected by click coordinates have been ordered before.
         * @private
         */

    }, {
        key: '_isOrderedExercise',
        value: function _isOrderedExercise(objectsOrdered, current_xy, divisor, lastOrderNumber, numberObjects) {

            for (var i = 0; i < objectsOrdered.length; i++) {

                // Coordinates of the images
                var x = Math.round(objectsOrdered[i][0] / divisor),
                    y = Math.round(objectsOrdered[i][1] / divisor),
                    x1 = Math.round(objectsOrdered[i][2] / divisor),
                    y1 = Math.round(objectsOrdered[i][3] / divisor);

                if (x <= current_xy[0] && current_xy[0] <= x1 && y <= current_xy[1] && current_xy[1] <= y1 && lastOrderNumber < numberObjects) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Return and print in JS console the array of the list of ordered objects
         * @returns {Array}
         */

    }, {
        key: 'getListObjectsOrdered',
        value: function getListObjectsOrdered() {
            console.log(JSON.stringify(this._listObjectsOrdered));
            return this._listObjectsOrdered;
        }
    }]);

    return OrderCanvasExercise;
}(CanvasExercise);

OrderCanvasExercise.exports = OrderCanvasExercise;

//# sourceMappingURL=OrderCanvasExercise-compiled.js.map