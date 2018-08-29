/**
 * Project: ICE.js.
 * Author: Yulio Aleman Jimenez [@yulioaj290]
 * Date: 8/28/18
 * Created by WebStorm
 */

const ORDER_TYPE_ALPHA = 0,
    ORDER_TYPE_NUM = 1;

class CanvasExercise {

    constructor(canvasElementId, canvasWidth = '', imageSrc = '', cursorStyle = 'pointer',
                lineWidth = '2', lineColor = '#000000', lineHead = false, fontFamily = 'Arial',
                fontSize = '20', fontColor = '#000000', fontStyle = 'regular', fontAlign = 'center',
                fontBaseline = 'middle', mark = 'X', orderType = ORDER_TYPE_NUM) {

        this._canvasElementId = canvasElementId;
        this._canvasElement = document.getElementById(this._canvasElementId);
        this._canvasWidth = canvasWidth;
        this._canvasDivisor = 0;
        this._imageSrc = imageSrc;
        this._cursorStyle = cursorStyle;
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

    _initializeCanvas() {

        if (this._canvasElement.getContext) {
            let ctx = this._canvasElement.getContext("2d");

            // Draw images
            let img = new Image(),      // Create new img element
                that = this;            // referencing this variable

            img.onload = function () {
                let imageWidth = this.width,
                    imageHeight = this.height;

                that._canvasDivisor = imageWidth / that._canvasWidth;

                let finalWidth = Math.round(imageWidth / that._canvasDivisor),
                    finalHeight = Math.round(imageHeight / that._canvasDivisor);

                that._canvasElement.setAttribute('width', finalWidth.toString());
                that._canvasElement.setAttribute('height', finalHeight.toString());

                // alert(`cD: ${that._canvasDivisor}, iW: ${imageWidth}, iH: ${imageHeight}, fW: ${finalWidth}, fH: ${finalHeight}`);
                ctx.drawImage(img, 0, 0, imageWidth, imageHeight, 0, 0, finalWidth, finalHeight);
            };
            // Set source path
            img.src = this._imageSrc;
        }
    }
}

CanvasExercise.exports = CanvasExercise;