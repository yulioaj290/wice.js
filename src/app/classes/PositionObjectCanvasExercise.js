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
class PositionObjectCanvasExercise extends CanvasExercise {

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
        this._listObjectsAssociated = [];               // array to store the array of objects coordinates positioned by user
        this._strokeRectObject = strokeRectObject;      // define if object will be put into a rectangle
        this._numberAssociationsConnected = 0;

        // binding click event to canvas element to allow the position object exercise execution
        this._canvasElement.addEventListener("click", this.clickAction.bind(this), false);
    }

    /**
     * Assign a position based on click event over canvas element.
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

            // asking if there is elements to be positioned
            if (this._numberAssociationsConnected < this._listObjectsCoords.length) {

                // declaring variables
                let x, y, x1, y1, op;

                // init text properties
                ctx.font = `${this._fontStyle} ${this._fontSize}  ${this._fontFamily}`;
                ctx.fillStyle = this._fontColor;
                ctx.textAlign = this._fontAlign;
                ctx.textBaseline = this._fontBaseline;

                // fill mark or letter
                ctx.fillText(this._mark, current_x, current_y);

                // decrement number of objects to be positioned
                this._numberAssociationsConnected++;

                // looping the list of objects coordinates
                for (let i = 0; i < this._listObjectsCoords.length; i++) {

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
                    if ((x <= current_x && current_x <= x1)
                        && (y <= current_y && current_y <= y1)) {

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
    getListObjectsPositioned() {
        console.log(JSON.stringify(this._listObjectsAssociated));
        return this._listObjectsAssociated;
    }
}

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