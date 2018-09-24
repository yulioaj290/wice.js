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
class AssociateCanvasExercise extends CanvasExercise {

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
    constructor(canvasElementId, canvasWidth = '', imageSrc = '',
                lineWidth = '2', lineColor = '#000000', lineHead = false, fontFamily = 'Arial',
                fontSize = '20', fontColor = '#000000', fontStyle = 'regular', fontAlign = 'center',
                fontBaseline = 'middle', mark = 'X', orderType = ORDER_TYPE_NUM,
                // Below are specific class parameters
                listObjectsCoords = [], listObjectsConnections = [], strokeRectObject = true,) {

        super(canvasElementId, canvasWidth, imageSrc, lineWidth, lineColor, lineHead, fontFamily,
            fontSize, fontColor, fontStyle, fontAlign, fontBaseline, mark, orderType);

        // own properties of the class
        this._listObjectsCoords = listObjectsCoords;    // array of objects coordinates in the image
        this._listObjectsConnections = listObjectsConnections;    // array of objects connections in the image
        this._listObjectsAssociated = [];               // array to store the array of objects coordinates associated by user
        this._strokeRectObject = strokeRectObject;      // define if object will be put into a rectangle
        this._beginClickCoord = [];                     // store the coordinates of the 1st click event in format [x,y]
        this._numberAssociationsConnected = 0;

        // binding click event to canvas element to allow the associate object exercise execution
        this._canvasElement.addEventListener("click", this.clickAction.bind(this), false);
    }

    /**
     * Perform an associate action using a line between objects based on two click event over canvas element.
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

            // asking if there is Associations to be perform
            if (this._numberAssociationsConnected < this._getNumberOfConnections()) {

                // asking if it's the 1st click event
                if (this._beginClickCoord.length === 0) {
                    // Storing the 1st click event coordinates
                    this._beginClickCoord = [current_x, current_y];
                } else {

                    // getting coordinates of real objects, begin & end objects
                    let beginObject = this._findObjectThroughCoords(this._beginClickCoord),
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

    _findConnection(beginObject, endObject) {
        if (this._findEndCoordsInConnections(endObject, this._findBeginCoordsInConnections(beginObject))) {
            return 1;
        } else if (this._findEndCoordsInConnections(beginObject, this._findBeginCoordsInConnections(endObject))) {
            return 0;
        } else {
            return -1;
        }
    }

    _findBeginCoordsInConnections(beginObject) {
        // looping the list of objects coordinates
        for (let i = 0; i < this._listObjectsCoords.length; i++) {

            let value1 = JSON.stringify(this._listObjectsCoords[i]),
                value2 = JSON.stringify(beginObject);

            // looking for the index of the begin object
            if (value1 === value2) {
                return i;
            }
        }
    }

    _findEndCoordsInConnections(endObject, index) {
        // looping the list of objects connections coordinates
        for (let i = 0; i < this._listObjectsConnections[index].length; i++) {

            let value1 = JSON.stringify(this._listObjectsConnections[index][i]),
                value2 = JSON.stringify(endObject);

            // looking for the index of the begin object
            if (value1 === value2) {
                return true;
            }
        }

        return false;
    }

    _findObjectThroughCoords(coords) {

        // declaring variables
        let x, y, x1, y1;

        // looping the list of objects coordinates
        for (let i = 0; i < this._listObjectsCoords.length; i++) {

            // Coordinates of the images
            // The canvas divisor allow to calc the exact position of every coordinate,
            // even if the canvas element is positioned anywhere inside the web page
            x = Math.round(this._listObjectsCoords[i][0] / this._canvasDivisor);
            y = Math.round(this._listObjectsCoords[i][1] / this._canvasDivisor);
            x1 = Math.round(this._listObjectsCoords[i][2] / this._canvasDivisor);
            y1 = Math.round(this._listObjectsCoords[i][3] / this._canvasDivisor);

            // asking if a valid object was clicked, based on coordinates of objects and click event
            if ((x <= coords[0] && coords[0] <= x1)
                && (y <= coords[1] && coords[1] <= y1)) {

                return this._listObjectsCoords[i];
            }
        }

        return false;
    }

    _getNumberOfConnections() {
        let counter = 0;
        for (let i = 0; i < this._listObjectsConnections.length; i++) {
            counter += this._listObjectsConnections[i].length;
        }
        return counter;
    }

    /**
     * Return and print in JS console the array of the list of associated objects
     * @returns {Array}
     */
    getListObjectsAssociated() {
        console.log(JSON.stringify(this._listObjectsAssociated));
        return this._listObjectsAssociated;
    }
}

AssociateCanvasExercise.exports = AssociateCanvasExercise;


// Live execution of code
let coords = [[80, 35, 375, 283], [395, 120, 715, 370], [36, 352, 88, 404], [520, 20, 590, 76]],
    connections = [[[36, 352, 88, 404], [520, 20, 590, 76]], [[36, 352, 88, 404]], [[395, 120, 715, 370], [520, 20, 590, 76]], [[80, 35, 375, 283], [395, 120, 715, 370]]];

const ex = new AssociateCanvasExercise('myCanvas');
ex._listObjectsCoords = coords;
ex._listObjectsConnections = connections;
ex._canvasWidth = 700;
ex._imageSrc = 'plasma-desktop.jpg';
ex.initializeCanvas();

let marks = [];

for (let i = 0; i < ex._getNumberOfConnections(); i++) {
    marks[i] = " | ";
}

document.getElementById("options").innerText = JSON.stringify(marks);

ex._canvasElement.addEventListener("click", function () {
    if (ex._beginClickCoord.length === 0) {
        marks.shift();
        document.getElementById("options").innerText = JSON.stringify(marks);
        document.getElementById("result").innerText = JSON.stringify(ex.getListObjectsAssociated());
    }
}, false);

console.log(ex);