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
class OrderCanvasExercise extends CanvasExercise {

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
    constructor(canvasElementId, canvasWidth = '', imageSrc = '',
                lineWidth = '2', lineColor = '#000000', lineHead = false, fontFamily = 'Arial',
                fontSize = '20', fontColor = '#000000', fontStyle = 'regular', fontAlign = 'center',
                fontBaseline = 'middle', mark = 'X', orderType = ORDER_TYPE_NUM,
                // Below are specific class parameters
                listObjectsCoords = [], strokeRectObject = true,) {

        super(canvasElementId, canvasWidth, imageSrc, lineWidth, lineColor, lineHead, fontFamily,
            fontSize, fontColor, fontStyle, fontAlign, fontBaseline, mark, orderType);

        // own properties of the class
        this._listObjectsCoords = listObjectsCoords;    // array of objects coordinates in the image
        this._listObjectsOrdered = [];                  // array to store the array of objects coordinates arranged by user
        this._lastOrderNumber = 0;                      // last order assigned
        this._strokeRectObject = strokeRectObject;      // define if object will be put into a rectangle

        // binding click event to canvas element to allow the order exercise execution
        this._canvasElement.addEventListener("click", this.clickAction.bind(this), false);
    }

    /**
     * Assign an alphabetic/numerical order character to the object selected by click event over canvas element.
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

            // getting number of objects by list of object coordinates
            let numberObjects = this._listObjectsCoords.length;

            // asking if object clicked was ordered before
            if (!this._isOrderedExercise(this._listObjectsOrdered, [current_x, current_y], this._canvasDivisor, this._lastOrderNumber, numberObjects)) {

                // declaring variables
                let x, y, x1, y1, cent_x, cent_y, order, tmp, op;

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

                    // alert(x + " <= " + cur_x + " - " + cur_x + " <= " + x1 + " --- " + y + " <= " + cur_y + " - " + cur_y + " <= " + y1);

                    // loop control variable
                    op = false;

                    // asking if a valid object was clicked, based on coordinates of objects and click event
                    if ((x <= current_x && current_x <= x1)
                        && (y <= current_y && current_y <= y1)
                        && (this._lastOrderNumber < numberObjects)) {

                        // increment order number to assign
                        this._lastOrderNumber++;

                        // coordinates of the object center
                        cent_x = Math.round(x1 - ((x1 - x) / 2));
                        cent_y = Math.round(y1 - ((y1 - y) / 2));

                        // write order number
                        order = this._lastOrderNumber.toString();

                        // asking what kind of order is being used
                        if (this._orderType === CanvasExercise.orderTypeAlpha) {

                            // if alphabetic order was selected, then calculate the letter order
                            tmp = Math.floor(this._lastOrderNumber / 26);
                            order = (tmp >= 1 ? String.fromCharCode(64 + (this._lastOrderNumber / 26)) : '')
                                + String.fromCharCode(64 + (this._lastOrderNumber % 26));
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
    _isOrderedExercise(objectsOrdered, current_xy, divisor, lastOrderNumber, numberObjects) {

        for (let i = 0; i < objectsOrdered.length; i++) {

            // Coordinates of the images
            let x = Math.round(objectsOrdered[i][0] / divisor),
                y = Math.round(objectsOrdered[i][1] / divisor),
                x1 = Math.round(objectsOrdered[i][2] / divisor),
                y1 = Math.round(objectsOrdered[i][3] / divisor);

            if ((x <= current_xy[0] && current_xy[0] <= x1)
                && (y <= current_xy[1] && current_xy[1] <= y1)
                && (lastOrderNumber < numberObjects)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Return and print in JS console the array of the list of ordered objects
     * @returns {Array}
     */
    getListObjectsOrdered() {
        console.log(JSON.stringify(this._listObjectsOrdered));
        return this._listObjectsOrdered;
    }

}

OrderCanvasExercise.exports = OrderCanvasExercise;



