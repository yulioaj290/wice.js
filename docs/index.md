---
layout: default
title: Home
---

# WICE.js

WICE.js provides functions to interact with objects inside HTML canvas element using relative rectangle coordinates.
It is possible to design interactive exercises for educational purposes, captcha security verification, etc.

## Community

WICE.js is open source software released under an
[MIT license](https://github.com/yulioaj290/wice.js/blob/master/LICENSE).

You are welcome to
[report bugs](https://github.com/yulioaj290/wice.js/issues) or create pull
requests on [github](https://github.com/yulioaj290/wice.js).

## Installation

The easiest way to install WICE.js is with [`npm`][npm].

[npm]: https://www.npmjs.com/

```sh
npm install wice.js
```

Alternately, you can download the source and build WICE.js yourself:

```sh
git clone https://github.com/yulioaj290/wice.js.git
cd wice.js
npm install
npm run build
```

You must to include `wice.js` or `wice.min.js` file to your HTML page to get ready to use.

## Types of canvas exercises supported

The following are the main type of exercises that WICE.js support, but you may find some another type possible to perform with existent functions.

* Order Exercise
* Position Object Exercise
* Select Point Exercise
* Associate Exercise
* Gap Match Exercise

## General properties

Property | Value | Description
-------- | ----- | -----------
canvasElementId | String <br /> Eg.: "myCanvas" | ID attribute of the canvas HTML element to link
canvasWidth | Integer <br /> Eg.: 500 | Width of the canvas element (1)
imageSrc | String <br /> Eg.: "./my-image.jpg" | Image path to load on the canvas element
lineWidth | Integer <br /> Eg.: 2 | Width used when draw lines over canvas element (1)
lineColor | String <br /> Eg.: "#88FFCC" | Color used when draw lines (2)
fontFamily | String <br /> Eg.: "Arial" | Type of font used when draw texts over canvas element
fontSize | Integer <br /> Eg.: 24 | Font size for text over canvas (1)
fontColor | String <br /> Eg.: "#BB9922" | Font color for text over canvas (2)
fontStyle | String <br /> Eg.: "italic" | Font style, relative to `normal`, `bold`, `italic`, `small-caps`
fontAlign | String <br /> Eg.: "center" | Font alignment, relative to `center`, `left`, `right`, `start`, `end`
fontBaseline | String <br /> Eg.: "bottom" | Text baseline, relative to `middle`, `top`, `bottom`, `Alphabetic`, `Hanging`
mark | String <br /> Eg.: "x" | Define text mark to use to design a position over canvas. It can be a letter or a single word
orderType | Constant <br /> `ORDER_TYPE_ALPHA | ORDER_TYPE_NUM` | Alphabetic or numeric ordering (3)

<sup>1</sup> Sizes are in pixels (px)

<sup>2</sup> Colors can be written using Hexadecimal (`#FF88CC`), RGB (`rgb(100, 255, 190)`) or simple word (`blue, green, red`) format.

<sup>3</sup> Constants defined in CanvasExercise class.


#### Changing property values

```javascript
// Create canvas exercice (Associate)
const ex = new AssociateCanvasExercise('myCanvas');

// Setting canvas element width
ex.canvasWidth = 700;

// Assign the path to the image
ex.imageSrc = 'img/my-image.jpg';

// initializing canvas
ex.initializeCanvas();
```


## Order Exercise

Allows to perform ordering assignment to objects over canvas using coordinates

#### Properties

Property | Value | Description
-------- | ----- | -----------
listObjectsCoords | Array <br /> Eg.: `[[50,29,86,71],[92, 102, 156, 148]]` | Coordinates of the objects over canvas element
strokeRectObject | Boolean <br /> Eg.: true | Define if object will be highlighted using a rectangle based on the object coordinates

#### Code sample

```javascript
// Define objects coordinates over canvas element
var coords = [[80, 35, 375, 283], [395, 120, 715, 370], [36, 352, 88, 404]];

// Create canvas exercice (Order)
const ex = new OrderCanvasExercise('myCanvas');

// Setting coordinates property
ex.listObjectsCoords = coords;

// Setting property to highlight object with rectangle
ex.strokeRectObject = true;

// initializing canvas
ex.initializeCanvas();
```


## Position Object & Select Point Exercises

Allows to draw a mark in the position over canvas to identify objects using coordinates

#### Properties

Property | Value | Description
-------- | ----- | -----------
listObjectsCoords | Array <br /> Eg.: `[[50,29,86,71],[92, 102, 156, 148]]` | Coordinates of the objects over canvas element
strokeRectObject | Boolean <br /> Eg.: true | Define if object will be highlighted using a rectangle based on the object coordinates

#### Code sample

```javascript
// Define objects coordinates over canvas element
// You can use one of the following definitions
var coords = [];

// For several objects (Position Object)
coords = [[80, 35, 375, 283], [395, 120, 715, 370], [36, 352, 88, 404]];

// For one object (Select Point)
coords = [[80, 35, 375, 283]];

// Create canvas exercice (Position Object)
const ex = new PositionObjectCanvasExercise('myCanvas');

// Setting coordinates property
ex.listObjectsCoords = coords;

// Setting property to highlight object with rectangle
ex.strokeRectObject = true;

// initializing canvas
ex.initializeCanvas();
```


## Associate Exercises

Allows to draw a line between two points to associate two objects over canvas, identified using coordinates

#### Properties

Property | Value | Description
-------- | ----- | -----------
listObjectsCoords | Array <br /> Eg.: `[[50,29,86,71],[92, 102, 156, 148]]` | Coordinates of the objects over canvas element
listObjectsConnections | Array <br /> Eg.: `[[[92, 102, 156, 148]], [[50,29,86,71]]]` | Coordinates of connections between objects over canvas element
strokeRectObject | Boolean <br /> Eg.: true | Define if object will be highlighted using a rectangle based on the object coordinates

#### Code sample

```javascript
// Define objects coordinates over canvas element
var coords = [[80, 35, 375, 283], [395, 120, 715, 370], [36, 352, 88, 404]];
var connections = [[[36, 352, 88, 404], [36, 352, 88, 404]], [], [[80, 35, 375, 283]]];

// Create canvas exercice (Associate)
const ex = new AssociateCanvasExercise('myCanvas');

// Setting coordinates and associations properties
ex.listObjectsCoords = coords;
ex.listObjectsConnections = connections;

// Setting property to highlight object with rectangle
ex.strokeRectObject = true;

// initializing canvas
ex.initializeCanvas();
```

The examples of values in the previous example, establish a correspondence using array indexes, like following:

```
Objects Coordinates (3 Objects)
[[80, 35, 375, 283], [395, 120, 715, 370], [36, 352, 88, 404]]

[0] => [80, 35, 375, 283]   (Obj 1)
[1] => [395, 120, 715, 370] (Obj 2)
[2] => [36, 352, 88, 404]   (Obj 3)

Objects Connections
[[[36, 352, 88, 404], [395, 120, 715, 370]], [], [[80, 35, 375, 283]]]

[0] => [[36, 352, 88, 404], [395, 120, 715, 370]]
[1] => []
[2] => [[80, 35, 375, 283]]

Final Objects Connections
(Obj 1) -connected-to--> (Obj 3) & (Obj 2)
(Obj 2) -connected-to--> (none object)
(Obj 3) -connected-to--> (Obj 1)

```

## Gap Match Exercises

Allows to draw a text over objects inside the canvas element, identified using coordinates

#### Properties

Property | Value | Description
-------- | ----- | -----------
listObjectsCoords | Array <br /> Eg.: `[[50,29,86,71],[92, 102, 156, 148]]` | Coordinates of the objects over canvas element
listObjectsTags | Array <br /> Eg.: `['Human', 'Car']` | Tags associated to objects stored in `listObjectsCoords`
strokeRectObject | Boolean <br /> Eg.: true | Define if object will be highlighted using a rectangle based on the object coordinates

#### Code sample

```javascript
// Define objects coordinates over canvas element
var coords = [[80, 35, 375, 283], [395, 120, 715, 370], [36, 352, 88, 404]];
var tags = ['Human', 'Car', 'Building'];

// Create canvas exercice (Gap Match)
const ex = new GapMatchCanvasExercise('myCanvas');

// Setting coordinates and tags properties
ex.listObjectsCoords = coords;
ex.listObjectsConnections = tags;

// Setting property to highlight object with rectangle
ex.strokeRectObject = true;

// initializing canvas
ex.initializeCanvas();
```

The examples of values in the previous example, establish a correspondence using array indexes, like following:

```
Objects Coordinates (3 Objects)
[[80, 35, 375, 283], [395, 120, 715, 370], [36, 352, 88, 404]]

Objects Tags
['Human', 'Car', 'Building']

[0] => [80, 35, 375, 283]   (Human)
[1] => [395, 120, 715, 370] (Car)
[2] => [36, 352, 88, 404]   (Building)
```

<!-- 
<div id="home">
  <h1>Blog Posts</h1>
  <ul class="posts">
    {% for post in site.posts %}
      <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
</div> -->