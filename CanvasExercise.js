/**
 * Project: ICE.js.
 * Author: Yulio Aleman Jimenez [@yulioaj290]
 * Date: 8/28/18
 * Created by WebStorm
 */

// Type of character for order exercises
const ORDER_TYPE_ALPHA = 0,
    ORDER_TYPE_NUM = 1;
/**
 * Superclass CanvasExercise define general properties and initialization functions for all kind of canvas exercises.
 */
class CanvasExercise {

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
    constructor(canvasElementId, canvasWidth = '', imageSrc = '',
                lineWidth = '2', lineColor = '#000000', lineHead = false, fontFamily = 'Arial',
                fontSize = '20', fontColor = '#000000', fontStyle = 'regular', fontAlign = 'center',
                fontBaseline = 'middle', mark = 'X', orderType = ORDER_TYPE_NUM) {

        this._canvasElementId = canvasElementId;    // define the canvas HTML element to link with
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
    static get orderTypeAlpha() {
        return ORDER_TYPE_ALPHA;
    }

    /**
     * Get constant value for numeric ordering objects.
     * @returns {number}
     */
    static get orderTypeNum() {
        return ORDER_TYPE_NUM;
    }

    /**
     * Initialize canvas element and load the image.
     * @private
     */
    _initializeCanvas() {

        if (this._canvasElement.getContext) {

            // getting 2d context from canvas element
            let ctx = this._canvasElement.getContext("2d");

            let img = new Image(),      // Create new img element
                that = this;            // referencing this variable

            img.onload = function () {
                let imageWidth = this.width,
                    imageHeight = this.height;

                // setting canvas divisor to use when width and/or display resolution changes
                that._canvasDivisor = imageWidth / that._canvasWidth;

                let finalWidth = Math.round(imageWidth / that._canvasDivisor),
                    finalHeight = Math.round(imageHeight / that._canvasDivisor);

                // setting canvas element dimensions
                that._canvasElement.setAttribute('width', finalWidth.toString());
                that._canvasElement.setAttribute('height', finalHeight.toString());

                // drawing image
                ctx.drawImage(img, 0, 0, imageWidth, imageHeight, 0, 0, finalWidth, finalHeight);
            };
            // Set source path of image
            img.src = this._imageSrc;
        }
    }
}

CanvasExercise.exports = CanvasExercise;