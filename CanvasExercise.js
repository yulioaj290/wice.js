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
    initializeCanvas() {

        if (this._canvasElement.getContext) {

            let img = new Image();      // Create new img element

            // binding function to load image, to the load event
            img.addEventListener("load", this._onLoadImage.bind(this), false);

            // Set source path of image
            img.src = this._imageSrc;
        }
    }

    clickAction(event){
        
    }

    _onLoadImage(event) {

        // getting image object, with and height
        let img = event.currentTarget,
            imageWidth = img.width,
            imageHeight = img.height,
        // getting 2d context from canvas element
            ctx = this._canvasElement.getContext("2d");

        // setting canvas divisor to use when width and/or display resolution changes
        this._canvasDivisor = imageWidth / this._canvasWidth;

        let finalWidth = Math.round(imageWidth / this._canvasDivisor),
            finalHeight = Math.round(imageHeight / this._canvasDivisor);

        // setting canvas element dimensions
        this._canvasElement.setAttribute('width', finalWidth.toString());
        this._canvasElement.setAttribute('height', finalHeight.toString());

        // drawing image
        ctx.drawImage(img, 0, 0, imageWidth, imageHeight, 0, 0, finalWidth, finalHeight);
    }
}

CanvasExercise.exports = CanvasExercise;
