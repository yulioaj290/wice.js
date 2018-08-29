/**
 * Project: ICE.js.
 * Author: Yulio Aleman Jimenez [@yulioaj290]
 * Date: 8/28/18
 * Created by WebStorm
 */


class OrderCanvasExercise extends CanvasExercise {

    constructor(canvasElementId, canvasWidth = '', imageSrc = '', cursorStyle = 'pointer',
                lineWidth = '2', lineColor = '#000000', lineHead = false, fontFamily = 'Arial',
                fontSize = '20', fontColor = '#000000', mark = 'X', orderType = ORDER_TYPE_NUM,
                // Below are specific class parameters
                listObjectsCoords = [], strokeRectObject = true,) {

        super(canvasElementId, canvasWidth, imageSrc, cursorStyle, lineWidth, lineColor, lineHead, fontFamily,
            fontSize, fontColor, mark, orderType);

        this._listObjectsCoords = listObjectsCoords;
        this._listObjectsOrdered = [];
        this._lastOrderNumber = 0;
        this._strokeRectObject = strokeRectObject;

        this._canvasElement.addEventListener("click", this.orderObject.bind(this), false);
    }

    orderObject(event) {
        // Obtain mouse click position
        var current_x = event.pageX - event.currentTarget.offsetLeft;
        var current_y = event.pageY - event.currentTarget.offsetTop;
        // alert(`cursorX: ${cur_x}, cursorY: ${cur_y}`);

        if (this._canvasElement.getContext) {
            var ctx = this._canvasElement.getContext("2d");

            let numberObjects = this._listObjectsCoords.length;

            if (!this._isOrderedExercise(this._listObjectsOrdered, [current_x, current_y], this._canvasDivisor, this._lastOrderNumber, numberObjects)) {

                // declaring variables
                let x, y, x1, y1, cent_x, cent_y;


                for (var i = 0; i < this._listObjectsCoords.length; i++) {

                    // Coordinates of the images
                    x = Math.round(this._listObjectsCoords[i][0] / this._canvasDivisor);
                    y = Math.round(this._listObjectsCoords[i][1] / this._canvasDivisor);
                    x1 = Math.round(this._listObjectsCoords[i][2] / this._canvasDivisor);
                    y1 = Math.round(this._listObjectsCoords[i][3] / this._canvasDivisor);

                    // init text properties
                    ctx.font = this._fontSize + this._fontFamily;
                    ctx.fillStyle = this._fontColor;
                    // ctx.textAlign = 'center';
                    // ctx.textBaseline = 'middle';

                    // alert(x + " <= " + cur_x + " - " + cur_x + " <= " + x1 + " --- " + y + " <= " + cur_y + " - " + cur_y + " <= " + y1);
                    var op = false;
                    if ((x <= current_x && current_x <= x1)
                        && (y <= current_y && current_y <= y1)
                        && (this._lastOrderNumber < numberObjects)) {
                        //alert(this._lastOrderNumber);
                        this._lastOrderNumber++;

                        // coordinates of the image center
                        cent_x = Math.round(x1 - ((x1 - x) / 2));
                        cent_y = Math.round(y1 - ((y1 - y) / 2));

                        // write order number
                        ctx.fillText(this._lastOrderNumber.toString(), cent_x, cent_y);

                        // Fill rectangle
                        if (this._strokeRectObject) {
                            ctx.lineWidth = this._lineWidth;
                            ctx.strokeStyle = this._lineColor;
                            ctx.strokeRect(x, y, x1 - x, y1 - y);
                        }

                        // var lastAnswer = $("#answers_order").html();
                        // $("#answers_order").html(lastAnswer + "[" + this._listObjectsCoords[i][0] + "," + this._listObjectsCoords[i][1] + "," + this._listObjectsCoords[i][2] + "," + this._listObjectsCoords[i][3] + "]");

                        // update ordered exercises matrix
                        this._listObjectsOrdered[this._listObjectsOrdered.length] = this._listObjectsCoords[i];

                        //alert(x + " < " + cent_x + " < " + x1);
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


    _isOrderedExercise(objectsOrdered, current_xy, divisor, lastOrderNumber, numberObjects) {

        for (var i = 0; i < objectsOrdered.length; i++) {

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

    getListObjectsOrdered() {
        console.log(JSON.stringify(this._listObjectsOrdered));
        return this._listObjectsOrdered;
    }

}

OrderCanvasExercise.exports = OrderCanvasExercise;



let coords = [[80, 35, 375, 283], [395, 120, 715, 370], [36, 352, 88, 404], [520, 20, 590, 76]];

const ex = new OrderCanvasExercise('myCanvas');
ex._listObjectsCoords = coords;
ex._canvasWidth = 700;
ex._imageSrc = 'plasma-desktop.jpg';
ex._initializeCanvas();

ex._canvasElement.addEventListener("click", function () {
    document.getElementById("result").innerText = JSON.stringify(ex.getListObjectsOrdered());
}, false);

console.log(ex);
