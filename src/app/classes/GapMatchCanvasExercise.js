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
class GapMatchCanvasExercise extends CanvasExercise {

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
    constructor(canvasElementId, canvasWidth = '', imageSrc = '',
                lineWidth = '2', lineColor = '#000000', lineHead = false, fontFamily = 'Arial',
                fontSize = '20', fontColor = '#000000', fontStyle = 'regular', fontAlign = 'center',
                fontBaseline = 'middle', mark = 'X', orderType = ORDER_TYPE_NUM,
                // Below are specific class parameters
                listObjectsCoords = [], listObjectsTags = [], strokeRectObject = true,) {

        super(canvasElementId, canvasWidth, imageSrc, lineWidth, lineColor, lineHead, fontFamily,
            fontSize, fontColor, fontStyle, fontAlign, fontBaseline, mark, orderType);

        // own properties of the class
        this._listObjectsCoords = listObjectsCoords;    // array of objects coordinates in the image
        this._listObjectsTags = listObjectsTags;        // array of objects tags in the image
        this._listObjectsTagged = [];                   // array to store the array of objects coordinates tagged by user
        this._strokeRectObject = strokeRectObject;      // define if object will be put into a rectangle

        // binding click event to canvas element to allow the gap match exercise execution
        this._canvasElement.addEventListener("click", this.clickAction.bind(this), false);
    }

    /**
     * Assign a Tag of object selected by click event over canvas element.
     * This function uses the coordinates of the objects inside canvas element and the coordinates of the click event.
     * @param event
     * @returns {*}
     */
    clickAction(event) {
        // Obtain mouse click position
        let current_x = event.pageX - event.currentTarget.offsetLeft,
            current_y = event.pageY - event.currentTarget.offsetTop;
        // alert(`cursorX: ${cur_x}, cursorY: ${cur_y}`);

        if (this._canvasElement.getContext) {
            // getting 2d context from canvas element
            let ctx = this._canvasElement.getContext("2d");

            // asking if object clicked was matched before
            if (!this._isTaggedExercise(this._listObjectsTagged, [current_x, current_y], this._canvasDivisor, this._listObjectsTags.length)) {

                // declaring variables
                let x, y, x1, y1, cent_x, cent_y, op;

                // looping the list of objects coordinates
                for (let i = 0; i < this._listObjectsCoords.length; i++) {

                    // Coordinates of the images
                    // The canvas divisor allow to calc the exact position of every coordinate,
                    // even if the canvas element is positioned anywhere inside the web page
                    x = Math.round(this._listObjectsCoords[i][0] / this._canvasDivisor);
                    y = Math.round(this._listObjectsCoords[i][1] / this._canvasDivisor);
                    x1 = Math.round(this._listObjectsCoords[i][2] / this._canvasDivisor);
                    y1 = Math.round(this._listObjectsCoords[i][3] / this._canvasDivisor);

                    // init text properties
                    ctx.font = `${this._fontStyle} ${this._fontSize}  ${this._fontFamily}`;
                    ctx.fillStyle = this._fontColor;
                    ctx.textAlign = this._fontAlign;
                    ctx.textBaseline = this._fontBaseline;

                    // loop control variable
                    op = false;

                    // asking if a valid object was clicked, based on coordinates of objects and click event
                    if ((x <= current_x && current_x <= x1)
                        && (y <= current_y && current_y <= y1)
                        && (this._listObjectsTags.length > 0)) {

                        // coordinates of the object center
                        cent_x = Math.round(x1 - ((x1 - x) / 2));
                        cent_y = Math.round(y1 - ((y1 - y) / 2));

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
    getListObjectsCoords() {
        console.log(JSON.stringify(this._listObjectsCoords));
        return this._listObjectsCoords;
    }

    /**
     * Return an array of objects tags in the image
     * @returns {Array|*}
     */
    getListObjectsTags() {
        console.log(JSON.stringify(this._listObjectsTags));
        return this._listObjectsTags;
    }

    /**
     * Return an array of arrays. Each one contains the object coordinate and the tag assigned
     * @returns {Array}
     */
    getListObjectsTagged() {
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
    _isTaggedExercise(objectsTagged, current_xy, divisor, cantTagged) {
        for (let i = 0; i < objectsTagged.length; i++) {

            // Coordinates of the images
            let x = Math.round(objectsTagged[i][0] / divisor),
                y = Math.round(objectsTagged[i][1] / divisor),
                x1 = Math.round(objectsTagged[i][2] / divisor),
                y1 = Math.round(objectsTagged[i][3] / divisor);

            if ((x <= current_xy[0] && current_xy[0] <= x1) && (y <= current_xy[1] && current_xy[1] <= y1) && (cantTagged > 0)) {
                return true;
            }
        }
        return false;
    }
}

GapMatchCanvasExercise.exports = GapMatchCanvasExercise;

