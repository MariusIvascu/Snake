// Do some initializing stuff
fabric.Object.prototype.set({
    transparentCorners: false,
    cornerColor: 'rgba(102,153,255,0.5)',
    cornerSize: 12,
    padding: 5
});

// initialize fabric canvas and assign to global windows object for debug
var canvas = window._canvas = new fabric.Canvas('canvas-1');

canvas.setBackgroundColor({source: 'http://fabricjs.com/assets/escheresque_ste.png'}, canvas.renderAll.bind(canvas));