'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Project: ICE.js.
 * Author: Yulio Aleman Jimenez [@yulioaj290]
 * Date: 8/28/18
 * Created by WebStorm
 */

// Type of character for order exercises
var ORDER_TYPE_ALPHA = 0,
    ORDER_TYPE_NUM = 1;
/**
 * Superclass CanvasExercise define general properties and initialization functions for all kind of canvas exercises.
 */

var CanvasExercise = function () {

    /**
     * Constructor of CanvasExercise class.
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
     */
    function CanvasExercise(canvasElementId) {
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

        _classCallCheck(this, CanvasExercise);

        this._canvasElementId = canvasElementId; // define the canvas HTML element to link with
        this._canvasElement = document.getElementById(this._canvasElementId);
        this._canvasWidth = canvasWidth;
        this._canvasDivisor = 0;
        this._imageSrc = imageSrc;
        this._lineWidth = lineWidth;
        this._lineColor = lineColor;
        this._lineHead = lineHead;
        this._fontFamily = fontFamily;
        this._fontSize = fontSize;
        this._fontColor = fontColor;
        this._fontStyle = fontStyle;
        this._fontAlign = fontAlign;
        this._fontBaseline = fontBaseline;
        this._mark = mark;
        this._orderType = orderType;
    }

    /**
     * Get constant value for alphabetic ordering objects.
     * @returns {number}
     */


    _createClass(CanvasExercise, [{
        key: 'getMark',


        /**
         * Get mark used to Position Object over canvas image
         * @returns {string|*}
         */
        value: function getMark() {
            return this._mark;
        }

        /**
         * Initialize canvas element and load the image.
         * @private
         */

    }, {
        key: 'initializeCanvas',
        value: function initializeCanvas() {

            if (this._canvasElement.getContext) {

                var img = new Image(); // Create new img element

                // binding function to load image, to the load event
                img.addEventListener("load", this._onLoadImage.bind(this), false);

                // Set source path of image
                img.src = this._imageSrc;
            }
        }
    }, {
        key: 'clickAction',
        value: function clickAction(event) {}
    }, {
        key: '_onLoadImage',
        value: function _onLoadImage(event) {

            // getting image object, with and height
            var img = event.currentTarget,
                imageWidth = img.width,
                imageHeight = img.height,

            // getting 2d context from canvas element
            ctx = this._canvasElement.getContext("2d");

            // setting canvas divisor to use when width and/or display resolution changes
            this._canvasDivisor = imageWidth / this._canvasWidth;

            var finalWidth = Math.round(imageWidth / this._canvasDivisor),
                finalHeight = Math.round(imageHeight / this._canvasDivisor);

            // setting canvas element dimensions
            this._canvasElement.setAttribute('width', finalWidth.toString());
            this._canvasElement.setAttribute('height', finalHeight.toString());

            // drawing image
            ctx.drawImage(img, 0, 0, imageWidth, imageHeight, 0, 0, finalWidth, finalHeight);
        }
    }], [{
        key: 'orderTypeAlpha',
        get: function get() {
            return ORDER_TYPE_ALPHA;
        }

        /**
         * Get constant value for numeric ordering objects.
         * @returns {number}
         */

    }, {
        key: 'orderTypeNum',
        get: function get() {
            return ORDER_TYPE_NUM;
        }
    }]);

    return CanvasExercise;
}();

CanvasExercise.exports = CanvasExercise;

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

var GapMatchCanvasExercise = function (_CanvasExercise2) {
    _inherits(GapMatchCanvasExercise, _CanvasExercise2);

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
        var _this2 = _possibleConstructorReturn(this, (GapMatchCanvasExercise.__proto__ || Object.getPrototypeOf(GapMatchCanvasExercise)).call(this, canvasElementId, canvasWidth, imageSrc, lineWidth, lineColor, lineHead, fontFamily, fontSize, fontColor, fontStyle, fontAlign, fontBaseline, mark, orderType));

        _this2._listObjectsCoords = listObjectsCoords; // array of objects coordinates in the image
        _this2._listObjectsTags = listObjectsTags; // array of objects tags in the image
        _this2._listObjectsTagged = []; // array to store the array of objects coordinates tagged by user
        _this2._strokeRectObject = strokeRectObject; // define if object will be put into a rectangle

        // binding click event to canvas element to allow the gap match exercise execution
        _this2._canvasElement.addEventListener("click", _this2.clickAction.bind(_this2), false);
        return _this2;
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

var OrderCanvasExercise = function (_CanvasExercise3) {
    _inherits(OrderCanvasExercise, _CanvasExercise3);

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
        var _this3 = _possibleConstructorReturn(this, (OrderCanvasExercise.__proto__ || Object.getPrototypeOf(OrderCanvasExercise)).call(this, canvasElementId, canvasWidth, imageSrc, lineWidth, lineColor, lineHead, fontFamily, fontSize, fontColor, fontStyle, fontAlign, fontBaseline, mark, orderType));

        _this3._listObjectsCoords = listObjectsCoords; // array of objects coordinates in the image
        _this3._listObjectsOrdered = []; // array to store the array of objects coordinates arranged by user
        _this3._lastOrderNumber = 0; // last order assigned
        _this3._strokeRectObject = strokeRectObject; // define if object will be put into a rectangle

        // binding click event to canvas element to allow the order exercise execution
        _this3._canvasElement.addEventListener("click", _this3.clickAction.bind(_this3), false);
        return _this3;
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

/**
 * Project: wice.js.
 * Author: Yulio Aleman Jimenez [@yulioaj290]
 * Date: 4/09/18
 * Created by WebStorm
 */

/**
 * PositionObjectCanvasExercise extends from CanvasExercise superclass.
 * Define the position object exercises
 */

var PositionObjectCanvasExercise = function (_CanvasExercise4) {
    _inherits(PositionObjectCanvasExercise, _CanvasExercise4);

    /**
     * Constructor of the PositionObjectCanvasExercise class.
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
    function PositionObjectCanvasExercise(canvasElementId) {
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

        _classCallCheck(this, PositionObjectCanvasExercise);

        // own properties of the class
        var _this4 = _possibleConstructorReturn(this, (PositionObjectCanvasExercise.__proto__ || Object.getPrototypeOf(PositionObjectCanvasExercise)).call(this, canvasElementId, canvasWidth, imageSrc, lineWidth, lineColor, lineHead, fontFamily, fontSize, fontColor, fontStyle, fontAlign, fontBaseline, mark, orderType));

        _this4._listObjectsCoords = listObjectsCoords; // array of objects coordinates in the image
        _this4._listObjectsAssociated = []; // array to store the array of objects coordinates positioned by user
        _this4._strokeRectObject = strokeRectObject; // define if object will be put into a rectangle
        _this4._numberAssociationsConnected = 0;

        // binding click event to canvas element to allow the position object exercise execution
        _this4._canvasElement.addEventListener("click", _this4.clickAction.bind(_this4), false);
        return _this4;
    }

    /**
     * Assign a position based on click event over canvas element.
     * This function uses the coordinates of the objects inside canvas element and the coordinates of the click event.
     * @param event
     * @returns {*}
     */


    _createClass(PositionObjectCanvasExercise, [{
        key: 'clickAction',
        value: function clickAction(event) {

            // Obtain mouse click position
            var current_x = event.pageX - event.currentTarget.offsetLeft,
                current_y = event.pageY - event.currentTarget.offsetTop;
            // alert(`cursorX: ${cur_x}, cursorY: ${cur_y}`);

            if (this._canvasElement.getContext) {
                // getting 2d context from canvas element
                var ctx = this._canvasElement.getContext("2d");

                // asking if there is elements to be positioned
                if (this._numberAssociationsConnected < this._listObjectsCoords.length) {

                    // declaring variables
                    var x = void 0,
                        y = void 0,
                        x1 = void 0,
                        y1 = void 0,
                        op = void 0;

                    // init text properties
                    ctx.font = this._fontStyle + ' ' + this._fontSize + '  ' + this._fontFamily;
                    ctx.fillStyle = this._fontColor;
                    ctx.textAlign = this._fontAlign;
                    ctx.textBaseline = this._fontBaseline;

                    // fill mark or letter
                    ctx.fillText(this._mark, current_x, current_y);

                    // decrement number of objects to be positioned
                    this._numberAssociationsConnected++;

                    // looping the list of objects coordinates
                    for (var i = 0; i < this._listObjectsCoords.length; i++) {

                        // Coordinates of the images
                        // The canvas divisor allow to calc the exact position of every coordinate,
                        // even if the canvas element is positioned anywhere inside the web page
                        x = Math.round(this._listObjectsCoords[i][0] / this._canvasDivisor);
                        y = Math.round(this._listObjectsCoords[i][1] / this._canvasDivisor);
                        x1 = Math.round(this._listObjectsCoords[i][2] / this._canvasDivisor);
                        y1 = Math.round(this._listObjectsCoords[i][3] / this._canvasDivisor);

                        // alert(x + " <= " + cur_x + " - " + cur_x + " <= " + x1 + " --- " + y + " <= " + cur_y + " - " + cur_y + " <= " + y1);

                        // loop control variable
                        op = false;

                        // asking if a valid object was clicked, based on coordinates of objects and click event
                        if (x <= current_x && current_x <= x1 && y <= current_y && current_y <= y1) {

                            // fill rectangle
                            if (this._strokeRectObject) {
                                ctx.lineWidth = this._lineWidth;
                                ctx.strokeStyle = this._lineColor;
                                ctx.strokeRect(x, y, x1 - x, y1 - y);
                            }

                            // update list of positioned objects
                            this._listObjectsAssociated[this._listObjectsAssociated.length] = this._listObjectsCoords[i];

                            op = true;
                        }

                        if (op) {
                            break;
                        }
                    }
                    return this.getListObjectsPositioned();
                }
            }
        }

        /**
         * Return and print in JS console the array of the list of positioned objects
         * @returns {Array}
         */

    }, {
        key: 'getListObjectsPositioned',
        value: function getListObjectsPositioned() {
            console.log(JSON.stringify(this._listObjectsAssociated));
            return this._listObjectsAssociated;
        }
    }]);

    return PositionObjectCanvasExercise;
}(CanvasExercise);

PositionObjectCanvasExercise.exports = PositionObjectCanvasExercise;

// // Live execution of code
// let coords = [[80, 35, 375, 283], [395, 120, 715, 370], [36, 352, 88, 404], [520, 20, 590, 76]];
//
// const ex = new PositionObjectCanvasExercise('myCanvas');
// ex._listObjectsCoords = coords;
// ex._canvasWidth = 700;
// ex._imageSrc = 'plasma-desktop.jpg';
// ex.initializeCanvas();
//
// let marks = [];
//
// for (let i = 0; i < coords.length; i++) {
//     marks[i] = ex.getMark();
// }
//
// document.getElementById("options").innerText = JSON.stringify(marks);
//
// ex._canvasElement.addEventListener("click", function () {
//     marks.shift();
//     document.getElementById("options").innerText = JSON.stringify(marks);
//     document.getElementById("result").innerText = JSON.stringify(ex.getListObjectsAssociated());
// }, false);
//
// console.log(ex);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhbnZhc0V4ZXJjaXNlLmpzIiwiQXNzb2NpYXRlQ2FudmFzRXhlcmNpc2UuanMiLCJHYXBNYXRjaENhbnZhc0V4ZXJjaXNlLmpzIiwiT3JkZXJDYW52YXNFeGVyY2lzZS5qcyIsIlBvc2l0aW9uT2JqZWN0Q2FudmFzRXhlcmNpc2UuanMiXSwibmFtZXMiOlsiT1JERVJfVFlQRV9BTFBIQSIsIk9SREVSX1RZUEVfTlVNIiwiQ2FudmFzRXhlcmNpc2UiLCJjYW52YXNFbGVtZW50SWQiLCJjYW52YXNXaWR0aCIsImltYWdlU3JjIiwibGluZVdpZHRoIiwibGluZUNvbG9yIiwibGluZUhlYWQiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJmb250Q29sb3IiLCJmb250U3R5bGUiLCJmb250QWxpZ24iLCJmb250QmFzZWxpbmUiLCJtYXJrIiwib3JkZXJUeXBlIiwiX2NhbnZhc0VsZW1lbnRJZCIsIl9jYW52YXNFbGVtZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIl9jYW52YXNXaWR0aCIsIl9jYW52YXNEaXZpc29yIiwiX2ltYWdlU3JjIiwiX2xpbmVXaWR0aCIsIl9saW5lQ29sb3IiLCJfbGluZUhlYWQiLCJfZm9udEZhbWlseSIsIl9mb250U2l6ZSIsIl9mb250Q29sb3IiLCJfZm9udFN0eWxlIiwiX2ZvbnRBbGlnbiIsIl9mb250QmFzZWxpbmUiLCJfbWFyayIsIl9vcmRlclR5cGUiLCJnZXRDb250ZXh0IiwiaW1nIiwiSW1hZ2UiLCJhZGRFdmVudExpc3RlbmVyIiwiX29uTG9hZEltYWdlIiwiYmluZCIsInNyYyIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsImltYWdlV2lkdGgiLCJ3aWR0aCIsImltYWdlSGVpZ2h0IiwiaGVpZ2h0IiwiY3R4IiwiZmluYWxXaWR0aCIsIk1hdGgiLCJyb3VuZCIsImZpbmFsSGVpZ2h0Iiwic2V0QXR0cmlidXRlIiwidG9TdHJpbmciLCJkcmF3SW1hZ2UiLCJleHBvcnRzIiwiQXNzb2NpYXRlQ2FudmFzRXhlcmNpc2UiLCJsaXN0T2JqZWN0c0Nvb3JkcyIsImxpc3RPYmplY3RzQ29ubmVjdGlvbnMiLCJzdHJva2VSZWN0T2JqZWN0IiwiX2xpc3RPYmplY3RzQ29vcmRzIiwiX2xpc3RPYmplY3RzQ29ubmVjdGlvbnMiLCJfbGlzdE9iamVjdHNBc3NvY2lhdGVkIiwiX3N0cm9rZVJlY3RPYmplY3QiLCJfYmVnaW5DbGlja0Nvb3JkIiwiX251bWJlckFzc29jaWF0aW9uc0Nvbm5lY3RlZCIsImNsaWNrQWN0aW9uIiwiY3VycmVudF94IiwicGFnZVgiLCJvZmZzZXRMZWZ0IiwiY3VycmVudF95IiwicGFnZVkiLCJvZmZzZXRUb3AiLCJfZ2V0TnVtYmVyT2ZDb25uZWN0aW9ucyIsImxlbmd0aCIsImJlZ2luT2JqZWN0IiwiX2ZpbmRPYmplY3RUaHJvdWdoQ29vcmRzIiwiZW5kT2JqZWN0IiwiY29ubmVjdGlvbiIsIl9maW5kQ29ubmVjdGlvbiIsInB1c2giLCJzdHJva2VTdHlsZSIsImJlZ2luUGF0aCIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZSIsImdldExpc3RPYmplY3RzQXNzb2NpYXRlZCIsIl9maW5kRW5kQ29vcmRzSW5Db25uZWN0aW9ucyIsIl9maW5kQmVnaW5Db29yZHNJbkNvbm5lY3Rpb25zIiwiaSIsInZhbHVlMSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ2YWx1ZTIiLCJpbmRleCIsImNvb3JkcyIsIngiLCJ5IiwieDEiLCJ5MSIsImNvdW50ZXIiLCJjb25zb2xlIiwibG9nIiwiR2FwTWF0Y2hDYW52YXNFeGVyY2lzZSIsImxpc3RPYmplY3RzVGFncyIsIl9saXN0T2JqZWN0c1RhZ3MiLCJfbGlzdE9iamVjdHNUYWdnZWQiLCJfaXNUYWdnZWRFeGVyY2lzZSIsImNlbnRfeCIsImNlbnRfeSIsIm9wIiwiZm9udCIsImZpbGxTdHlsZSIsInRleHRBbGlnbiIsInRleHRCYXNlbGluZSIsImZpbGxUZXh0Iiwic3Ryb2tlUmVjdCIsInNoaWZ0Iiwib2JqZWN0c1RhZ2dlZCIsImN1cnJlbnRfeHkiLCJkaXZpc29yIiwiY2FudFRhZ2dlZCIsIk9yZGVyQ2FudmFzRXhlcmNpc2UiLCJfbGlzdE9iamVjdHNPcmRlcmVkIiwiX2xhc3RPcmRlck51bWJlciIsIm51bWJlck9iamVjdHMiLCJfaXNPcmRlcmVkRXhlcmNpc2UiLCJvcmRlciIsInRtcCIsIm9yZGVyVHlwZUFscGhhIiwiZmxvb3IiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJnZXRMaXN0T2JqZWN0c09yZGVyZWQiLCJvYmplY3RzT3JkZXJlZCIsImxhc3RPcmRlck51bWJlciIsIlBvc2l0aW9uT2JqZWN0Q2FudmFzRXhlcmNpc2UiLCJnZXRMaXN0T2JqZWN0c1Bvc2l0aW9uZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztBQU9BO0FBQ0EsSUFBQUEsbUJBQUEsQ0FBQTtBQUFBLElBQ0FDLGlCQUFBLENBREE7QUFFQTs7OztJQUdBQyxjOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSw0QkFBQUMsZUFBQSxFQUdBO0FBQUEsWUFIQUMsV0FHQSx1RUFIQSxFQUdBO0FBQUEsWUFIQUMsUUFHQSx1RUFIQSxFQUdBO0FBQUEsWUFGQUMsU0FFQSx1RUFGQSxHQUVBO0FBQUEsWUFGQUMsU0FFQSx1RUFGQSxTQUVBO0FBQUEsWUFGQUMsUUFFQSx1RUFGQSxLQUVBO0FBQUEsWUFGQUMsVUFFQSx1RUFGQSxPQUVBO0FBQUEsWUFEQUMsUUFDQSx1RUFEQSxJQUNBO0FBQUEsWUFEQUMsU0FDQSx1RUFEQSxTQUNBO0FBQUEsWUFEQUMsU0FDQSx1RUFEQSxTQUNBO0FBQUEsWUFEQUMsU0FDQSwwRUFEQSxRQUNBO0FBQUEsWUFBQUMsWUFBQSwwRUFBQSxRQUFBO0FBQUEsWUFBQUMsSUFBQSwwRUFBQSxHQUFBO0FBQUEsWUFBQUMsU0FBQSwwRUFBQWYsY0FBQTs7QUFBQTs7QUFFQSxhQUFBZ0IsZ0JBQUEsR0FBQWQsZUFBQSxDQUZBLENBRUE7QUFDQSxhQUFBZSxjQUFBLEdBQUFDLFNBQUFDLGNBQUEsQ0FBQSxLQUFBSCxnQkFBQSxDQUFBO0FBQ0EsYUFBQUksWUFBQSxHQUFBakIsV0FBQTtBQUNBLGFBQUFrQixjQUFBLEdBQUEsQ0FBQTtBQUNBLGFBQUFDLFNBQUEsR0FBQWxCLFFBQUE7QUFDQSxhQUFBbUIsVUFBQSxHQUFBbEIsU0FBQTtBQUNBLGFBQUFtQixVQUFBLEdBQUFsQixTQUFBO0FBQ0EsYUFBQW1CLFNBQUEsR0FBQWxCLFFBQUE7QUFDQSxhQUFBbUIsV0FBQSxHQUFBbEIsVUFBQTtBQUNBLGFBQUFtQixTQUFBLEdBQUFsQixRQUFBO0FBQ0EsYUFBQW1CLFVBQUEsR0FBQWxCLFNBQUE7QUFDQSxhQUFBbUIsVUFBQSxHQUFBbEIsU0FBQTtBQUNBLGFBQUFtQixVQUFBLEdBQUFsQixTQUFBO0FBQ0EsYUFBQW1CLGFBQUEsR0FBQWxCLFlBQUE7QUFDQSxhQUFBbUIsS0FBQSxHQUFBbEIsSUFBQTtBQUNBLGFBQUFtQixVQUFBLEdBQUFsQixTQUFBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUFnQkE7Ozs7a0NBSUE7QUFDQSxtQkFBQSxLQUFBaUIsS0FBQTtBQUNBOztBQUVBOzs7Ozs7OzJDQUlBOztBQUVBLGdCQUFBLEtBQUFmLGNBQUEsQ0FBQWlCLFVBQUEsRUFBQTs7QUFFQSxvQkFBQUMsTUFBQSxJQUFBQyxLQUFBLEVBQUEsQ0FGQSxDQUVBOztBQUVBO0FBQ0FELG9CQUFBRSxnQkFBQSxDQUFBLE1BQUEsRUFBQSxLQUFBQyxZQUFBLENBQUFDLElBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxLQUFBOztBQUVBO0FBQ0FKLG9CQUFBSyxHQUFBLEdBQUEsS0FBQWxCLFNBQUE7QUFDQTtBQUNBOzs7b0NBRUFtQixLLEVBQUEsQ0FFQTs7O3FDQUVBQSxLLEVBQUE7O0FBRUE7QUFDQSxnQkFBQU4sTUFBQU0sTUFBQUMsYUFBQTtBQUFBLGdCQUNBQyxhQUFBUixJQUFBUyxLQURBO0FBQUEsZ0JBRUFDLGNBQUFWLElBQUFXLE1BRkE7O0FBR0E7QUFDQUMsa0JBQUEsS0FBQTlCLGNBQUEsQ0FBQWlCLFVBQUEsQ0FBQSxJQUFBLENBSkE7O0FBTUE7QUFDQSxpQkFBQWIsY0FBQSxHQUFBc0IsYUFBQSxLQUFBdkIsWUFBQTs7QUFFQSxnQkFBQTRCLGFBQUFDLEtBQUFDLEtBQUEsQ0FBQVAsYUFBQSxLQUFBdEIsY0FBQSxDQUFBO0FBQUEsZ0JBQ0E4QixjQUFBRixLQUFBQyxLQUFBLENBQUFMLGNBQUEsS0FBQXhCLGNBQUEsQ0FEQTs7QUFHQTtBQUNBLGlCQUFBSixjQUFBLENBQUFtQyxZQUFBLENBQUEsT0FBQSxFQUFBSixXQUFBSyxRQUFBLEVBQUE7QUFDQSxpQkFBQXBDLGNBQUEsQ0FBQW1DLFlBQUEsQ0FBQSxRQUFBLEVBQUFELFlBQUFFLFFBQUEsRUFBQTs7QUFFQTtBQUNBTixnQkFBQU8sU0FBQSxDQUFBbkIsR0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUFRLFVBQUEsRUFBQUUsV0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUFHLFVBQUEsRUFBQUcsV0FBQTtBQUNBOzs7NEJBL0RBO0FBQ0EsbUJBQUFwRCxnQkFBQTtBQUNBOztBQUVBOzs7Ozs7OzRCQUlBO0FBQ0EsbUJBQUFDLGNBQUE7QUFDQTs7Ozs7O0FBd0RBQyxlQUFBc0QsT0FBQSxHQUFBdEQsY0FBQTs7QUM3SEE7Ozs7Ozs7QUFRQTs7Ozs7SUFJQXVELHVCOzs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkEscUNBQUF0RCxlQUFBLEVBS0E7QUFBQSxZQUxBQyxXQUtBLHVFQUxBLEVBS0E7QUFBQSxZQUxBQyxRQUtBLHVFQUxBLEVBS0E7QUFBQSxZQUpBQyxTQUlBLHVFQUpBLEdBSUE7QUFBQSxZQUpBQyxTQUlBLHVFQUpBLFNBSUE7QUFBQSxZQUpBQyxRQUlBLHVFQUpBLEtBSUE7QUFBQSxZQUpBQyxVQUlBLHVFQUpBLE9BSUE7QUFBQSxZQUhBQyxRQUdBLHVFQUhBLElBR0E7QUFBQSxZQUhBQyxTQUdBLHVFQUhBLFNBR0E7QUFBQSxZQUhBQyxTQUdBLHVFQUhBLFNBR0E7QUFBQSxZQUhBQyxTQUdBLDBFQUhBLFFBR0E7QUFBQSxZQUZBQyxZQUVBLDBFQUZBLFFBRUE7QUFBQSxZQUZBQyxJQUVBLDBFQUZBLEdBRUE7QUFBQSxZQUZBQyxTQUVBLDBFQUZBZixjQUVBO0FBQUEsWUFBQXlELGlCQUFBLDBFQUFBLEVBQUE7QUFBQSxZQUFBQyxzQkFBQSwwRUFBQSxFQUFBO0FBQUEsWUFBQUMsZ0JBQUEsMEVBQUEsSUFBQTs7QUFBQTs7QUFLQTtBQUxBLHNKQUVBekQsZUFGQSxFQUVBQyxXQUZBLEVBRUFDLFFBRkEsRUFFQUMsU0FGQSxFQUVBQyxTQUZBLEVBRUFDLFFBRkEsRUFFQUMsVUFGQSxFQUdBQyxRQUhBLEVBR0FDLFNBSEEsRUFHQUMsU0FIQSxFQUdBQyxTQUhBLEVBR0FDLFlBSEEsRUFHQUMsSUFIQSxFQUdBQyxTQUhBOztBQU1BLGNBQUE2QyxrQkFBQSxHQUFBSCxpQkFBQSxDQU5BLENBTUE7QUFDQSxjQUFBSSx1QkFBQSxHQUFBSCxzQkFBQSxDQVBBLENBT0E7QUFDQSxjQUFBSSxzQkFBQSxHQUFBLEVBQUEsQ0FSQSxDQVFBO0FBQ0EsY0FBQUMsaUJBQUEsR0FBQUosZ0JBQUEsQ0FUQSxDQVNBO0FBQ0EsY0FBQUssZ0JBQUEsR0FBQSxFQUFBLENBVkEsQ0FVQTtBQUNBLGNBQUFDLDRCQUFBLEdBQUEsQ0FBQTs7QUFFQTtBQUNBLGNBQUFoRCxjQUFBLENBQUFvQixnQkFBQSxDQUFBLE9BQUEsRUFBQSxNQUFBNkIsV0FBQSxDQUFBM0IsSUFBQSxPQUFBLEVBQUEsS0FBQTtBQWRBO0FBZUE7O0FBRUE7Ozs7Ozs7Ozs7b0NBTUFFLEssRUFBQTs7QUFFQTtBQUNBLGdCQUFBMEIsWUFBQTFCLE1BQUEyQixLQUFBLEdBQUEzQixNQUFBQyxhQUFBLENBQUEyQixVQUFBO0FBQUEsZ0JBQ0FDLFlBQUE3QixNQUFBOEIsS0FBQSxHQUFBOUIsTUFBQUMsYUFBQSxDQUFBOEIsU0FEQTtBQUVBOztBQUVBLGdCQUFBLEtBQUF2RCxjQUFBLENBQUFpQixVQUFBLEVBQUE7QUFDQTtBQUNBLG9CQUFBYSxNQUFBLEtBQUE5QixjQUFBLENBQUFpQixVQUFBLENBQUEsSUFBQSxDQUFBOztBQUVBO0FBQ0Esb0JBQUEsS0FBQStCLDRCQUFBLEdBQUEsS0FBQVEsdUJBQUEsRUFBQSxFQUFBOztBQUVBO0FBQ0Esd0JBQUEsS0FBQVQsZ0JBQUEsQ0FBQVUsTUFBQSxLQUFBLENBQUEsRUFBQTtBQUNBO0FBQ0EsNkJBQUFWLGdCQUFBLEdBQUEsQ0FBQUcsU0FBQSxFQUFBRyxTQUFBLENBQUE7QUFDQSxxQkFIQSxNQUdBOztBQUVBO0FBQ0EsNEJBQUFLLGNBQUEsS0FBQUMsd0JBQUEsQ0FBQSxLQUFBWixnQkFBQSxDQUFBO0FBQUEsNEJBQ0FhLFlBQUEsS0FBQUQsd0JBQUEsQ0FBQSxDQUFBVCxTQUFBLEVBQUFHLFNBQUEsQ0FBQSxDQURBO0FBQUEsNEJBRUFRLGFBQUEsS0FBQUMsZUFBQSxDQUFBSixXQUFBLEVBQUFFLFNBQUEsQ0FGQTs7QUFJQSw0QkFBQSxDQUFBLENBQUFGLFdBQUEsSUFBQSxDQUFBLENBQUFFLFNBQUEsRUFBQTtBQUNBLGdDQUFBQyxlQUFBLENBQUEsRUFBQTtBQUNBLHFDQUFBaEIsc0JBQUEsQ0FBQWtCLElBQUEsQ0FBQSxDQUFBTCxXQUFBLEVBQUFFLFNBQUEsQ0FBQTtBQUNBLDZCQUZBLE1BRUEsSUFBQUMsZUFBQSxDQUFBLEVBQUE7QUFDQSxxQ0FBQWhCLHNCQUFBLENBQUFrQixJQUFBLENBQUEsQ0FBQUgsU0FBQSxFQUFBRixXQUFBLENBQUE7QUFDQTtBQUNBOztBQUVBNUIsNEJBQUExQyxTQUFBLEdBQUEsS0FBQWtCLFVBQUE7QUFDQXdCLDRCQUFBa0MsV0FBQSxHQUFBLEtBQUF6RCxVQUFBO0FBQ0F1Qiw0QkFBQW1DLFNBQUE7QUFDQW5DLDRCQUFBb0MsTUFBQSxDQUFBLEtBQUFuQixnQkFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLEtBQUFBLGdCQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0FqQiw0QkFBQXFDLE1BQUEsQ0FBQWpCLFNBQUEsRUFBQUcsU0FBQTtBQUNBdkIsNEJBQUFzQyxNQUFBOztBQUVBLDZCQUFBcEIsNEJBQUE7O0FBRUE7QUFDQSw2QkFBQUQsZ0JBQUEsR0FBQSxFQUFBO0FBQ0E7O0FBRUEsMkJBQUEsS0FBQXNCLHdCQUFBLEVBQUE7QUFDQTtBQUNBO0FBQ0E7Ozt3Q0FFQVgsVyxFQUFBRSxTLEVBQUE7QUFDQSxnQkFBQSxLQUFBVSwyQkFBQSxDQUFBVixTQUFBLEVBQUEsS0FBQVcsNkJBQUEsQ0FBQWIsV0FBQSxDQUFBLENBQUEsRUFBQTtBQUNBLHVCQUFBLENBQUE7QUFDQSxhQUZBLE1BRUEsSUFBQSxLQUFBWSwyQkFBQSxDQUFBWixXQUFBLEVBQUEsS0FBQWEsNkJBQUEsQ0FBQVgsU0FBQSxDQUFBLENBQUEsRUFBQTtBQUNBLHVCQUFBLENBQUE7QUFDQSxhQUZBLE1BRUE7QUFDQSx1QkFBQSxDQUFBLENBQUE7QUFDQTtBQUNBOzs7c0RBRUFGLFcsRUFBQTtBQUNBO0FBQ0EsaUJBQUEsSUFBQWMsSUFBQSxDQUFBLEVBQUFBLElBQUEsS0FBQTdCLGtCQUFBLENBQUFjLE1BQUEsRUFBQWUsR0FBQSxFQUFBOztBQUVBLG9CQUFBQyxTQUFBQyxLQUFBQyxTQUFBLENBQUEsS0FBQWhDLGtCQUFBLENBQUE2QixDQUFBLENBQUEsQ0FBQTtBQUFBLG9CQUNBSSxTQUFBRixLQUFBQyxTQUFBLENBQUFqQixXQUFBLENBREE7O0FBR0E7QUFDQSxvQkFBQWUsV0FBQUcsTUFBQSxFQUFBO0FBQ0EsMkJBQUFKLENBQUE7QUFDQTtBQUNBO0FBQ0E7OztvREFFQVosUyxFQUFBaUIsSyxFQUFBO0FBQ0E7QUFDQSxpQkFBQSxJQUFBTCxJQUFBLENBQUEsRUFBQUEsSUFBQSxLQUFBNUIsdUJBQUEsQ0FBQWlDLEtBQUEsRUFBQXBCLE1BQUEsRUFBQWUsR0FBQSxFQUFBOztBQUVBLG9CQUFBQyxTQUFBQyxLQUFBQyxTQUFBLENBQUEsS0FBQS9CLHVCQUFBLENBQUFpQyxLQUFBLEVBQUFMLENBQUEsQ0FBQSxDQUFBO0FBQUEsb0JBQ0FJLFNBQUFGLEtBQUFDLFNBQUEsQ0FBQWYsU0FBQSxDQURBOztBQUdBO0FBQ0Esb0JBQUFhLFdBQUFHLE1BQUEsRUFBQTtBQUNBLDJCQUFBLElBQUE7QUFDQTtBQUNBOztBQUVBLG1CQUFBLEtBQUE7QUFDQTs7O2lEQUVBRSxNLEVBQUE7O0FBRUE7QUFDQSxnQkFBQUMsVUFBQTtBQUFBLGdCQUFBQyxVQUFBO0FBQUEsZ0JBQUFDLFdBQUE7QUFBQSxnQkFBQUMsV0FBQTs7QUFFQTtBQUNBLGlCQUFBLElBQUFWLElBQUEsQ0FBQSxFQUFBQSxJQUFBLEtBQUE3QixrQkFBQSxDQUFBYyxNQUFBLEVBQUFlLEdBQUEsRUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQU8sb0JBQUEvQyxLQUFBQyxLQUFBLENBQUEsS0FBQVUsa0JBQUEsQ0FBQTZCLENBQUEsRUFBQSxDQUFBLElBQUEsS0FBQXBFLGNBQUEsQ0FBQTtBQUNBNEUsb0JBQUFoRCxLQUFBQyxLQUFBLENBQUEsS0FBQVUsa0JBQUEsQ0FBQTZCLENBQUEsRUFBQSxDQUFBLElBQUEsS0FBQXBFLGNBQUEsQ0FBQTtBQUNBNkUscUJBQUFqRCxLQUFBQyxLQUFBLENBQUEsS0FBQVUsa0JBQUEsQ0FBQTZCLENBQUEsRUFBQSxDQUFBLElBQUEsS0FBQXBFLGNBQUEsQ0FBQTtBQUNBOEUscUJBQUFsRCxLQUFBQyxLQUFBLENBQUEsS0FBQVUsa0JBQUEsQ0FBQTZCLENBQUEsRUFBQSxDQUFBLElBQUEsS0FBQXBFLGNBQUEsQ0FBQTs7QUFFQTtBQUNBLG9CQUFBMkUsS0FBQUQsT0FBQSxDQUFBLENBQUEsSUFBQUEsT0FBQSxDQUFBLEtBQUFHLEVBQUEsSUFDQUQsS0FBQUYsT0FBQSxDQUFBLENBQUEsSUFBQUEsT0FBQSxDQUFBLEtBQUFJLEVBREEsRUFDQTs7QUFFQSwyQkFBQSxLQUFBdkMsa0JBQUEsQ0FBQTZCLENBQUEsQ0FBQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQUEsS0FBQTtBQUNBOzs7a0RBRUE7QUFDQSxnQkFBQVcsVUFBQSxDQUFBO0FBQ0EsaUJBQUEsSUFBQVgsSUFBQSxDQUFBLEVBQUFBLElBQUEsS0FBQTVCLHVCQUFBLENBQUFhLE1BQUEsRUFBQWUsR0FBQSxFQUFBO0FBQ0FXLDJCQUFBLEtBQUF2Qyx1QkFBQSxDQUFBNEIsQ0FBQSxFQUFBZixNQUFBO0FBQ0E7QUFDQSxtQkFBQTBCLE9BQUE7QUFDQTs7QUFFQTs7Ozs7OzttREFJQTtBQUNBQyxvQkFBQUMsR0FBQSxDQUFBWCxLQUFBQyxTQUFBLENBQUEsS0FBQTlCLHNCQUFBLENBQUE7QUFDQSxtQkFBQSxLQUFBQSxzQkFBQTtBQUNBOzs7O0VBdkxBN0QsYzs7QUEwTEF1RCx3QkFBQUQsT0FBQSxHQUFBQyx1QkFBQTs7QUN0TUE7Ozs7Ozs7QUFPQTs7Ozs7SUFJQStDLHNCOzs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsb0NBQUFyRyxlQUFBLEVBS0E7QUFBQSxZQUxBQyxXQUtBLHVFQUxBLEVBS0E7QUFBQSxZQUxBQyxRQUtBLHVFQUxBLEVBS0E7QUFBQSxZQUpBQyxTQUlBLHVFQUpBLEdBSUE7QUFBQSxZQUpBQyxTQUlBLHVFQUpBLFNBSUE7QUFBQSxZQUpBQyxRQUlBLHVFQUpBLEtBSUE7QUFBQSxZQUpBQyxVQUlBLHVFQUpBLE9BSUE7QUFBQSxZQUhBQyxRQUdBLHVFQUhBLElBR0E7QUFBQSxZQUhBQyxTQUdBLHVFQUhBLFNBR0E7QUFBQSxZQUhBQyxTQUdBLHVFQUhBLFNBR0E7QUFBQSxZQUhBQyxTQUdBLDBFQUhBLFFBR0E7QUFBQSxZQUZBQyxZQUVBLDBFQUZBLFFBRUE7QUFBQSxZQUZBQyxJQUVBLDBFQUZBLEdBRUE7QUFBQSxZQUZBQyxTQUVBLDBFQUZBZixjQUVBO0FBQUEsWUFBQXlELGlCQUFBLDBFQUFBLEVBQUE7QUFBQSxZQUFBK0MsZUFBQSwwRUFBQSxFQUFBO0FBQUEsWUFBQTdDLGdCQUFBLDBFQUFBLElBQUE7O0FBQUE7O0FBS0E7QUFMQSxxSkFFQXpELGVBRkEsRUFFQUMsV0FGQSxFQUVBQyxRQUZBLEVBRUFDLFNBRkEsRUFFQUMsU0FGQSxFQUVBQyxRQUZBLEVBRUFDLFVBRkEsRUFHQUMsUUFIQSxFQUdBQyxTQUhBLEVBR0FDLFNBSEEsRUFHQUMsU0FIQSxFQUdBQyxZQUhBLEVBR0FDLElBSEEsRUFHQUMsU0FIQTs7QUFNQSxlQUFBNkMsa0JBQUEsR0FBQUgsaUJBQUEsQ0FOQSxDQU1BO0FBQ0EsZUFBQWdELGdCQUFBLEdBQUFELGVBQUEsQ0FQQSxDQU9BO0FBQ0EsZUFBQUUsa0JBQUEsR0FBQSxFQUFBLENBUkEsQ0FRQTtBQUNBLGVBQUEzQyxpQkFBQSxHQUFBSixnQkFBQSxDQVRBLENBU0E7O0FBRUE7QUFDQSxlQUFBMUMsY0FBQSxDQUFBb0IsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsT0FBQTZCLFdBQUEsQ0FBQTNCLElBQUEsUUFBQSxFQUFBLEtBQUE7QUFaQTtBQWFBOztBQUVBOzs7Ozs7Ozs7O29DQU1BRSxLLEVBQUE7QUFDQTtBQUNBLGdCQUFBMEIsWUFBQTFCLE1BQUEyQixLQUFBLEdBQUEzQixNQUFBQyxhQUFBLENBQUEyQixVQUFBO0FBQUEsZ0JBQ0FDLFlBQUE3QixNQUFBOEIsS0FBQSxHQUFBOUIsTUFBQUMsYUFBQSxDQUFBOEIsU0FEQTtBQUVBOztBQUVBLGdCQUFBLEtBQUF2RCxjQUFBLENBQUFpQixVQUFBLEVBQUE7QUFDQTtBQUNBLG9CQUFBYSxNQUFBLEtBQUE5QixjQUFBLENBQUFpQixVQUFBLENBQUEsSUFBQSxDQUFBOztBQUVBO0FBQ0Esb0JBQUEsQ0FBQSxLQUFBeUUsaUJBQUEsQ0FBQSxLQUFBRCxrQkFBQSxFQUFBLENBQUF2QyxTQUFBLEVBQUFHLFNBQUEsQ0FBQSxFQUFBLEtBQUFqRCxjQUFBLEVBQUEsS0FBQW9GLGdCQUFBLENBQUEvQixNQUFBLENBQUEsRUFBQTs7QUFFQTtBQUNBLHdCQUFBc0IsVUFBQTtBQUFBLHdCQUFBQyxVQUFBO0FBQUEsd0JBQUFDLFdBQUE7QUFBQSx3QkFBQUMsV0FBQTtBQUFBLHdCQUFBUyxlQUFBO0FBQUEsd0JBQUFDLGVBQUE7QUFBQSx3QkFBQUMsV0FBQTs7QUFFQTtBQUNBLHlCQUFBLElBQUFyQixJQUFBLENBQUEsRUFBQUEsSUFBQSxLQUFBN0Isa0JBQUEsQ0FBQWMsTUFBQSxFQUFBZSxHQUFBLEVBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FPLDRCQUFBL0MsS0FBQUMsS0FBQSxDQUFBLEtBQUFVLGtCQUFBLENBQUE2QixDQUFBLEVBQUEsQ0FBQSxJQUFBLEtBQUFwRSxjQUFBLENBQUE7QUFDQTRFLDRCQUFBaEQsS0FBQUMsS0FBQSxDQUFBLEtBQUFVLGtCQUFBLENBQUE2QixDQUFBLEVBQUEsQ0FBQSxJQUFBLEtBQUFwRSxjQUFBLENBQUE7QUFDQTZFLDZCQUFBakQsS0FBQUMsS0FBQSxDQUFBLEtBQUFVLGtCQUFBLENBQUE2QixDQUFBLEVBQUEsQ0FBQSxJQUFBLEtBQUFwRSxjQUFBLENBQUE7QUFDQThFLDZCQUFBbEQsS0FBQUMsS0FBQSxDQUFBLEtBQUFVLGtCQUFBLENBQUE2QixDQUFBLEVBQUEsQ0FBQSxJQUFBLEtBQUFwRSxjQUFBLENBQUE7O0FBRUE7QUFDQTBCLDRCQUFBZ0UsSUFBQSxHQUFBLEtBQUFsRixVQUFBLFNBQUEsS0FBQUYsU0FBQSxVQUFBLEtBQUFELFdBQUE7QUFDQXFCLDRCQUFBaUUsU0FBQSxHQUFBLEtBQUFwRixVQUFBO0FBQ0FtQiw0QkFBQWtFLFNBQUEsR0FBQSxLQUFBbkYsVUFBQTtBQUNBaUIsNEJBQUFtRSxZQUFBLEdBQUEsS0FBQW5GLGFBQUE7O0FBRUE7QUFDQStFLDZCQUFBLEtBQUE7O0FBRUE7QUFDQSw0QkFBQWQsS0FBQTdCLFNBQUEsSUFBQUEsYUFBQStCLEVBQUEsSUFDQUQsS0FBQTNCLFNBQUEsSUFBQUEsYUFBQTZCLEVBREEsSUFFQSxLQUFBTSxnQkFBQSxDQUFBL0IsTUFBQSxHQUFBLENBRkEsRUFFQTs7QUFFQTtBQUNBa0MscUNBQUEzRCxLQUFBQyxLQUFBLENBQUFnRCxLQUFBLENBQUFBLEtBQUFGLENBQUEsSUFBQSxDQUFBLENBQUE7QUFDQWEscUNBQUE1RCxLQUFBQyxLQUFBLENBQUFpRCxLQUFBLENBQUFBLEtBQUFGLENBQUEsSUFBQSxDQUFBLENBQUE7O0FBRUE7QUFDQWxELGdDQUFBb0UsUUFBQSxDQUFBLEtBQUFWLGdCQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUFHLE1BQUEsRUFBQUMsTUFBQTs7QUFFQTtBQUNBLGdDQUFBLEtBQUE5QyxpQkFBQSxFQUFBO0FBQ0FoQixvQ0FBQTFDLFNBQUEsR0FBQSxLQUFBa0IsVUFBQTtBQUNBd0Isb0NBQUFrQyxXQUFBLEdBQUEsS0FBQXpELFVBQUE7QUFDQXVCLG9DQUFBcUUsVUFBQSxDQUFBcEIsQ0FBQSxFQUFBQyxDQUFBLEVBQUFDLEtBQUFGLENBQUEsRUFBQUcsS0FBQUYsQ0FBQTtBQUNBOztBQUVBO0FBQ0EsaUNBQUFTLGtCQUFBLENBQUEsS0FBQUEsa0JBQUEsQ0FBQWhDLE1BQUEsSUFBQSxDQUFBLEtBQUErQixnQkFBQSxDQUFBWSxLQUFBLEVBQUEsRUFBQSxLQUFBekQsa0JBQUEsQ0FBQTZCLENBQUEsQ0FBQSxDQUFBOztBQUVBcUIsaUNBQUEsSUFBQTtBQUNBOztBQUVBLDRCQUFBQSxFQUFBLEVBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7K0NBSUE7QUFDQVQsb0JBQUFDLEdBQUEsQ0FBQVgsS0FBQUMsU0FBQSxDQUFBLEtBQUFoQyxrQkFBQSxDQUFBO0FBQ0EsbUJBQUEsS0FBQUEsa0JBQUE7QUFDQTs7QUFFQTs7Ozs7Ozs2Q0FJQTtBQUNBeUMsb0JBQUFDLEdBQUEsQ0FBQVgsS0FBQUMsU0FBQSxDQUFBLEtBQUFhLGdCQUFBLENBQUE7QUFDQSxtQkFBQSxLQUFBQSxnQkFBQTtBQUNBOztBQUVBOzs7Ozs7OytDQUlBO0FBQ0FKLG9CQUFBQyxHQUFBLENBQUFYLEtBQUFDLFNBQUEsQ0FBQSxLQUFBYyxrQkFBQSxDQUFBO0FBQ0EsbUJBQUEsS0FBQUEsa0JBQUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OzBDQVNBWSxhLEVBQUFDLFUsRUFBQUMsTyxFQUFBQyxVLEVBQUE7QUFDQSxpQkFBQSxJQUFBaEMsSUFBQSxDQUFBLEVBQUFBLElBQUE2QixjQUFBNUMsTUFBQSxFQUFBZSxHQUFBLEVBQUE7O0FBRUE7QUFDQSxvQkFBQU8sSUFBQS9DLEtBQUFDLEtBQUEsQ0FBQW9FLGNBQUE3QixDQUFBLEVBQUEsQ0FBQSxJQUFBK0IsT0FBQSxDQUFBO0FBQUEsb0JBQ0F2QixJQUFBaEQsS0FBQUMsS0FBQSxDQUFBb0UsY0FBQTdCLENBQUEsRUFBQSxDQUFBLElBQUErQixPQUFBLENBREE7QUFBQSxvQkFFQXRCLEtBQUFqRCxLQUFBQyxLQUFBLENBQUFvRSxjQUFBN0IsQ0FBQSxFQUFBLENBQUEsSUFBQStCLE9BQUEsQ0FGQTtBQUFBLG9CQUdBckIsS0FBQWxELEtBQUFDLEtBQUEsQ0FBQW9FLGNBQUE3QixDQUFBLEVBQUEsQ0FBQSxJQUFBK0IsT0FBQSxDQUhBOztBQUtBLG9CQUFBeEIsS0FBQXVCLFdBQUEsQ0FBQSxDQUFBLElBQUFBLFdBQUEsQ0FBQSxLQUFBckIsRUFBQSxJQUFBRCxLQUFBc0IsV0FBQSxDQUFBLENBQUEsSUFBQUEsV0FBQSxDQUFBLEtBQUFwQixFQUFBLElBQUFzQixhQUFBLENBQUEsRUFBQTtBQUNBLDJCQUFBLElBQUE7QUFDQTtBQUNBO0FBQ0EsbUJBQUEsS0FBQTtBQUNBOzs7O0VBdktBeEgsYzs7QUEwS0FzRyx1QkFBQWhELE9BQUEsR0FBQWdELHNCQUFBOztBQ3JMQTs7Ozs7OztBQU9BOzs7OztJQUlBbUIsbUI7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLGlDQUFBeEgsZUFBQSxFQUtBO0FBQUEsWUFMQUMsV0FLQSx1RUFMQSxFQUtBO0FBQUEsWUFMQUMsUUFLQSx1RUFMQSxFQUtBO0FBQUEsWUFKQUMsU0FJQSx1RUFKQSxHQUlBO0FBQUEsWUFKQUMsU0FJQSx1RUFKQSxTQUlBO0FBQUEsWUFKQUMsUUFJQSx1RUFKQSxLQUlBO0FBQUEsWUFKQUMsVUFJQSx1RUFKQSxPQUlBO0FBQUEsWUFIQUMsUUFHQSx1RUFIQSxJQUdBO0FBQUEsWUFIQUMsU0FHQSx1RUFIQSxTQUdBO0FBQUEsWUFIQUMsU0FHQSx1RUFIQSxTQUdBO0FBQUEsWUFIQUMsU0FHQSwwRUFIQSxRQUdBO0FBQUEsWUFGQUMsWUFFQSwwRUFGQSxRQUVBO0FBQUEsWUFGQUMsSUFFQSwwRUFGQSxHQUVBO0FBQUEsWUFGQUMsU0FFQSwwRUFGQWYsY0FFQTtBQUFBLFlBQUF5RCxpQkFBQSwwRUFBQSxFQUFBO0FBQUEsWUFBQUUsZ0JBQUEsMEVBQUEsSUFBQTs7QUFBQTs7QUFLQTtBQUxBLCtJQUVBekQsZUFGQSxFQUVBQyxXQUZBLEVBRUFDLFFBRkEsRUFFQUMsU0FGQSxFQUVBQyxTQUZBLEVBRUFDLFFBRkEsRUFFQUMsVUFGQSxFQUdBQyxRQUhBLEVBR0FDLFNBSEEsRUFHQUMsU0FIQSxFQUdBQyxTQUhBLEVBR0FDLFlBSEEsRUFHQUMsSUFIQSxFQUdBQyxTQUhBOztBQU1BLGVBQUE2QyxrQkFBQSxHQUFBSCxpQkFBQSxDQU5BLENBTUE7QUFDQSxlQUFBa0UsbUJBQUEsR0FBQSxFQUFBLENBUEEsQ0FPQTtBQUNBLGVBQUFDLGdCQUFBLEdBQUEsQ0FBQSxDQVJBLENBUUE7QUFDQSxlQUFBN0QsaUJBQUEsR0FBQUosZ0JBQUEsQ0FUQSxDQVNBOztBQUVBO0FBQ0EsZUFBQTFDLGNBQUEsQ0FBQW9CLGdCQUFBLENBQUEsT0FBQSxFQUFBLE9BQUE2QixXQUFBLENBQUEzQixJQUFBLFFBQUEsRUFBQSxLQUFBO0FBWkE7QUFhQTs7QUFFQTs7Ozs7Ozs7OztvQ0FNQUUsSyxFQUFBO0FBQ0E7QUFDQSxnQkFBQTBCLFlBQUExQixNQUFBMkIsS0FBQSxHQUFBM0IsTUFBQUMsYUFBQSxDQUFBMkIsVUFBQTtBQUFBLGdCQUNBQyxZQUFBN0IsTUFBQThCLEtBQUEsR0FBQTlCLE1BQUFDLGFBQUEsQ0FBQThCLFNBREE7QUFFQTs7QUFFQSxnQkFBQSxLQUFBdkQsY0FBQSxDQUFBaUIsVUFBQSxFQUFBO0FBQ0E7QUFDQSxvQkFBQWEsTUFBQSxLQUFBOUIsY0FBQSxDQUFBaUIsVUFBQSxDQUFBLElBQUEsQ0FBQTs7QUFFQTtBQUNBLG9CQUFBMkYsZ0JBQUEsS0FBQWpFLGtCQUFBLENBQUFjLE1BQUE7O0FBRUE7QUFDQSxvQkFBQSxDQUFBLEtBQUFvRCxrQkFBQSxDQUFBLEtBQUFILG1CQUFBLEVBQUEsQ0FBQXhELFNBQUEsRUFBQUcsU0FBQSxDQUFBLEVBQUEsS0FBQWpELGNBQUEsRUFBQSxLQUFBdUcsZ0JBQUEsRUFBQUMsYUFBQSxDQUFBLEVBQUE7O0FBRUE7QUFDQSx3QkFBQTdCLFVBQUE7QUFBQSx3QkFBQUMsVUFBQTtBQUFBLHdCQUFBQyxXQUFBO0FBQUEsd0JBQUFDLFdBQUE7QUFBQSx3QkFBQVMsZUFBQTtBQUFBLHdCQUFBQyxlQUFBO0FBQUEsd0JBQUFrQixjQUFBO0FBQUEsd0JBQUFDLFlBQUE7QUFBQSx3QkFBQWxCLFdBQUE7O0FBRUE7QUFDQSx5QkFBQSxJQUFBckIsSUFBQSxDQUFBLEVBQUFBLElBQUEsS0FBQTdCLGtCQUFBLENBQUFjLE1BQUEsRUFBQWUsR0FBQSxFQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBTyw0QkFBQS9DLEtBQUFDLEtBQUEsQ0FBQSxLQUFBVSxrQkFBQSxDQUFBNkIsQ0FBQSxFQUFBLENBQUEsSUFBQSxLQUFBcEUsY0FBQSxDQUFBO0FBQ0E0RSw0QkFBQWhELEtBQUFDLEtBQUEsQ0FBQSxLQUFBVSxrQkFBQSxDQUFBNkIsQ0FBQSxFQUFBLENBQUEsSUFBQSxLQUFBcEUsY0FBQSxDQUFBO0FBQ0E2RSw2QkFBQWpELEtBQUFDLEtBQUEsQ0FBQSxLQUFBVSxrQkFBQSxDQUFBNkIsQ0FBQSxFQUFBLENBQUEsSUFBQSxLQUFBcEUsY0FBQSxDQUFBO0FBQ0E4RSw2QkFBQWxELEtBQUFDLEtBQUEsQ0FBQSxLQUFBVSxrQkFBQSxDQUFBNkIsQ0FBQSxFQUFBLENBQUEsSUFBQSxLQUFBcEUsY0FBQSxDQUFBOztBQUVBO0FBQ0EwQiw0QkFBQWdFLElBQUEsR0FBQSxLQUFBbEYsVUFBQSxTQUFBLEtBQUFGLFNBQUEsVUFBQSxLQUFBRCxXQUFBO0FBQ0FxQiw0QkFBQWlFLFNBQUEsR0FBQSxLQUFBcEYsVUFBQTtBQUNBbUIsNEJBQUFrRSxTQUFBLEdBQUEsS0FBQW5GLFVBQUE7QUFDQWlCLDRCQUFBbUUsWUFBQSxHQUFBLEtBQUFuRixhQUFBOztBQUVBOztBQUVBO0FBQ0ErRSw2QkFBQSxLQUFBOztBQUVBO0FBQ0EsNEJBQUFkLEtBQUE3QixTQUFBLElBQUFBLGFBQUErQixFQUFBLElBQ0FELEtBQUEzQixTQUFBLElBQUFBLGFBQUE2QixFQURBLElBRUEsS0FBQXlCLGdCQUFBLEdBQUFDLGFBRkEsRUFFQTs7QUFFQTtBQUNBLGlDQUFBRCxnQkFBQTs7QUFFQTtBQUNBaEIscUNBQUEzRCxLQUFBQyxLQUFBLENBQUFnRCxLQUFBLENBQUFBLEtBQUFGLENBQUEsSUFBQSxDQUFBLENBQUE7QUFDQWEscUNBQUE1RCxLQUFBQyxLQUFBLENBQUFpRCxLQUFBLENBQUFBLEtBQUFGLENBQUEsSUFBQSxDQUFBLENBQUE7O0FBRUE7QUFDQThCLG9DQUFBLEtBQUFILGdCQUFBLENBQUF2RSxRQUFBLEVBQUE7O0FBRUE7QUFDQSxnQ0FBQSxLQUFBcEIsVUFBQSxLQUFBaEMsZUFBQWdJLGNBQUEsRUFBQTs7QUFFQTtBQUNBRCxzQ0FBQS9FLEtBQUFpRixLQUFBLENBQUEsS0FBQU4sZ0JBQUEsR0FBQSxFQUFBLENBQUE7QUFDQUcsd0NBQUEsQ0FBQUMsT0FBQSxDQUFBLEdBQUFHLE9BQUFDLFlBQUEsQ0FBQSxLQUFBLEtBQUFSLGdCQUFBLEdBQUEsRUFBQSxDQUFBLEdBQUEsRUFBQSxJQUNBTyxPQUFBQyxZQUFBLENBQUEsS0FBQSxLQUFBUixnQkFBQSxHQUFBLEVBQUEsQ0FEQTtBQUVBOztBQUVBO0FBQ0E3RSxnQ0FBQW9FLFFBQUEsQ0FBQVksS0FBQSxFQUFBbkIsTUFBQSxFQUFBQyxNQUFBOztBQUVBO0FBQ0EsZ0NBQUEsS0FBQTlDLGlCQUFBLEVBQUE7QUFDQWhCLG9DQUFBMUMsU0FBQSxHQUFBLEtBQUFrQixVQUFBO0FBQ0F3QixvQ0FBQWtDLFdBQUEsR0FBQSxLQUFBekQsVUFBQTtBQUNBdUIsb0NBQUFxRSxVQUFBLENBQUFwQixDQUFBLEVBQUFDLENBQUEsRUFBQUMsS0FBQUYsQ0FBQSxFQUFBRyxLQUFBRixDQUFBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBQTBCLG1CQUFBLENBQUEsS0FBQUEsbUJBQUEsQ0FBQWpELE1BQUEsSUFBQSxLQUFBZCxrQkFBQSxDQUFBNkIsQ0FBQSxDQUFBOztBQUVBcUIsaUNBQUEsSUFBQTtBQUNBOztBQUVBLDRCQUFBQSxFQUFBLEVBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBQSxLQUFBdUIscUJBQUEsRUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OzsyQ0FVQUMsYyxFQUFBZixVLEVBQUFDLE8sRUFBQWUsZSxFQUFBVixhLEVBQUE7O0FBRUEsaUJBQUEsSUFBQXBDLElBQUEsQ0FBQSxFQUFBQSxJQUFBNkMsZUFBQTVELE1BQUEsRUFBQWUsR0FBQSxFQUFBOztBQUVBO0FBQ0Esb0JBQUFPLElBQUEvQyxLQUFBQyxLQUFBLENBQUFvRixlQUFBN0MsQ0FBQSxFQUFBLENBQUEsSUFBQStCLE9BQUEsQ0FBQTtBQUFBLG9CQUNBdkIsSUFBQWhELEtBQUFDLEtBQUEsQ0FBQW9GLGVBQUE3QyxDQUFBLEVBQUEsQ0FBQSxJQUFBK0IsT0FBQSxDQURBO0FBQUEsb0JBRUF0QixLQUFBakQsS0FBQUMsS0FBQSxDQUFBb0YsZUFBQTdDLENBQUEsRUFBQSxDQUFBLElBQUErQixPQUFBLENBRkE7QUFBQSxvQkFHQXJCLEtBQUFsRCxLQUFBQyxLQUFBLENBQUFvRixlQUFBN0MsQ0FBQSxFQUFBLENBQUEsSUFBQStCLE9BQUEsQ0FIQTs7QUFLQSxvQkFBQXhCLEtBQUF1QixXQUFBLENBQUEsQ0FBQSxJQUFBQSxXQUFBLENBQUEsS0FBQXJCLEVBQUEsSUFDQUQsS0FBQXNCLFdBQUEsQ0FBQSxDQUFBLElBQUFBLFdBQUEsQ0FBQSxLQUFBcEIsRUFEQSxJQUVBb0Msa0JBQUFWLGFBRkEsRUFFQTtBQUNBLDJCQUFBLElBQUE7QUFDQTtBQUNBOztBQUVBLG1CQUFBLEtBQUE7QUFDQTs7QUFFQTs7Ozs7OztnREFJQTtBQUNBeEIsb0JBQUFDLEdBQUEsQ0FBQVgsS0FBQUMsU0FBQSxDQUFBLEtBQUErQixtQkFBQSxDQUFBO0FBQ0EsbUJBQUEsS0FBQUEsbUJBQUE7QUFDQTs7OztFQTlLQTFILGM7O0FBa0xBeUgsb0JBQUFuRSxPQUFBLEdBQUFtRSxtQkFBQTs7QUM3TEE7Ozs7Ozs7QUFRQTs7Ozs7SUFJQWMsNEI7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLDBDQUFBdEksZUFBQSxFQUtBO0FBQUEsWUFMQUMsV0FLQSx1RUFMQSxFQUtBO0FBQUEsWUFMQUMsUUFLQSx1RUFMQSxFQUtBO0FBQUEsWUFKQUMsU0FJQSx1RUFKQSxHQUlBO0FBQUEsWUFKQUMsU0FJQSx1RUFKQSxTQUlBO0FBQUEsWUFKQUMsUUFJQSx1RUFKQSxLQUlBO0FBQUEsWUFKQUMsVUFJQSx1RUFKQSxPQUlBO0FBQUEsWUFIQUMsUUFHQSx1RUFIQSxJQUdBO0FBQUEsWUFIQUMsU0FHQSx1RUFIQSxTQUdBO0FBQUEsWUFIQUMsU0FHQSx1RUFIQSxTQUdBO0FBQUEsWUFIQUMsU0FHQSwwRUFIQSxRQUdBO0FBQUEsWUFGQUMsWUFFQSwwRUFGQSxRQUVBO0FBQUEsWUFGQUMsSUFFQSwwRUFGQSxHQUVBO0FBQUEsWUFGQUMsU0FFQSwwRUFGQWYsY0FFQTtBQUFBLFlBQUF5RCxpQkFBQSwwRUFBQSxFQUFBO0FBQUEsWUFBQUUsZ0JBQUEsMEVBQUEsSUFBQTs7QUFBQTs7QUFLQTtBQUxBLGlLQUVBekQsZUFGQSxFQUVBQyxXQUZBLEVBRUFDLFFBRkEsRUFFQUMsU0FGQSxFQUVBQyxTQUZBLEVBRUFDLFFBRkEsRUFFQUMsVUFGQSxFQUdBQyxRQUhBLEVBR0FDLFNBSEEsRUFHQUMsU0FIQSxFQUdBQyxTQUhBLEVBR0FDLFlBSEEsRUFHQUMsSUFIQSxFQUdBQyxTQUhBOztBQU1BLGVBQUE2QyxrQkFBQSxHQUFBSCxpQkFBQSxDQU5BLENBTUE7QUFDQSxlQUFBSyxzQkFBQSxHQUFBLEVBQUEsQ0FQQSxDQU9BO0FBQ0EsZUFBQUMsaUJBQUEsR0FBQUosZ0JBQUEsQ0FSQSxDQVFBO0FBQ0EsZUFBQU0sNEJBQUEsR0FBQSxDQUFBOztBQUVBO0FBQ0EsZUFBQWhELGNBQUEsQ0FBQW9CLGdCQUFBLENBQUEsT0FBQSxFQUFBLE9BQUE2QixXQUFBLENBQUEzQixJQUFBLFFBQUEsRUFBQSxLQUFBO0FBWkE7QUFhQTs7QUFFQTs7Ozs7Ozs7OztvQ0FNQUUsSyxFQUFBOztBQUVBO0FBQ0EsZ0JBQUEwQixZQUFBMUIsTUFBQTJCLEtBQUEsR0FBQTNCLE1BQUFDLGFBQUEsQ0FBQTJCLFVBQUE7QUFBQSxnQkFDQUMsWUFBQTdCLE1BQUE4QixLQUFBLEdBQUE5QixNQUFBQyxhQUFBLENBQUE4QixTQURBO0FBRUE7O0FBRUEsZ0JBQUEsS0FBQXZELGNBQUEsQ0FBQWlCLFVBQUEsRUFBQTtBQUNBO0FBQ0Esb0JBQUFhLE1BQUEsS0FBQTlCLGNBQUEsQ0FBQWlCLFVBQUEsQ0FBQSxJQUFBLENBQUE7O0FBRUE7QUFDQSxvQkFBQSxLQUFBK0IsNEJBQUEsR0FBQSxLQUFBTCxrQkFBQSxDQUFBYyxNQUFBLEVBQUE7O0FBRUE7QUFDQSx3QkFBQXNCLFVBQUE7QUFBQSx3QkFBQUMsVUFBQTtBQUFBLHdCQUFBQyxXQUFBO0FBQUEsd0JBQUFDLFdBQUE7QUFBQSx3QkFBQVcsV0FBQTs7QUFFQTtBQUNBL0Qsd0JBQUFnRSxJQUFBLEdBQUEsS0FBQWxGLFVBQUEsU0FBQSxLQUFBRixTQUFBLFVBQUEsS0FBQUQsV0FBQTtBQUNBcUIsd0JBQUFpRSxTQUFBLEdBQUEsS0FBQXBGLFVBQUE7QUFDQW1CLHdCQUFBa0UsU0FBQSxHQUFBLEtBQUFuRixVQUFBO0FBQ0FpQix3QkFBQW1FLFlBQUEsR0FBQSxLQUFBbkYsYUFBQTs7QUFFQTtBQUNBZ0Isd0JBQUFvRSxRQUFBLENBQUEsS0FBQW5GLEtBQUEsRUFBQW1DLFNBQUEsRUFBQUcsU0FBQTs7QUFFQTtBQUNBLHlCQUFBTCw0QkFBQTs7QUFFQTtBQUNBLHlCQUFBLElBQUF3QixJQUFBLENBQUEsRUFBQUEsSUFBQSxLQUFBN0Isa0JBQUEsQ0FBQWMsTUFBQSxFQUFBZSxHQUFBLEVBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FPLDRCQUFBL0MsS0FBQUMsS0FBQSxDQUFBLEtBQUFVLGtCQUFBLENBQUE2QixDQUFBLEVBQUEsQ0FBQSxJQUFBLEtBQUFwRSxjQUFBLENBQUE7QUFDQTRFLDRCQUFBaEQsS0FBQUMsS0FBQSxDQUFBLEtBQUFVLGtCQUFBLENBQUE2QixDQUFBLEVBQUEsQ0FBQSxJQUFBLEtBQUFwRSxjQUFBLENBQUE7QUFDQTZFLDZCQUFBakQsS0FBQUMsS0FBQSxDQUFBLEtBQUFVLGtCQUFBLENBQUE2QixDQUFBLEVBQUEsQ0FBQSxJQUFBLEtBQUFwRSxjQUFBLENBQUE7QUFDQThFLDZCQUFBbEQsS0FBQUMsS0FBQSxDQUFBLEtBQUFVLGtCQUFBLENBQUE2QixDQUFBLEVBQUEsQ0FBQSxJQUFBLEtBQUFwRSxjQUFBLENBQUE7O0FBRUE7O0FBRUE7QUFDQXlGLDZCQUFBLEtBQUE7O0FBRUE7QUFDQSw0QkFBQWQsS0FBQTdCLFNBQUEsSUFBQUEsYUFBQStCLEVBQUEsSUFDQUQsS0FBQTNCLFNBQUEsSUFBQUEsYUFBQTZCLEVBREEsRUFDQTs7QUFFQTtBQUNBLGdDQUFBLEtBQUFwQyxpQkFBQSxFQUFBO0FBQ0FoQixvQ0FBQTFDLFNBQUEsR0FBQSxLQUFBa0IsVUFBQTtBQUNBd0Isb0NBQUFrQyxXQUFBLEdBQUEsS0FBQXpELFVBQUE7QUFDQXVCLG9DQUFBcUUsVUFBQSxDQUFBcEIsQ0FBQSxFQUFBQyxDQUFBLEVBQUFDLEtBQUFGLENBQUEsRUFBQUcsS0FBQUYsQ0FBQTtBQUNBOztBQUVBO0FBQ0EsaUNBQUFuQyxzQkFBQSxDQUFBLEtBQUFBLHNCQUFBLENBQUFZLE1BQUEsSUFBQSxLQUFBZCxrQkFBQSxDQUFBNkIsQ0FBQSxDQUFBOztBQUVBcUIsaUNBQUEsSUFBQTtBQUNBOztBQUVBLDRCQUFBQSxFQUFBLEVBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBQSxLQUFBMkIsd0JBQUEsRUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OzttREFJQTtBQUNBcEMsb0JBQUFDLEdBQUEsQ0FBQVgsS0FBQUMsU0FBQSxDQUFBLEtBQUE5QixzQkFBQSxDQUFBO0FBQ0EsbUJBQUEsS0FBQUEsc0JBQUE7QUFDQTs7OztFQTdIQTdELGM7O0FBZ0lBdUksNkJBQUFqRixPQUFBLEdBQUFpRiw0QkFBQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoid2ljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUHJvamVjdDogSUNFLmpzLlxuICogQXV0aG9yOiBZdWxpbyBBbGVtYW4gSmltZW5leiBbQHl1bGlvYWoyOTBdXG4gKiBEYXRlOiA4LzI4LzE4XG4gKiBDcmVhdGVkIGJ5IFdlYlN0b3JtXG4gKi9cblxuLy8gVHlwZSBvZiBjaGFyYWN0ZXIgZm9yIG9yZGVyIGV4ZXJjaXNlc1xuY29uc3QgT1JERVJfVFlQRV9BTFBIQSA9IDAsXG4gICAgT1JERVJfVFlQRV9OVU0gPSAxO1xuLyoqXG4gKiBTdXBlcmNsYXNzIENhbnZhc0V4ZXJjaXNlIGRlZmluZSBnZW5lcmFsIHByb3BlcnRpZXMgYW5kIGluaXRpYWxpemF0aW9uIGZ1bmN0aW9ucyBmb3IgYWxsIGtpbmQgb2YgY2FudmFzIGV4ZXJjaXNlcy5cbiAqL1xuY2xhc3MgQ2FudmFzRXhlcmNpc2Uge1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3Igb2YgQ2FudmFzRXhlcmNpc2UgY2xhc3MuXG4gICAgICogQHBhcmFtIGNhbnZhc0VsZW1lbnRJZFxuICAgICAqIEBwYXJhbSBjYW52YXNXaWR0aFxuICAgICAqIEBwYXJhbSBpbWFnZVNyY1xuICAgICAqIEBwYXJhbSBsaW5lV2lkdGhcbiAgICAgKiBAcGFyYW0gbGluZUNvbG9yXG4gICAgICogQHBhcmFtIGxpbmVIZWFkXG4gICAgICogQHBhcmFtIGZvbnRGYW1pbHlcbiAgICAgKiBAcGFyYW0gZm9udFNpemVcbiAgICAgKiBAcGFyYW0gZm9udENvbG9yXG4gICAgICogQHBhcmFtIGZvbnRTdHlsZVxuICAgICAqIEBwYXJhbSBmb250QWxpZ25cbiAgICAgKiBAcGFyYW0gZm9udEJhc2VsaW5lXG4gICAgICogQHBhcmFtIG1hcmtcbiAgICAgKiBAcGFyYW0gb3JkZXJUeXBlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY2FudmFzRWxlbWVudElkLCBjYW52YXNXaWR0aCA9ICcnLCBpbWFnZVNyYyA9ICcnLFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aCA9ICcyJywgbGluZUNvbG9yID0gJyMwMDAwMDAnLCBsaW5lSGVhZCA9IGZhbHNlLCBmb250RmFtaWx5ID0gJ0FyaWFsJyxcbiAgICAgICAgICAgICAgICBmb250U2l6ZSA9ICcyMCcsIGZvbnRDb2xvciA9ICcjMDAwMDAwJywgZm9udFN0eWxlID0gJ3JlZ3VsYXInLCBmb250QWxpZ24gPSAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICBmb250QmFzZWxpbmUgPSAnbWlkZGxlJywgbWFyayA9ICdYJywgb3JkZXJUeXBlID0gT1JERVJfVFlQRV9OVU0pIHtcblxuICAgICAgICB0aGlzLl9jYW52YXNFbGVtZW50SWQgPSBjYW52YXNFbGVtZW50SWQ7ICAgIC8vIGRlZmluZSB0aGUgY2FudmFzIEhUTUwgZWxlbWVudCB0byBsaW5rIHdpdGhcbiAgICAgICAgdGhpcy5fY2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuX2NhbnZhc0VsZW1lbnRJZCk7XG4gICAgICAgIHRoaXMuX2NhbnZhc1dpZHRoID0gY2FudmFzV2lkdGg7XG4gICAgICAgIHRoaXMuX2NhbnZhc0Rpdmlzb3IgPSAwO1xuICAgICAgICB0aGlzLl9pbWFnZVNyYyA9IGltYWdlU3JjO1xuICAgICAgICB0aGlzLl9saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gICAgICAgIHRoaXMuX2xpbmVDb2xvciA9IGxpbmVDb2xvcjtcbiAgICAgICAgdGhpcy5fbGluZUhlYWQgPSBsaW5lSGVhZDtcbiAgICAgICAgdGhpcy5fZm9udEZhbWlseSA9IGZvbnRGYW1pbHk7XG4gICAgICAgIHRoaXMuX2ZvbnRTaXplID0gZm9udFNpemU7XG4gICAgICAgIHRoaXMuX2ZvbnRDb2xvciA9IGZvbnRDb2xvcjtcbiAgICAgICAgdGhpcy5fZm9udFN0eWxlID0gZm9udFN0eWxlO1xuICAgICAgICB0aGlzLl9mb250QWxpZ24gPSBmb250QWxpZ247XG4gICAgICAgIHRoaXMuX2ZvbnRCYXNlbGluZSA9IGZvbnRCYXNlbGluZTtcbiAgICAgICAgdGhpcy5fbWFyayA9IG1hcms7XG4gICAgICAgIHRoaXMuX29yZGVyVHlwZSA9IG9yZGVyVHlwZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgY29uc3RhbnQgdmFsdWUgZm9yIGFscGhhYmV0aWMgb3JkZXJpbmcgb2JqZWN0cy5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgb3JkZXJUeXBlQWxwaGEoKSB7XG4gICAgICAgIHJldHVybiBPUkRFUl9UWVBFX0FMUEhBO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBjb25zdGFudCB2YWx1ZSBmb3IgbnVtZXJpYyBvcmRlcmluZyBvYmplY3RzLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgc3RhdGljIGdldCBvcmRlclR5cGVOdW0oKSB7XG4gICAgICAgIHJldHVybiBPUkRFUl9UWVBFX05VTTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgbWFyayB1c2VkIHRvIFBvc2l0aW9uIE9iamVjdCBvdmVyIGNhbnZhcyBpbWFnZVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8Kn1cbiAgICAgKi9cbiAgICBnZXRNYXJrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFyaztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIGNhbnZhcyBlbGVtZW50IGFuZCBsb2FkIHRoZSBpbWFnZS5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGluaXRpYWxpemVDYW52YXMoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX2NhbnZhc0VsZW1lbnQuZ2V0Q29udGV4dCkge1xuXG4gICAgICAgICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7ICAgICAgLy8gQ3JlYXRlIG5ldyBpbWcgZWxlbWVudFxuXG4gICAgICAgICAgICAvLyBiaW5kaW5nIGZ1bmN0aW9uIHRvIGxvYWQgaW1hZ2UsIHRvIHRoZSBsb2FkIGV2ZW50XG4gICAgICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgdGhpcy5fb25Mb2FkSW1hZ2UuYmluZCh0aGlzKSwgZmFsc2UpO1xuXG4gICAgICAgICAgICAvLyBTZXQgc291cmNlIHBhdGggb2YgaW1hZ2VcbiAgICAgICAgICAgIGltZy5zcmMgPSB0aGlzLl9pbWFnZVNyYztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrQWN0aW9uKGV2ZW50KXtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgX29uTG9hZEltYWdlKGV2ZW50KSB7XG5cbiAgICAgICAgLy8gZ2V0dGluZyBpbWFnZSBvYmplY3QsIHdpdGggYW5kIGhlaWdodFxuICAgICAgICBsZXQgaW1nID0gZXZlbnQuY3VycmVudFRhcmdldCxcbiAgICAgICAgICAgIGltYWdlV2lkdGggPSBpbWcud2lkdGgsXG4gICAgICAgICAgICBpbWFnZUhlaWdodCA9IGltZy5oZWlnaHQsXG4gICAgICAgIC8vIGdldHRpbmcgMmQgY29udGV4dCBmcm9tIGNhbnZhcyBlbGVtZW50XG4gICAgICAgICAgICBjdHggPSB0aGlzLl9jYW52YXNFbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICAvLyBzZXR0aW5nIGNhbnZhcyBkaXZpc29yIHRvIHVzZSB3aGVuIHdpZHRoIGFuZC9vciBkaXNwbGF5IHJlc29sdXRpb24gY2hhbmdlc1xuICAgICAgICB0aGlzLl9jYW52YXNEaXZpc29yID0gaW1hZ2VXaWR0aCAvIHRoaXMuX2NhbnZhc1dpZHRoO1xuXG4gICAgICAgIGxldCBmaW5hbFdpZHRoID0gTWF0aC5yb3VuZChpbWFnZVdpZHRoIC8gdGhpcy5fY2FudmFzRGl2aXNvciksXG4gICAgICAgICAgICBmaW5hbEhlaWdodCA9IE1hdGgucm91bmQoaW1hZ2VIZWlnaHQgLyB0aGlzLl9jYW52YXNEaXZpc29yKTtcblxuICAgICAgICAvLyBzZXR0aW5nIGNhbnZhcyBlbGVtZW50IGRpbWVuc2lvbnNcbiAgICAgICAgdGhpcy5fY2FudmFzRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgZmluYWxXaWR0aC50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5fY2FudmFzRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGZpbmFsSGVpZ2h0LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIC8vIGRyYXdpbmcgaW1hZ2VcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDAsIGltYWdlV2lkdGgsIGltYWdlSGVpZ2h0LCAwLCAwLCBmaW5hbFdpZHRoLCBmaW5hbEhlaWdodCk7XG4gICAgfVxufVxuXG5DYW52YXNFeGVyY2lzZS5leHBvcnRzID0gQ2FudmFzRXhlcmNpc2U7XG5cbiIsIi8qKlxuICogUHJvamVjdDogd2ljZS5qcy5cbiAqIEF1dGhvcjogWXVsaW8gQWxlbWFuIEppbWVuZXogW0B5dWxpb2FqMjkwXVxuICogRGF0ZTogMjIvMDkvMThcbiAqIENyZWF0ZWQgYnkgV2ViU3Rvcm1cbiAqL1xuXG5cbi8qKlxuICogQXNzb2NpYXRlQ2FudmFzRXhlcmNpc2UgZXh0ZW5kcyBmcm9tIENhbnZhc0V4ZXJjaXNlIHN1cGVyY2xhc3MuXG4gKiBEZWZpbmUgdGhlIGFzc29jaWF0ZSBvYmplY3QgZXhlcmNpc2VzXG4gKi9cbmNsYXNzIEFzc29jaWF0ZUNhbnZhc0V4ZXJjaXNlIGV4dGVuZHMgQ2FudmFzRXhlcmNpc2Uge1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3Igb2YgdGhlIEFzc29jaWF0ZUNhbnZhc0V4ZXJjaXNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSBjYW52YXNFbGVtZW50SWRcbiAgICAgKiBAcGFyYW0gY2FudmFzV2lkdGhcbiAgICAgKiBAcGFyYW0gaW1hZ2VTcmNcbiAgICAgKiBAcGFyYW0gbGluZVdpZHRoXG4gICAgICogQHBhcmFtIGxpbmVDb2xvclxuICAgICAqIEBwYXJhbSBsaW5lSGVhZFxuICAgICAqIEBwYXJhbSBmb250RmFtaWx5XG4gICAgICogQHBhcmFtIGZvbnRTaXplXG4gICAgICogQHBhcmFtIGZvbnRDb2xvclxuICAgICAqIEBwYXJhbSBmb250U3R5bGVcbiAgICAgKiBAcGFyYW0gZm9udEFsaWduXG4gICAgICogQHBhcmFtIGZvbnRCYXNlbGluZVxuICAgICAqIEBwYXJhbSBtYXJrXG4gICAgICogQHBhcmFtIG9yZGVyVHlwZVxuICAgICAqIEBwYXJhbSBsaXN0T2JqZWN0c0Nvb3Jkc1xuICAgICAqIEBwYXJhbSBsaXN0T2JqZWN0c0Nvbm5lY3Rpb25zXG4gICAgICogQHBhcmFtIHN0cm9rZVJlY3RPYmplY3RcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjYW52YXNFbGVtZW50SWQsIGNhbnZhc1dpZHRoID0gJycsIGltYWdlU3JjID0gJycsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoID0gJzInLCBsaW5lQ29sb3IgPSAnIzAwMDAwMCcsIGxpbmVIZWFkID0gZmFsc2UsIGZvbnRGYW1pbHkgPSAnQXJpYWwnLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplID0gJzIwJywgZm9udENvbG9yID0gJyMwMDAwMDAnLCBmb250U3R5bGUgPSAncmVndWxhcicsIGZvbnRBbGlnbiA9ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIGZvbnRCYXNlbGluZSA9ICdtaWRkbGUnLCBtYXJrID0gJ1gnLCBvcmRlclR5cGUgPSBPUkRFUl9UWVBFX05VTSxcbiAgICAgICAgICAgICAgICAvLyBCZWxvdyBhcmUgc3BlY2lmaWMgY2xhc3MgcGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgIGxpc3RPYmplY3RzQ29vcmRzID0gW10sIGxpc3RPYmplY3RzQ29ubmVjdGlvbnMgPSBbXSwgc3Ryb2tlUmVjdE9iamVjdCA9IHRydWUsKSB7XG5cbiAgICAgICAgc3VwZXIoY2FudmFzRWxlbWVudElkLCBjYW52YXNXaWR0aCwgaW1hZ2VTcmMsIGxpbmVXaWR0aCwgbGluZUNvbG9yLCBsaW5lSGVhZCwgZm9udEZhbWlseSxcbiAgICAgICAgICAgIGZvbnRTaXplLCBmb250Q29sb3IsIGZvbnRTdHlsZSwgZm9udEFsaWduLCBmb250QmFzZWxpbmUsIG1hcmssIG9yZGVyVHlwZSk7XG5cbiAgICAgICAgLy8gb3duIHByb3BlcnRpZXMgb2YgdGhlIGNsYXNzXG4gICAgICAgIHRoaXMuX2xpc3RPYmplY3RzQ29vcmRzID0gbGlzdE9iamVjdHNDb29yZHM7ICAgIC8vIGFycmF5IG9mIG9iamVjdHMgY29vcmRpbmF0ZXMgaW4gdGhlIGltYWdlXG4gICAgICAgIHRoaXMuX2xpc3RPYmplY3RzQ29ubmVjdGlvbnMgPSBsaXN0T2JqZWN0c0Nvbm5lY3Rpb25zOyAgICAvLyBhcnJheSBvZiBvYmplY3RzIGNvbm5lY3Rpb25zIGluIHRoZSBpbWFnZVxuICAgICAgICB0aGlzLl9saXN0T2JqZWN0c0Fzc29jaWF0ZWQgPSBbXTsgICAgICAgICAgICAgICAvLyBhcnJheSB0byBzdG9yZSB0aGUgYXJyYXkgb2Ygb2JqZWN0cyBjb29yZGluYXRlcyBhc3NvY2lhdGVkIGJ5IHVzZXJcbiAgICAgICAgdGhpcy5fc3Ryb2tlUmVjdE9iamVjdCA9IHN0cm9rZVJlY3RPYmplY3Q7ICAgICAgLy8gZGVmaW5lIGlmIG9iamVjdCB3aWxsIGJlIHB1dCBpbnRvIGEgcmVjdGFuZ2xlXG4gICAgICAgIHRoaXMuX2JlZ2luQ2xpY2tDb29yZCA9IFtdOyAgICAgICAgICAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgMXN0IGNsaWNrIGV2ZW50IGluIGZvcm1hdCBbeCx5XVxuICAgICAgICB0aGlzLl9udW1iZXJBc3NvY2lhdGlvbnNDb25uZWN0ZWQgPSAwO1xuXG4gICAgICAgIC8vIGJpbmRpbmcgY2xpY2sgZXZlbnQgdG8gY2FudmFzIGVsZW1lbnQgdG8gYWxsb3cgdGhlIGFzc29jaWF0ZSBvYmplY3QgZXhlcmNpc2UgZXhlY3V0aW9uXG4gICAgICAgIHRoaXMuX2NhbnZhc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xpY2tBY3Rpb24uYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW4gYXNzb2NpYXRlIGFjdGlvbiB1c2luZyBhIGxpbmUgYmV0d2VlbiBvYmplY3RzIGJhc2VkIG9uIHR3byBjbGljayBldmVudCBvdmVyIGNhbnZhcyBlbGVtZW50LlxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXNlcyB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIG9iamVjdHMgaW5zaWRlIGNhbnZhcyBlbGVtZW50IGFuZCB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIGNsaWNrIGV2ZW50LlxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGNsaWNrQWN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgLy8gT2J0YWluIG1vdXNlIGNsaWNrIHBvc2l0aW9uXG4gICAgICAgIGxldCBjdXJyZW50X3ggPSBldmVudC5wYWdlWCAtIGV2ZW50LmN1cnJlbnRUYXJnZXQub2Zmc2V0TGVmdCxcbiAgICAgICAgICAgIGN1cnJlbnRfeSA9IGV2ZW50LnBhZ2VZIC0gZXZlbnQuY3VycmVudFRhcmdldC5vZmZzZXRUb3A7XG4gICAgICAgIC8vIGFsZXJ0KGBjdXJzb3JYOiAke2N1cl94fSwgY3Vyc29yWTogJHtjdXJfeX1gKTtcblxuICAgICAgICBpZiAodGhpcy5fY2FudmFzRWxlbWVudC5nZXRDb250ZXh0KSB7XG4gICAgICAgICAgICAvLyBnZXR0aW5nIDJkIGNvbnRleHQgZnJvbSBjYW52YXMgZWxlbWVudFxuICAgICAgICAgICAgbGV0IGN0eCA9IHRoaXMuX2NhbnZhc0VsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgICAgICAvLyBhc2tpbmcgaWYgdGhlcmUgaXMgQXNzb2NpYXRpb25zIHRvIGJlIHBlcmZvcm1cbiAgICAgICAgICAgIGlmICh0aGlzLl9udW1iZXJBc3NvY2lhdGlvbnNDb25uZWN0ZWQgPCB0aGlzLl9nZXROdW1iZXJPZkNvbm5lY3Rpb25zKCkpIHtcblxuICAgICAgICAgICAgICAgIC8vIGFza2luZyBpZiBpdCdzIHRoZSAxc3QgY2xpY2sgZXZlbnRcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYmVnaW5DbGlja0Nvb3JkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTdG9yaW5nIHRoZSAxc3QgY2xpY2sgZXZlbnQgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmVnaW5DbGlja0Nvb3JkID0gW2N1cnJlbnRfeCwgY3VycmVudF95XTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGdldHRpbmcgY29vcmRpbmF0ZXMgb2YgcmVhbCBvYmplY3RzLCBiZWdpbiAmIGVuZCBvYmplY3RzXG4gICAgICAgICAgICAgICAgICAgIGxldCBiZWdpbk9iamVjdCA9IHRoaXMuX2ZpbmRPYmplY3RUaHJvdWdoQ29vcmRzKHRoaXMuX2JlZ2luQ2xpY2tDb29yZCksXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRPYmplY3QgPSB0aGlzLl9maW5kT2JqZWN0VGhyb3VnaENvb3JkcyhbY3VycmVudF94LCBjdXJyZW50X3ldKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24gPSB0aGlzLl9maW5kQ29ubmVjdGlvbihiZWdpbk9iamVjdCwgZW5kT2JqZWN0KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoISFiZWdpbk9iamVjdCAmJiAhIWVuZE9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9saXN0T2JqZWN0c0Fzc29jaWF0ZWQucHVzaChbYmVnaW5PYmplY3QsIGVuZE9iamVjdF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb25uZWN0aW9uID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdE9iamVjdHNBc3NvY2lhdGVkLnB1c2goW2VuZE9iamVjdCwgYmVnaW5PYmplY3RdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSB0aGlzLl9saW5lV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHRoaXMuX2xpbmVDb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICBjdHgubW92ZVRvKHRoaXMuX2JlZ2luQ2xpY2tDb29yZFswXSwgdGhpcy5fYmVnaW5DbGlja0Nvb3JkWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVUbyhjdXJyZW50X3gsIGN1cnJlbnRfeSk7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9udW1iZXJBc3NvY2lhdGlvbnNDb25uZWN0ZWQrKztcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXNldHRpbmcgYmVnaW4gY2xpY2sgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmVnaW5DbGlja0Nvb3JkID0gW107XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGlzdE9iamVjdHNBc3NvY2lhdGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZmluZENvbm5lY3Rpb24oYmVnaW5PYmplY3QsIGVuZE9iamVjdCkge1xuICAgICAgICBpZiAodGhpcy5fZmluZEVuZENvb3Jkc0luQ29ubmVjdGlvbnMoZW5kT2JqZWN0LCB0aGlzLl9maW5kQmVnaW5Db29yZHNJbkNvbm5lY3Rpb25zKGJlZ2luT2JqZWN0KSkpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2ZpbmRFbmRDb29yZHNJbkNvbm5lY3Rpb25zKGJlZ2luT2JqZWN0LCB0aGlzLl9maW5kQmVnaW5Db29yZHNJbkNvbm5lY3Rpb25zKGVuZE9iamVjdCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9maW5kQmVnaW5Db29yZHNJbkNvbm5lY3Rpb25zKGJlZ2luT2JqZWN0KSB7XG4gICAgICAgIC8vIGxvb3BpbmcgdGhlIGxpc3Qgb2Ygb2JqZWN0cyBjb29yZGluYXRlc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2xpc3RPYmplY3RzQ29vcmRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZTEgPSBKU09OLnN0cmluZ2lmeSh0aGlzLl9saXN0T2JqZWN0c0Nvb3Jkc1tpXSksXG4gICAgICAgICAgICAgICAgdmFsdWUyID0gSlNPTi5zdHJpbmdpZnkoYmVnaW5PYmplY3QpO1xuXG4gICAgICAgICAgICAvLyBsb29raW5nIGZvciB0aGUgaW5kZXggb2YgdGhlIGJlZ2luIG9iamVjdFxuICAgICAgICAgICAgaWYgKHZhbHVlMSA9PT0gdmFsdWUyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZmluZEVuZENvb3Jkc0luQ29ubmVjdGlvbnMoZW5kT2JqZWN0LCBpbmRleCkge1xuICAgICAgICAvLyBsb29waW5nIHRoZSBsaXN0IG9mIG9iamVjdHMgY29ubmVjdGlvbnMgY29vcmRpbmF0ZXNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9saXN0T2JqZWN0c0Nvbm5lY3Rpb25zW2luZGV4XS5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBsZXQgdmFsdWUxID0gSlNPTi5zdHJpbmdpZnkodGhpcy5fbGlzdE9iamVjdHNDb25uZWN0aW9uc1tpbmRleF1baV0pLFxuICAgICAgICAgICAgICAgIHZhbHVlMiA9IEpTT04uc3RyaW5naWZ5KGVuZE9iamVjdCk7XG5cbiAgICAgICAgICAgIC8vIGxvb2tpbmcgZm9yIHRoZSBpbmRleCBvZiB0aGUgYmVnaW4gb2JqZWN0XG4gICAgICAgICAgICBpZiAodmFsdWUxID09PSB2YWx1ZTIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBfZmluZE9iamVjdFRocm91Z2hDb29yZHMoY29vcmRzKSB7XG5cbiAgICAgICAgLy8gZGVjbGFyaW5nIHZhcmlhYmxlc1xuICAgICAgICBsZXQgeCwgeSwgeDEsIHkxO1xuXG4gICAgICAgIC8vIGxvb3BpbmcgdGhlIGxpc3Qgb2Ygb2JqZWN0cyBjb29yZGluYXRlc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2xpc3RPYmplY3RzQ29vcmRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIC8vIENvb3JkaW5hdGVzIG9mIHRoZSBpbWFnZXNcbiAgICAgICAgICAgIC8vIFRoZSBjYW52YXMgZGl2aXNvciBhbGxvdyB0byBjYWxjIHRoZSBleGFjdCBwb3NpdGlvbiBvZiBldmVyeSBjb29yZGluYXRlLFxuICAgICAgICAgICAgLy8gZXZlbiBpZiB0aGUgY2FudmFzIGVsZW1lbnQgaXMgcG9zaXRpb25lZCBhbnl3aGVyZSBpbnNpZGUgdGhlIHdlYiBwYWdlXG4gICAgICAgICAgICB4ID0gTWF0aC5yb3VuZCh0aGlzLl9saXN0T2JqZWN0c0Nvb3Jkc1tpXVswXSAvIHRoaXMuX2NhbnZhc0Rpdmlzb3IpO1xuICAgICAgICAgICAgeSA9IE1hdGgucm91bmQodGhpcy5fbGlzdE9iamVjdHNDb29yZHNbaV1bMV0gLyB0aGlzLl9jYW52YXNEaXZpc29yKTtcbiAgICAgICAgICAgIHgxID0gTWF0aC5yb3VuZCh0aGlzLl9saXN0T2JqZWN0c0Nvb3Jkc1tpXVsyXSAvIHRoaXMuX2NhbnZhc0Rpdmlzb3IpO1xuICAgICAgICAgICAgeTEgPSBNYXRoLnJvdW5kKHRoaXMuX2xpc3RPYmplY3RzQ29vcmRzW2ldWzNdIC8gdGhpcy5fY2FudmFzRGl2aXNvcik7XG5cbiAgICAgICAgICAgIC8vIGFza2luZyBpZiBhIHZhbGlkIG9iamVjdCB3YXMgY2xpY2tlZCwgYmFzZWQgb24gY29vcmRpbmF0ZXMgb2Ygb2JqZWN0cyBhbmQgY2xpY2sgZXZlbnRcbiAgICAgICAgICAgIGlmICgoeCA8PSBjb29yZHNbMF0gJiYgY29vcmRzWzBdIDw9IHgxKVxuICAgICAgICAgICAgICAgICYmICh5IDw9IGNvb3Jkc1sxXSAmJiBjb29yZHNbMV0gPD0geTEpKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdE9iamVjdHNDb29yZHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgX2dldE51bWJlck9mQ29ubmVjdGlvbnMoKSB7XG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9saXN0T2JqZWN0c0Nvbm5lY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb3VudGVyICs9IHRoaXMuX2xpc3RPYmplY3RzQ29ubmVjdGlvbnNbaV0ubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3VudGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbmQgcHJpbnQgaW4gSlMgY29uc29sZSB0aGUgYXJyYXkgb2YgdGhlIGxpc3Qgb2YgYXNzb2NpYXRlZCBvYmplY3RzXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGdldExpc3RPYmplY3RzQXNzb2NpYXRlZCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5fbGlzdE9iamVjdHNBc3NvY2lhdGVkKSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0T2JqZWN0c0Fzc29jaWF0ZWQ7XG4gICAgfVxufVxuXG5Bc3NvY2lhdGVDYW52YXNFeGVyY2lzZS5leHBvcnRzID0gQXNzb2NpYXRlQ2FudmFzRXhlcmNpc2U7XG5cbiIsIi8qKlxuICogUHJvamVjdDogSUNFLmpzLlxuICogQXV0aG9yOiBZdWxpbyBBbGVtYW4gSmltZW5leiBbQHl1bGlvYWoyOTBdXG4gKiBEYXRlOiA4LzI4LzE4XG4gKiBDcmVhdGVkIGJ5IFdlYlN0b3JtXG4gKi9cblxuLyoqXG4gKiBHYXBNYXRjaENhbnZhc0V4ZXJjaXNlIGV4dGVuZHMgZnJvbSBDYW52YXNFeGVyY2lzZSBzdXBlcmNsYXNzLlxuICogRGVmaW5lIHRoZSBnYXAgbWF0Y2hpbmcgZXhlcmNpc2VzXG4gKi9cbmNsYXNzIEdhcE1hdGNoQ2FudmFzRXhlcmNpc2UgZXh0ZW5kcyBDYW52YXNFeGVyY2lzZSB7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvciBvZiB0aGUgR2FwTWF0Y2hDYW52YXNFeGVyY2lzZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0gY2FudmFzRWxlbWVudElkXG4gICAgICogQHBhcmFtIGNhbnZhc1dpZHRoXG4gICAgICogQHBhcmFtIGltYWdlU3JjXG4gICAgICogQHBhcmFtIGxpbmVXaWR0aFxuICAgICAqIEBwYXJhbSBsaW5lQ29sb3JcbiAgICAgKiBAcGFyYW0gbGluZUhlYWRcbiAgICAgKiBAcGFyYW0gZm9udEZhbWlseVxuICAgICAqIEBwYXJhbSBmb250U2l6ZVxuICAgICAqIEBwYXJhbSBmb250Q29sb3JcbiAgICAgKiBAcGFyYW0gZm9udFN0eWxlXG4gICAgICogQHBhcmFtIGZvbnRBbGlnblxuICAgICAqIEBwYXJhbSBmb250QmFzZWxpbmVcbiAgICAgKiBAcGFyYW0gbWFya1xuICAgICAqIEBwYXJhbSBvcmRlclR5cGVcbiAgICAgKiBAcGFyYW0gbGlzdE9iamVjdHNDb29yZHNcbiAgICAgKiBAcGFyYW0gbGlzdE9iamVjdHNUYWdzXG4gICAgICogQHBhcmFtIHN0cm9rZVJlY3RPYmplY3RcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjYW52YXNFbGVtZW50SWQsIGNhbnZhc1dpZHRoID0gJycsIGltYWdlU3JjID0gJycsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoID0gJzInLCBsaW5lQ29sb3IgPSAnIzAwMDAwMCcsIGxpbmVIZWFkID0gZmFsc2UsIGZvbnRGYW1pbHkgPSAnQXJpYWwnLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplID0gJzIwJywgZm9udENvbG9yID0gJyMwMDAwMDAnLCBmb250U3R5bGUgPSAncmVndWxhcicsIGZvbnRBbGlnbiA9ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIGZvbnRCYXNlbGluZSA9ICdtaWRkbGUnLCBtYXJrID0gJ1gnLCBvcmRlclR5cGUgPSBPUkRFUl9UWVBFX05VTSxcbiAgICAgICAgICAgICAgICAvLyBCZWxvdyBhcmUgc3BlY2lmaWMgY2xhc3MgcGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgIGxpc3RPYmplY3RzQ29vcmRzID0gW10sIGxpc3RPYmplY3RzVGFncyA9IFtdLCBzdHJva2VSZWN0T2JqZWN0ID0gdHJ1ZSwpIHtcblxuICAgICAgICBzdXBlcihjYW52YXNFbGVtZW50SWQsIGNhbnZhc1dpZHRoLCBpbWFnZVNyYywgbGluZVdpZHRoLCBsaW5lQ29sb3IsIGxpbmVIZWFkLCBmb250RmFtaWx5LFxuICAgICAgICAgICAgZm9udFNpemUsIGZvbnRDb2xvciwgZm9udFN0eWxlLCBmb250QWxpZ24sIGZvbnRCYXNlbGluZSwgbWFyaywgb3JkZXJUeXBlKTtcblxuICAgICAgICAvLyBvd24gcHJvcGVydGllcyBvZiB0aGUgY2xhc3NcbiAgICAgICAgdGhpcy5fbGlzdE9iamVjdHNDb29yZHMgPSBsaXN0T2JqZWN0c0Nvb3JkczsgICAgLy8gYXJyYXkgb2Ygb2JqZWN0cyBjb29yZGluYXRlcyBpbiB0aGUgaW1hZ2VcbiAgICAgICAgdGhpcy5fbGlzdE9iamVjdHNUYWdzID0gbGlzdE9iamVjdHNUYWdzOyAgICAgICAgLy8gYXJyYXkgb2Ygb2JqZWN0cyB0YWdzIGluIHRoZSBpbWFnZVxuICAgICAgICB0aGlzLl9saXN0T2JqZWN0c1RhZ2dlZCA9IFtdOyAgICAgICAgICAgICAgICAgICAvLyBhcnJheSB0byBzdG9yZSB0aGUgYXJyYXkgb2Ygb2JqZWN0cyBjb29yZGluYXRlcyB0YWdnZWQgYnkgdXNlclxuICAgICAgICB0aGlzLl9zdHJva2VSZWN0T2JqZWN0ID0gc3Ryb2tlUmVjdE9iamVjdDsgICAgICAvLyBkZWZpbmUgaWYgb2JqZWN0IHdpbGwgYmUgcHV0IGludG8gYSByZWN0YW5nbGVcblxuICAgICAgICAvLyBiaW5kaW5nIGNsaWNrIGV2ZW50IHRvIGNhbnZhcyBlbGVtZW50IHRvIGFsbG93IHRoZSBnYXAgbWF0Y2ggZXhlcmNpc2UgZXhlY3V0aW9uXG4gICAgICAgIHRoaXMuX2NhbnZhc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xpY2tBY3Rpb24uYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFzc2lnbiBhIFRhZyBvZiBvYmplY3Qgc2VsZWN0ZWQgYnkgY2xpY2sgZXZlbnQgb3ZlciBjYW52YXMgZWxlbWVudC5cbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVzZXMgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBvYmplY3RzIGluc2lkZSBjYW52YXMgZWxlbWVudCBhbmQgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBjbGljayBldmVudC5cbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBjbGlja0FjdGlvbihldmVudCkge1xuICAgICAgICAvLyBPYnRhaW4gbW91c2UgY2xpY2sgcG9zaXRpb25cbiAgICAgICAgbGV0IGN1cnJlbnRfeCA9IGV2ZW50LnBhZ2VYIC0gZXZlbnQuY3VycmVudFRhcmdldC5vZmZzZXRMZWZ0LFxuICAgICAgICAgICAgY3VycmVudF95ID0gZXZlbnQucGFnZVkgLSBldmVudC5jdXJyZW50VGFyZ2V0Lm9mZnNldFRvcDtcbiAgICAgICAgLy8gYWxlcnQoYGN1cnNvclg6ICR7Y3VyX3h9LCBjdXJzb3JZOiAke2N1cl95fWApO1xuXG4gICAgICAgIGlmICh0aGlzLl9jYW52YXNFbGVtZW50LmdldENvbnRleHQpIHtcbiAgICAgICAgICAgIC8vIGdldHRpbmcgMmQgY29udGV4dCBmcm9tIGNhbnZhcyBlbGVtZW50XG4gICAgICAgICAgICBsZXQgY3R4ID0gdGhpcy5fY2FudmFzRWxlbWVudC5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgICAgICAgIC8vIGFza2luZyBpZiBvYmplY3QgY2xpY2tlZCB3YXMgbWF0Y2hlZCBiZWZvcmVcbiAgICAgICAgICAgIGlmICghdGhpcy5faXNUYWdnZWRFeGVyY2lzZSh0aGlzLl9saXN0T2JqZWN0c1RhZ2dlZCwgW2N1cnJlbnRfeCwgY3VycmVudF95XSwgdGhpcy5fY2FudmFzRGl2aXNvciwgdGhpcy5fbGlzdE9iamVjdHNUYWdzLmxlbmd0aCkpIHtcblxuICAgICAgICAgICAgICAgIC8vIGRlY2xhcmluZyB2YXJpYWJsZXNcbiAgICAgICAgICAgICAgICBsZXQgeCwgeSwgeDEsIHkxLCBjZW50X3gsIGNlbnRfeSwgb3A7XG5cbiAgICAgICAgICAgICAgICAvLyBsb29waW5nIHRoZSBsaXN0IG9mIG9iamVjdHMgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2xpc3RPYmplY3RzQ29vcmRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ29vcmRpbmF0ZXMgb2YgdGhlIGltYWdlc1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgY2FudmFzIGRpdmlzb3IgYWxsb3cgdG8gY2FsYyB0aGUgZXhhY3QgcG9zaXRpb24gb2YgZXZlcnkgY29vcmRpbmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gZXZlbiBpZiB0aGUgY2FudmFzIGVsZW1lbnQgaXMgcG9zaXRpb25lZCBhbnl3aGVyZSBpbnNpZGUgdGhlIHdlYiBwYWdlXG4gICAgICAgICAgICAgICAgICAgIHggPSBNYXRoLnJvdW5kKHRoaXMuX2xpc3RPYmplY3RzQ29vcmRzW2ldWzBdIC8gdGhpcy5fY2FudmFzRGl2aXNvcik7XG4gICAgICAgICAgICAgICAgICAgIHkgPSBNYXRoLnJvdW5kKHRoaXMuX2xpc3RPYmplY3RzQ29vcmRzW2ldWzFdIC8gdGhpcy5fY2FudmFzRGl2aXNvcik7XG4gICAgICAgICAgICAgICAgICAgIHgxID0gTWF0aC5yb3VuZCh0aGlzLl9saXN0T2JqZWN0c0Nvb3Jkc1tpXVsyXSAvIHRoaXMuX2NhbnZhc0Rpdmlzb3IpO1xuICAgICAgICAgICAgICAgICAgICB5MSA9IE1hdGgucm91bmQodGhpcy5fbGlzdE9iamVjdHNDb29yZHNbaV1bM10gLyB0aGlzLl9jYW52YXNEaXZpc29yKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpbml0IHRleHQgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgICAgICBjdHguZm9udCA9IGAke3RoaXMuX2ZvbnRTdHlsZX0gJHt0aGlzLl9mb250U2l6ZX0gICR7dGhpcy5fZm9udEZhbWlseX1gO1xuICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5fZm9udENvbG9yO1xuICAgICAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gdGhpcy5fZm9udEFsaWduO1xuICAgICAgICAgICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gdGhpcy5fZm9udEJhc2VsaW5lO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvb3AgY29udHJvbCB2YXJpYWJsZVxuICAgICAgICAgICAgICAgICAgICBvcCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFza2luZyBpZiBhIHZhbGlkIG9iamVjdCB3YXMgY2xpY2tlZCwgYmFzZWQgb24gY29vcmRpbmF0ZXMgb2Ygb2JqZWN0cyBhbmQgY2xpY2sgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh4IDw9IGN1cnJlbnRfeCAmJiBjdXJyZW50X3ggPD0geDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAoeSA8PSBjdXJyZW50X3kgJiYgY3VycmVudF95IDw9IHkxKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgKHRoaXMuX2xpc3RPYmplY3RzVGFncy5sZW5ndGggPiAwKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb29yZGluYXRlcyBvZiB0aGUgb2JqZWN0IGNlbnRlclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VudF94ID0gTWF0aC5yb3VuZCh4MSAtICgoeDEgLSB4KSAvIDIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRfeSA9IE1hdGgucm91bmQoeTEgLSAoKHkxIC0geSkgLyAyKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdyaXRlIHRhZyBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLl9saXN0T2JqZWN0c1RhZ3NbMF0sIGNlbnRfeCwgY2VudF95KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmlsbCByZWN0YW5nbGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdHJva2VSZWN0T2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHRoaXMuX2xpbmVXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSB0aGlzLl9saW5lQ29sb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoeCwgeSwgeDEgLSB4LCB5MSAtIHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGFnZ2VkIGV4ZXJjaXNlc1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdE9iamVjdHNUYWdnZWRbdGhpcy5fbGlzdE9iamVjdHNUYWdnZWQubGVuZ3RoXSA9IFt0aGlzLl9saXN0T2JqZWN0c1RhZ3Muc2hpZnQoKSwgdGhpcy5fbGlzdE9iamVjdHNDb29yZHNbaV1dO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBvcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAob3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFuIGFycmF5IG9mIG9iamVjdHMgY29vcmRpbmF0ZXMgaW4gdGhlIGltYWdlXG4gICAgICogQHJldHVybnMge0FycmF5fCp9XG4gICAgICovXG4gICAgZ2V0TGlzdE9iamVjdHNDb29yZHMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuX2xpc3RPYmplY3RzQ29vcmRzKSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0T2JqZWN0c0Nvb3JkcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYW4gYXJyYXkgb2Ygb2JqZWN0cyB0YWdzIGluIHRoZSBpbWFnZVxuICAgICAqIEByZXR1cm5zIHtBcnJheXwqfVxuICAgICAqL1xuICAgIGdldExpc3RPYmplY3RzVGFncygpIHtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5fbGlzdE9iamVjdHNUYWdzKSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0T2JqZWN0c1RhZ3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFuIGFycmF5IG9mIGFycmF5cy4gRWFjaCBvbmUgY29udGFpbnMgdGhlIG9iamVjdCBjb29yZGluYXRlIGFuZCB0aGUgdGFnIGFzc2lnbmVkXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGdldExpc3RPYmplY3RzVGFnZ2VkKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLl9saXN0T2JqZWN0c1RhZ2dlZCkpO1xuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdE9iamVjdHNUYWdnZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIGlmIHRoZSBlbGVtZW50IHNlbGVjdGVkIGJ5IGNsaWNrIGNvb3JkaW5hdGVzIGhhdmUgYmVlbiBtYXRjaGVkIGJlZm9yZS5cbiAgICAgKiBAcGFyYW0gb2JqZWN0c1RhZ2dlZFxuICAgICAqIEBwYXJhbSBjdXJyZW50X3h5XG4gICAgICogQHBhcmFtIGRpdmlzb3JcbiAgICAgKiBAcGFyYW0gY2FudFRhZ2dlZFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2lzVGFnZ2VkRXhlcmNpc2Uob2JqZWN0c1RhZ2dlZCwgY3VycmVudF94eSwgZGl2aXNvciwgY2FudFRhZ2dlZCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdHNUYWdnZWQubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgLy8gQ29vcmRpbmF0ZXMgb2YgdGhlIGltYWdlc1xuICAgICAgICAgICAgbGV0IHggPSBNYXRoLnJvdW5kKG9iamVjdHNUYWdnZWRbaV1bMF0gLyBkaXZpc29yKSxcbiAgICAgICAgICAgICAgICB5ID0gTWF0aC5yb3VuZChvYmplY3RzVGFnZ2VkW2ldWzFdIC8gZGl2aXNvciksXG4gICAgICAgICAgICAgICAgeDEgPSBNYXRoLnJvdW5kKG9iamVjdHNUYWdnZWRbaV1bMl0gLyBkaXZpc29yKSxcbiAgICAgICAgICAgICAgICB5MSA9IE1hdGgucm91bmQob2JqZWN0c1RhZ2dlZFtpXVszXSAvIGRpdmlzb3IpO1xuXG4gICAgICAgICAgICBpZiAoKHggPD0gY3VycmVudF94eVswXSAmJiBjdXJyZW50X3h5WzBdIDw9IHgxKSAmJiAoeSA8PSBjdXJyZW50X3h5WzFdICYmIGN1cnJlbnRfeHlbMV0gPD0geTEpICYmIChjYW50VGFnZ2VkID4gMCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5HYXBNYXRjaENhbnZhc0V4ZXJjaXNlLmV4cG9ydHMgPSBHYXBNYXRjaENhbnZhc0V4ZXJjaXNlO1xuXG4iLCIvKipcbiAqIFByb2plY3Q6IElDRS5qcy5cbiAqIEF1dGhvcjogWXVsaW8gQWxlbWFuIEppbWVuZXogW0B5dWxpb2FqMjkwXVxuICogRGF0ZTogOC8yOC8xOFxuICogQ3JlYXRlZCBieSBXZWJTdG9ybVxuICovXG5cbi8qKlxuICogT3JkZXJDYW52YXNFeGVyY2lzZSBleHRlbmRzIGZyb20gQ2FudmFzRXhlcmNpc2Ugc3VwZXJjbGFzcy5cbiAqIERlZmluZSB0aGUgb3JkZXJpbmcgb2JqZWN0IGV4ZXJjaXNlc1xuICovXG5jbGFzcyBPcmRlckNhbnZhc0V4ZXJjaXNlIGV4dGVuZHMgQ2FudmFzRXhlcmNpc2Uge1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3Igb2YgdGhlIE9yZGVyQ2FudmFzRXhlcmNpc2UgY2xhc3MuXG4gICAgICogQHBhcmFtIGNhbnZhc0VsZW1lbnRJZFxuICAgICAqIEBwYXJhbSBjYW52YXNXaWR0aFxuICAgICAqIEBwYXJhbSBpbWFnZVNyY1xuICAgICAqIEBwYXJhbSBsaW5lV2lkdGhcbiAgICAgKiBAcGFyYW0gbGluZUNvbG9yXG4gICAgICogQHBhcmFtIGxpbmVIZWFkXG4gICAgICogQHBhcmFtIGZvbnRGYW1pbHlcbiAgICAgKiBAcGFyYW0gZm9udFNpemVcbiAgICAgKiBAcGFyYW0gZm9udENvbG9yXG4gICAgICogQHBhcmFtIGZvbnRTdHlsZVxuICAgICAqIEBwYXJhbSBmb250QWxpZ25cbiAgICAgKiBAcGFyYW0gZm9udEJhc2VsaW5lXG4gICAgICogQHBhcmFtIG1hcmtcbiAgICAgKiBAcGFyYW0gb3JkZXJUeXBlXG4gICAgICogQHBhcmFtIGxpc3RPYmplY3RzQ29vcmRzXG4gICAgICogQHBhcmFtIHN0cm9rZVJlY3RPYmplY3RcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjYW52YXNFbGVtZW50SWQsIGNhbnZhc1dpZHRoID0gJycsIGltYWdlU3JjID0gJycsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoID0gJzInLCBsaW5lQ29sb3IgPSAnIzAwMDAwMCcsIGxpbmVIZWFkID0gZmFsc2UsIGZvbnRGYW1pbHkgPSAnQXJpYWwnLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplID0gJzIwJywgZm9udENvbG9yID0gJyMwMDAwMDAnLCBmb250U3R5bGUgPSAncmVndWxhcicsIGZvbnRBbGlnbiA9ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIGZvbnRCYXNlbGluZSA9ICdtaWRkbGUnLCBtYXJrID0gJ1gnLCBvcmRlclR5cGUgPSBPUkRFUl9UWVBFX05VTSxcbiAgICAgICAgICAgICAgICAvLyBCZWxvdyBhcmUgc3BlY2lmaWMgY2xhc3MgcGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgIGxpc3RPYmplY3RzQ29vcmRzID0gW10sIHN0cm9rZVJlY3RPYmplY3QgPSB0cnVlLCkge1xuXG4gICAgICAgIHN1cGVyKGNhbnZhc0VsZW1lbnRJZCwgY2FudmFzV2lkdGgsIGltYWdlU3JjLCBsaW5lV2lkdGgsIGxpbmVDb2xvciwgbGluZUhlYWQsIGZvbnRGYW1pbHksXG4gICAgICAgICAgICBmb250U2l6ZSwgZm9udENvbG9yLCBmb250U3R5bGUsIGZvbnRBbGlnbiwgZm9udEJhc2VsaW5lLCBtYXJrLCBvcmRlclR5cGUpO1xuXG4gICAgICAgIC8vIG93biBwcm9wZXJ0aWVzIG9mIHRoZSBjbGFzc1xuICAgICAgICB0aGlzLl9saXN0T2JqZWN0c0Nvb3JkcyA9IGxpc3RPYmplY3RzQ29vcmRzOyAgICAvLyBhcnJheSBvZiBvYmplY3RzIGNvb3JkaW5hdGVzIGluIHRoZSBpbWFnZVxuICAgICAgICB0aGlzLl9saXN0T2JqZWN0c09yZGVyZWQgPSBbXTsgICAgICAgICAgICAgICAgICAvLyBhcnJheSB0byBzdG9yZSB0aGUgYXJyYXkgb2Ygb2JqZWN0cyBjb29yZGluYXRlcyBhcnJhbmdlZCBieSB1c2VyXG4gICAgICAgIHRoaXMuX2xhc3RPcmRlck51bWJlciA9IDA7ICAgICAgICAgICAgICAgICAgICAgIC8vIGxhc3Qgb3JkZXIgYXNzaWduZWRcbiAgICAgICAgdGhpcy5fc3Ryb2tlUmVjdE9iamVjdCA9IHN0cm9rZVJlY3RPYmplY3Q7ICAgICAgLy8gZGVmaW5lIGlmIG9iamVjdCB3aWxsIGJlIHB1dCBpbnRvIGEgcmVjdGFuZ2xlXG5cbiAgICAgICAgLy8gYmluZGluZyBjbGljayBldmVudCB0byBjYW52YXMgZWxlbWVudCB0byBhbGxvdyB0aGUgb3JkZXIgZXhlcmNpc2UgZXhlY3V0aW9uXG4gICAgICAgIHRoaXMuX2NhbnZhc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xpY2tBY3Rpb24uYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFzc2lnbiBhbiBhbHBoYWJldGljL251bWVyaWNhbCBvcmRlciBjaGFyYWN0ZXIgdG8gdGhlIG9iamVjdCBzZWxlY3RlZCBieSBjbGljayBldmVudCBvdmVyIGNhbnZhcyBlbGVtZW50LlxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXNlcyB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIG9iamVjdHMgaW5zaWRlIGNhbnZhcyBlbGVtZW50IGFuZCB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIGNsaWNrIGV2ZW50LlxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGNsaWNrQWN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIE9idGFpbiBtb3VzZSBjbGljayBwb3NpdGlvblxuICAgICAgICBsZXQgY3VycmVudF94ID0gZXZlbnQucGFnZVggLSBldmVudC5jdXJyZW50VGFyZ2V0Lm9mZnNldExlZnQsXG4gICAgICAgICAgICBjdXJyZW50X3kgPSBldmVudC5wYWdlWSAtIGV2ZW50LmN1cnJlbnRUYXJnZXQub2Zmc2V0VG9wO1xuICAgICAgICAvLyBhbGVydChgY3Vyc29yWDogJHtjdXJfeH0sIGN1cnNvclk6ICR7Y3VyX3l9YCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2NhbnZhc0VsZW1lbnQuZ2V0Q29udGV4dCkge1xuICAgICAgICAgICAgLy8gZ2V0dGluZyAyZCBjb250ZXh0IGZyb20gY2FudmFzIGVsZW1lbnRcbiAgICAgICAgICAgIGxldCBjdHggPSB0aGlzLl9jYW52YXNFbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICAgICAgLy8gZ2V0dGluZyBudW1iZXIgb2Ygb2JqZWN0cyBieSBsaXN0IG9mIG9iamVjdCBjb29yZGluYXRlc1xuICAgICAgICAgICAgbGV0IG51bWJlck9iamVjdHMgPSB0aGlzLl9saXN0T2JqZWN0c0Nvb3Jkcy5sZW5ndGg7XG5cbiAgICAgICAgICAgIC8vIGFza2luZyBpZiBvYmplY3QgY2xpY2tlZCB3YXMgb3JkZXJlZCBiZWZvcmVcbiAgICAgICAgICAgIGlmICghdGhpcy5faXNPcmRlcmVkRXhlcmNpc2UodGhpcy5fbGlzdE9iamVjdHNPcmRlcmVkLCBbY3VycmVudF94LCBjdXJyZW50X3ldLCB0aGlzLl9jYW52YXNEaXZpc29yLCB0aGlzLl9sYXN0T3JkZXJOdW1iZXIsIG51bWJlck9iamVjdHMpKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBkZWNsYXJpbmcgdmFyaWFibGVzXG4gICAgICAgICAgICAgICAgbGV0IHgsIHksIHgxLCB5MSwgY2VudF94LCBjZW50X3ksIG9yZGVyLCB0bXAsIG9wO1xuXG4gICAgICAgICAgICAgICAgLy8gbG9vcGluZyB0aGUgbGlzdCBvZiBvYmplY3RzIGNvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9saXN0T2JqZWN0c0Nvb3Jkcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENvb3JkaW5hdGVzIG9mIHRoZSBpbWFnZXNcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGNhbnZhcyBkaXZpc29yIGFsbG93IHRvIGNhbGMgdGhlIGV4YWN0IHBvc2l0aW9uIG9mIGV2ZXJ5IGNvb3JkaW5hdGUsXG4gICAgICAgICAgICAgICAgICAgIC8vIGV2ZW4gaWYgdGhlIGNhbnZhcyBlbGVtZW50IGlzIHBvc2l0aW9uZWQgYW55d2hlcmUgaW5zaWRlIHRoZSB3ZWIgcGFnZVxuICAgICAgICAgICAgICAgICAgICB4ID0gTWF0aC5yb3VuZCh0aGlzLl9saXN0T2JqZWN0c0Nvb3Jkc1tpXVswXSAvIHRoaXMuX2NhbnZhc0Rpdmlzb3IpO1xuICAgICAgICAgICAgICAgICAgICB5ID0gTWF0aC5yb3VuZCh0aGlzLl9saXN0T2JqZWN0c0Nvb3Jkc1tpXVsxXSAvIHRoaXMuX2NhbnZhc0Rpdmlzb3IpO1xuICAgICAgICAgICAgICAgICAgICB4MSA9IE1hdGgucm91bmQodGhpcy5fbGlzdE9iamVjdHNDb29yZHNbaV1bMl0gLyB0aGlzLl9jYW52YXNEaXZpc29yKTtcbiAgICAgICAgICAgICAgICAgICAgeTEgPSBNYXRoLnJvdW5kKHRoaXMuX2xpc3RPYmplY3RzQ29vcmRzW2ldWzNdIC8gdGhpcy5fY2FudmFzRGl2aXNvcik7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaW5pdCB0ZXh0IHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZvbnQgPSBgJHt0aGlzLl9mb250U3R5bGV9ICR7dGhpcy5fZm9udFNpemV9ICAke3RoaXMuX2ZvbnRGYW1pbHl9YDtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuX2ZvbnRDb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9IHRoaXMuX2ZvbnRBbGlnbjtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9IHRoaXMuX2ZvbnRCYXNlbGluZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhbGVydCh4ICsgXCIgPD0gXCIgKyBjdXJfeCArIFwiIC0gXCIgKyBjdXJfeCArIFwiIDw9IFwiICsgeDEgKyBcIiAtLS0gXCIgKyB5ICsgXCIgPD0gXCIgKyBjdXJfeSArIFwiIC0gXCIgKyBjdXJfeSArIFwiIDw9IFwiICsgeTEpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvb3AgY29udHJvbCB2YXJpYWJsZVxuICAgICAgICAgICAgICAgICAgICBvcCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFza2luZyBpZiBhIHZhbGlkIG9iamVjdCB3YXMgY2xpY2tlZCwgYmFzZWQgb24gY29vcmRpbmF0ZXMgb2Ygb2JqZWN0cyBhbmQgY2xpY2sgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh4IDw9IGN1cnJlbnRfeCAmJiBjdXJyZW50X3ggPD0geDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAoeSA8PSBjdXJyZW50X3kgJiYgY3VycmVudF95IDw9IHkxKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgKHRoaXMuX2xhc3RPcmRlck51bWJlciA8IG51bWJlck9iamVjdHMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluY3JlbWVudCBvcmRlciBudW1iZXIgdG8gYXNzaWduXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXN0T3JkZXJOdW1iZXIrKztcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29vcmRpbmF0ZXMgb2YgdGhlIG9iamVjdCBjZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRfeCA9IE1hdGgucm91bmQoeDEgLSAoKHgxIC0geCkgLyAyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZW50X3kgPSBNYXRoLnJvdW5kKHkxIC0gKCh5MSAtIHkpIC8gMikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3cml0ZSBvcmRlciBudW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyID0gdGhpcy5fbGFzdE9yZGVyTnVtYmVyLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFza2luZyB3aGF0IGtpbmQgb2Ygb3JkZXIgaXMgYmVpbmcgdXNlZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX29yZGVyVHlwZSA9PT0gQ2FudmFzRXhlcmNpc2Uub3JkZXJUeXBlQWxwaGEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGFscGhhYmV0aWMgb3JkZXIgd2FzIHNlbGVjdGVkLCB0aGVuIGNhbGN1bGF0ZSB0aGUgbGV0dGVyIG9yZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gTWF0aC5mbG9vcih0aGlzLl9sYXN0T3JkZXJOdW1iZXIgLyAyNik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXIgPSAodG1wID49IDEgPyBTdHJpbmcuZnJvbUNoYXJDb2RlKDY0ICsgKHRoaXMuX2xhc3RPcmRlck51bWJlciAvIDI2KSkgOiAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDY0ICsgKHRoaXMuX2xhc3RPcmRlck51bWJlciAlIDI2KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZpbGwgbnVtYmVyIG9yIGxldHRlciBvZiB0aGUgb3JkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChvcmRlciwgY2VudF94LCBjZW50X3kpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmaWxsIHJlY3RhbmdsZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N0cm9rZVJlY3RPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gdGhpcy5fbGluZVdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHRoaXMuX2xpbmVDb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlUmVjdCh4LCB5LCB4MSAtIHgsIHkxIC0geSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBsaXN0IG9mIG9yZGVyZWQgb2JqZWN0c1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdE9iamVjdHNPcmRlcmVkW3RoaXMuX2xpc3RPYmplY3RzT3JkZXJlZC5sZW5ndGhdID0gdGhpcy5fbGlzdE9iamVjdHNDb29yZHNbaV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGlzdE9iamVjdHNPcmRlcmVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgdGhlIGVsZW1lbnQgc2VsZWN0ZWQgYnkgY2xpY2sgY29vcmRpbmF0ZXMgaGF2ZSBiZWVuIG9yZGVyZWQgYmVmb3JlLlxuICAgICAqIEBwYXJhbSBvYmplY3RzT3JkZXJlZFxuICAgICAqIEBwYXJhbSBjdXJyZW50X3h5XG4gICAgICogQHBhcmFtIGRpdmlzb3JcbiAgICAgKiBAcGFyYW0gbGFzdE9yZGVyTnVtYmVyXG4gICAgICogQHBhcmFtIG51bWJlck9iamVjdHNcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJuIHRydWUgaWYgdGhlIGVsZW1lbnQgc2VsZWN0ZWQgYnkgY2xpY2sgY29vcmRpbmF0ZXMgaGF2ZSBiZWVuIG9yZGVyZWQgYmVmb3JlLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2lzT3JkZXJlZEV4ZXJjaXNlKG9iamVjdHNPcmRlcmVkLCBjdXJyZW50X3h5LCBkaXZpc29yLCBsYXN0T3JkZXJOdW1iZXIsIG51bWJlck9iamVjdHMpIHtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdHNPcmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIC8vIENvb3JkaW5hdGVzIG9mIHRoZSBpbWFnZXNcbiAgICAgICAgICAgIGxldCB4ID0gTWF0aC5yb3VuZChvYmplY3RzT3JkZXJlZFtpXVswXSAvIGRpdmlzb3IpLFxuICAgICAgICAgICAgICAgIHkgPSBNYXRoLnJvdW5kKG9iamVjdHNPcmRlcmVkW2ldWzFdIC8gZGl2aXNvciksXG4gICAgICAgICAgICAgICAgeDEgPSBNYXRoLnJvdW5kKG9iamVjdHNPcmRlcmVkW2ldWzJdIC8gZGl2aXNvciksXG4gICAgICAgICAgICAgICAgeTEgPSBNYXRoLnJvdW5kKG9iamVjdHNPcmRlcmVkW2ldWzNdIC8gZGl2aXNvcik7XG5cbiAgICAgICAgICAgIGlmICgoeCA8PSBjdXJyZW50X3h5WzBdICYmIGN1cnJlbnRfeHlbMF0gPD0geDEpXG4gICAgICAgICAgICAgICAgJiYgKHkgPD0gY3VycmVudF94eVsxXSAmJiBjdXJyZW50X3h5WzFdIDw9IHkxKVxuICAgICAgICAgICAgICAgICYmIChsYXN0T3JkZXJOdW1iZXIgPCBudW1iZXJPYmplY3RzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbmQgcHJpbnQgaW4gSlMgY29uc29sZSB0aGUgYXJyYXkgb2YgdGhlIGxpc3Qgb2Ygb3JkZXJlZCBvYmplY3RzXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGdldExpc3RPYmplY3RzT3JkZXJlZCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5fbGlzdE9iamVjdHNPcmRlcmVkKSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0T2JqZWN0c09yZGVyZWQ7XG4gICAgfVxuXG59XG5cbk9yZGVyQ2FudmFzRXhlcmNpc2UuZXhwb3J0cyA9IE9yZGVyQ2FudmFzRXhlcmNpc2U7XG4iLCIvKipcbiAqIFByb2plY3Q6IHdpY2UuanMuXG4gKiBBdXRob3I6IFl1bGlvIEFsZW1hbiBKaW1lbmV6IFtAeXVsaW9hajI5MF1cbiAqIERhdGU6IDQvMDkvMThcbiAqIENyZWF0ZWQgYnkgV2ViU3Rvcm1cbiAqL1xuXG4gXG4vKipcbiAqIFBvc2l0aW9uT2JqZWN0Q2FudmFzRXhlcmNpc2UgZXh0ZW5kcyBmcm9tIENhbnZhc0V4ZXJjaXNlIHN1cGVyY2xhc3MuXG4gKiBEZWZpbmUgdGhlIHBvc2l0aW9uIG9iamVjdCBleGVyY2lzZXNcbiAqL1xuY2xhc3MgUG9zaXRpb25PYmplY3RDYW52YXNFeGVyY2lzZSBleHRlbmRzIENhbnZhc0V4ZXJjaXNlIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yIG9mIHRoZSBQb3NpdGlvbk9iamVjdENhbnZhc0V4ZXJjaXNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSBjYW52YXNFbGVtZW50SWRcbiAgICAgKiBAcGFyYW0gY2FudmFzV2lkdGhcbiAgICAgKiBAcGFyYW0gaW1hZ2VTcmNcbiAgICAgKiBAcGFyYW0gbGluZVdpZHRoXG4gICAgICogQHBhcmFtIGxpbmVDb2xvclxuICAgICAqIEBwYXJhbSBsaW5lSGVhZFxuICAgICAqIEBwYXJhbSBmb250RmFtaWx5XG4gICAgICogQHBhcmFtIGZvbnRTaXplXG4gICAgICogQHBhcmFtIGZvbnRDb2xvclxuICAgICAqIEBwYXJhbSBmb250U3R5bGVcbiAgICAgKiBAcGFyYW0gZm9udEFsaWduXG4gICAgICogQHBhcmFtIGZvbnRCYXNlbGluZVxuICAgICAqIEBwYXJhbSBtYXJrXG4gICAgICogQHBhcmFtIG9yZGVyVHlwZVxuICAgICAqIEBwYXJhbSBsaXN0T2JqZWN0c0Nvb3Jkc1xuICAgICAqIEBwYXJhbSBzdHJva2VSZWN0T2JqZWN0XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY2FudmFzRWxlbWVudElkLCBjYW52YXNXaWR0aCA9ICcnLCBpbWFnZVNyYyA9ICcnLFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aCA9ICcyJywgbGluZUNvbG9yID0gJyMwMDAwMDAnLCBsaW5lSGVhZCA9IGZhbHNlLCBmb250RmFtaWx5ID0gJ0FyaWFsJyxcbiAgICAgICAgICAgICAgICBmb250U2l6ZSA9ICcyMCcsIGZvbnRDb2xvciA9ICcjMDAwMDAwJywgZm9udFN0eWxlID0gJ3JlZ3VsYXInLCBmb250QWxpZ24gPSAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICBmb250QmFzZWxpbmUgPSAnbWlkZGxlJywgbWFyayA9ICdYJywgb3JkZXJUeXBlID0gT1JERVJfVFlQRV9OVU0sXG4gICAgICAgICAgICAgICAgLy8gQmVsb3cgYXJlIHNwZWNpZmljIGNsYXNzIHBhcmFtZXRlcnNcbiAgICAgICAgICAgICAgICBsaXN0T2JqZWN0c0Nvb3JkcyA9IFtdLCBzdHJva2VSZWN0T2JqZWN0ID0gdHJ1ZSwpIHtcblxuICAgICAgICBzdXBlcihjYW52YXNFbGVtZW50SWQsIGNhbnZhc1dpZHRoLCBpbWFnZVNyYywgbGluZVdpZHRoLCBsaW5lQ29sb3IsIGxpbmVIZWFkLCBmb250RmFtaWx5LFxuICAgICAgICAgICAgZm9udFNpemUsIGZvbnRDb2xvciwgZm9udFN0eWxlLCBmb250QWxpZ24sIGZvbnRCYXNlbGluZSwgbWFyaywgb3JkZXJUeXBlKTtcblxuICAgICAgICAvLyBvd24gcHJvcGVydGllcyBvZiB0aGUgY2xhc3NcbiAgICAgICAgdGhpcy5fbGlzdE9iamVjdHNDb29yZHMgPSBsaXN0T2JqZWN0c0Nvb3JkczsgICAgLy8gYXJyYXkgb2Ygb2JqZWN0cyBjb29yZGluYXRlcyBpbiB0aGUgaW1hZ2VcbiAgICAgICAgdGhpcy5fbGlzdE9iamVjdHNBc3NvY2lhdGVkID0gW107ICAgICAgICAgICAgICAgLy8gYXJyYXkgdG8gc3RvcmUgdGhlIGFycmF5IG9mIG9iamVjdHMgY29vcmRpbmF0ZXMgcG9zaXRpb25lZCBieSB1c2VyXG4gICAgICAgIHRoaXMuX3N0cm9rZVJlY3RPYmplY3QgPSBzdHJva2VSZWN0T2JqZWN0OyAgICAgIC8vIGRlZmluZSBpZiBvYmplY3Qgd2lsbCBiZSBwdXQgaW50byBhIHJlY3RhbmdsZVxuICAgICAgICB0aGlzLl9udW1iZXJBc3NvY2lhdGlvbnNDb25uZWN0ZWQgPSAwO1xuXG4gICAgICAgIC8vIGJpbmRpbmcgY2xpY2sgZXZlbnQgdG8gY2FudmFzIGVsZW1lbnQgdG8gYWxsb3cgdGhlIHBvc2l0aW9uIG9iamVjdCBleGVyY2lzZSBleGVjdXRpb25cbiAgICAgICAgdGhpcy5fY2FudmFzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGlja0FjdGlvbi5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXNzaWduIGEgcG9zaXRpb24gYmFzZWQgb24gY2xpY2sgZXZlbnQgb3ZlciBjYW52YXMgZWxlbWVudC5cbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVzZXMgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBvYmplY3RzIGluc2lkZSBjYW52YXMgZWxlbWVudCBhbmQgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBjbGljayBldmVudC5cbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBjbGlja0FjdGlvbihldmVudCkge1xuXG4gICAgICAgIC8vIE9idGFpbiBtb3VzZSBjbGljayBwb3NpdGlvblxuICAgICAgICBsZXQgY3VycmVudF94ID0gZXZlbnQucGFnZVggLSBldmVudC5jdXJyZW50VGFyZ2V0Lm9mZnNldExlZnQsXG4gICAgICAgICAgICBjdXJyZW50X3kgPSBldmVudC5wYWdlWSAtIGV2ZW50LmN1cnJlbnRUYXJnZXQub2Zmc2V0VG9wO1xuICAgICAgICAvLyBhbGVydChgY3Vyc29yWDogJHtjdXJfeH0sIGN1cnNvclk6ICR7Y3VyX3l9YCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2NhbnZhc0VsZW1lbnQuZ2V0Q29udGV4dCkge1xuICAgICAgICAgICAgLy8gZ2V0dGluZyAyZCBjb250ZXh0IGZyb20gY2FudmFzIGVsZW1lbnRcbiAgICAgICAgICAgIGxldCBjdHggPSB0aGlzLl9jYW52YXNFbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICAgICAgLy8gYXNraW5nIGlmIHRoZXJlIGlzIGVsZW1lbnRzIHRvIGJlIHBvc2l0aW9uZWRcbiAgICAgICAgICAgIGlmICh0aGlzLl9udW1iZXJBc3NvY2lhdGlvbnNDb25uZWN0ZWQgPCB0aGlzLl9saXN0T2JqZWN0c0Nvb3Jkcy5sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgIC8vIGRlY2xhcmluZyB2YXJpYWJsZXNcbiAgICAgICAgICAgICAgICBsZXQgeCwgeSwgeDEsIHkxLCBvcDtcblxuICAgICAgICAgICAgICAgIC8vIGluaXQgdGV4dCBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSBgJHt0aGlzLl9mb250U3R5bGV9ICR7dGhpcy5fZm9udFNpemV9ICAke3RoaXMuX2ZvbnRGYW1pbHl9YDtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5fZm9udENvbG9yO1xuICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSB0aGlzLl9mb250QWxpZ247XG4gICAgICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9IHRoaXMuX2ZvbnRCYXNlbGluZTtcblxuICAgICAgICAgICAgICAgIC8vIGZpbGwgbWFyayBvciBsZXR0ZXJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy5fbWFyaywgY3VycmVudF94LCBjdXJyZW50X3kpO1xuXG4gICAgICAgICAgICAgICAgLy8gZGVjcmVtZW50IG51bWJlciBvZiBvYmplY3RzIHRvIGJlIHBvc2l0aW9uZWRcbiAgICAgICAgICAgICAgICB0aGlzLl9udW1iZXJBc3NvY2lhdGlvbnNDb25uZWN0ZWQrKztcblxuICAgICAgICAgICAgICAgIC8vIGxvb3BpbmcgdGhlIGxpc3Qgb2Ygb2JqZWN0cyBjb29yZGluYXRlc1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbGlzdE9iamVjdHNDb29yZHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBDb29yZGluYXRlcyBvZiB0aGUgaW1hZ2VzXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBjYW52YXMgZGl2aXNvciBhbGxvdyB0byBjYWxjIHRoZSBleGFjdCBwb3NpdGlvbiBvZiBldmVyeSBjb29yZGluYXRlLFxuICAgICAgICAgICAgICAgICAgICAvLyBldmVuIGlmIHRoZSBjYW52YXMgZWxlbWVudCBpcyBwb3NpdGlvbmVkIGFueXdoZXJlIGluc2lkZSB0aGUgd2ViIHBhZ2VcbiAgICAgICAgICAgICAgICAgICAgeCA9IE1hdGgucm91bmQodGhpcy5fbGlzdE9iamVjdHNDb29yZHNbaV1bMF0gLyB0aGlzLl9jYW52YXNEaXZpc29yKTtcbiAgICAgICAgICAgICAgICAgICAgeSA9IE1hdGgucm91bmQodGhpcy5fbGlzdE9iamVjdHNDb29yZHNbaV1bMV0gLyB0aGlzLl9jYW52YXNEaXZpc29yKTtcbiAgICAgICAgICAgICAgICAgICAgeDEgPSBNYXRoLnJvdW5kKHRoaXMuX2xpc3RPYmplY3RzQ29vcmRzW2ldWzJdIC8gdGhpcy5fY2FudmFzRGl2aXNvcik7XG4gICAgICAgICAgICAgICAgICAgIHkxID0gTWF0aC5yb3VuZCh0aGlzLl9saXN0T2JqZWN0c0Nvb3Jkc1tpXVszXSAvIHRoaXMuX2NhbnZhc0Rpdmlzb3IpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsZXJ0KHggKyBcIiA8PSBcIiArIGN1cl94ICsgXCIgLSBcIiArIGN1cl94ICsgXCIgPD0gXCIgKyB4MSArIFwiIC0tLSBcIiArIHkgKyBcIiA8PSBcIiArIGN1cl95ICsgXCIgLSBcIiArIGN1cl95ICsgXCIgPD0gXCIgKyB5MSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbG9vcCBjb250cm9sIHZhcmlhYmxlXG4gICAgICAgICAgICAgICAgICAgIG9wID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYXNraW5nIGlmIGEgdmFsaWQgb2JqZWN0IHdhcyBjbGlja2VkLCBiYXNlZCBvbiBjb29yZGluYXRlcyBvZiBvYmplY3RzIGFuZCBjbGljayBldmVudFxuICAgICAgICAgICAgICAgICAgICBpZiAoKHggPD0gY3VycmVudF94ICYmIGN1cnJlbnRfeCA8PSB4MSlcbiAgICAgICAgICAgICAgICAgICAgICAgICYmICh5IDw9IGN1cnJlbnRfeSAmJiBjdXJyZW50X3kgPD0geTEpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZpbGwgcmVjdGFuZ2xlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3Ryb2tlUmVjdE9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSB0aGlzLl9saW5lV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5fbGluZUNvbG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VSZWN0KHgsIHksIHgxIC0geCwgeTEgLSB5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIGxpc3Qgb2YgcG9zaXRpb25lZCBvYmplY3RzXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9saXN0T2JqZWN0c0Fzc29jaWF0ZWRbdGhpcy5fbGlzdE9iamVjdHNBc3NvY2lhdGVkLmxlbmd0aF0gPSB0aGlzLl9saXN0T2JqZWN0c0Nvb3Jkc1tpXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgb3AgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRMaXN0T2JqZWN0c1Bvc2l0aW9uZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbmQgcHJpbnQgaW4gSlMgY29uc29sZSB0aGUgYXJyYXkgb2YgdGhlIGxpc3Qgb2YgcG9zaXRpb25lZCBvYmplY3RzXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGdldExpc3RPYmplY3RzUG9zaXRpb25lZCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5fbGlzdE9iamVjdHNBc3NvY2lhdGVkKSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0T2JqZWN0c0Fzc29jaWF0ZWQ7XG4gICAgfVxufVxuXG5Qb3NpdGlvbk9iamVjdENhbnZhc0V4ZXJjaXNlLmV4cG9ydHMgPSBQb3NpdGlvbk9iamVjdENhbnZhc0V4ZXJjaXNlO1xuXG5cbi8vIC8vIExpdmUgZXhlY3V0aW9uIG9mIGNvZGVcbi8vIGxldCBjb29yZHMgPSBbWzgwLCAzNSwgMzc1LCAyODNdLCBbMzk1LCAxMjAsIDcxNSwgMzcwXSwgWzM2LCAzNTIsIDg4LCA0MDRdLCBbNTIwLCAyMCwgNTkwLCA3Nl1dO1xuLy9cbi8vIGNvbnN0IGV4ID0gbmV3IFBvc2l0aW9uT2JqZWN0Q2FudmFzRXhlcmNpc2UoJ215Q2FudmFzJyk7XG4vLyBleC5fbGlzdE9iamVjdHNDb29yZHMgPSBjb29yZHM7XG4vLyBleC5fY2FudmFzV2lkdGggPSA3MDA7XG4vLyBleC5faW1hZ2VTcmMgPSAncGxhc21hLWRlc2t0b3AuanBnJztcbi8vIGV4LmluaXRpYWxpemVDYW52YXMoKTtcbi8vXG4vLyBsZXQgbWFya3MgPSBbXTtcbi8vXG4vLyBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3Jkcy5sZW5ndGg7IGkrKykge1xuLy8gICAgIG1hcmtzW2ldID0gZXguZ2V0TWFyaygpO1xuLy8gfVxuLy9cbi8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3B0aW9uc1wiKS5pbm5lclRleHQgPSBKU09OLnN0cmluZ2lmeShtYXJrcyk7XG4vL1xuLy8gZXguX2NhbnZhc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbi8vICAgICBtYXJrcy5zaGlmdCgpO1xuLy8gICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3B0aW9uc1wiKS5pbm5lclRleHQgPSBKU09OLnN0cmluZ2lmeShtYXJrcyk7XG4vLyAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN1bHRcIikuaW5uZXJUZXh0ID0gSlNPTi5zdHJpbmdpZnkoZXguZ2V0TGlzdE9iamVjdHNBc3NvY2lhdGVkKCkpO1xuLy8gfSwgZmFsc2UpO1xuLy9cbi8vIGNvbnNvbGUubG9nKGV4KTsiXX0=
