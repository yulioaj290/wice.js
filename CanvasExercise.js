/**
 * Project: ICE.js.
 * Author: Yulio Aleman Jimenez [@yulioaj290]
 * Date: 8/28/18
 * Created by WebStorm
 */
(function (c) {

    const ORDER_TYPE_ALPHA = 0,
        ORDER_TYPE_NUM = 1;

    function CanvasExercise(canvasElementId,
                            canvasWidth,
                            imageSrc,
                            cursorStyle = 'pointer',
                            lineWidth = '2',
                            lineColor = '#000000',
                            lineHead = false,
                            fontFamily = 'Arial',
                            fontSize = '20',
                            fontColor = '#000000',
                            mark = 'X',
                            orderType = ORDER_TYPE_NUM) {

        this._canvasElementId = canvasElementId;
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
        this._mark = mark;
        this._orderType = orderType;
    }

    CanvasExercise.prototype = {
        _initializeCanvas: function () {
            let canvasElement = document.getElementById(this._canvasElementId);

            if (canvasElement.getContext) {
                let ctx = canvasElement.getContext("2d");

                // Draw images
                let img = new Image(),      // Create new img element
                    that = this;            // referencing this variable

                img.onload = function () {
                    let imageWidth = this.width,
                        imageHeight = this.height;

                    that._canvasDivisor = imageWidth / that._canvasWidth;

                    let finalWidth = Math.round(imageWidth / that._canvasDivisor),
                        finalHeight = Math.round(imageHeight / that._canvasDivisor);

                    canvasElement.setAttribute('width', finalWidth.toString());
                    canvasElement.setAttribute('height', finalHeight.toString());

                    alert(`cD: ${that._canvasDivisor}, iW: ${imageWidth}, iH: ${imageHeight}, fW: ${finalWidth}, fH: ${finalHeight}`);
                    ctx.drawImage(img, 0, 0, imageWidth, imageHeight, 0, 0, finalWidth, finalHeight);
                };
                // Set source path
                img.src = this._imageSrc;
            }
        }
    };
})(console.log);
