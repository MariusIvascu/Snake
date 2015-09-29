var canvas = document.getElementById('canvas-1');
console.log("canvas : " + canvas);
var path = new Path.Circle({
  center: [100,100],
  radius: 20,
  fillColor: 'red'
});
function tick() {
  path.fillColor.hue += 1;
}
tick();
