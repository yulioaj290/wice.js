'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

//# sourceMappingURL=CanvasExercise-compiled.js.map