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

The easiest way to install acorn is with [`npm`][npm].

[npm]: https://www.npmjs.com/

```sh
npm install wice.js
```

Alternately, you can download the source and build acorn yourself:

```sh
git clone https://github.com/yulioaj290/wice.js.git
cd wice.js
npm install
npm run build
```

You must to include `wice.js` or `wice.min.js` file to your HTML page to get ready to use.

## Types of canvas exercises supported

The following are the main type of exercises that WICE.js support, but you may find some another type possible to perform with exiting functions.

* Order Exercise
* Position Object Exercise
* Select Point Exercise
* Associate Exercise
* Gap Match Exercise

## General properties

Property | Description
-------- | -----------
_canvasElementId | ID attribute of the canvas HTML element to link with
_canvasWidth | Width of the canvas element
_imageSrc | Image path to load on the canvas element
_lineWidth | Width in pixels (px) used when draw lines over canvas element
_lineColor | Color used when draw lines. Hexadecimal, RGB and simple word format is able to use
_fontFamily | Type of font used when draw texts over canvas element
_fontSize | Font size in pixels (px)
_fontColor | Font color, uses the same formats like _lineColor
_fontStyle | Font style, relative to `normal`, `bold`, `italic`, `small-caps`
_fontAlign | Font alignment, relative to `center`, `left`, `right`, `start`, `end`
_fontBaseline | Text baseline, relative to `middle`, `top`, `bottom`, `Alphabetic`, `Hanging`
_mark | Define text mark to use to design a position over canvas. It can be a letter or a single word
_orderType | Alphabetic or numeric ordering

