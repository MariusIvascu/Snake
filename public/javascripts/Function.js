var canvas = document.getElementById('canvas-1');
console.log("canvas : " + canvas);
var SNAKE_RADIOUS = 15;
var SNAKE_LENGHT = 10;
var SNAKE_CAP=20;


//var path = new Path.Circle({
//  center: [20,20],
//  radius: 20,
//  fillColor: 'red'
//});
var snake = [];
var cap = new Path.Circle({
  center: [20,20],
  radius: SNAKE_CAP,
  fillColor: 'red'
});
snake.push(cap);
for(var i=1;i<SNAKE_LENGHT;i++){
  var segment = new Path.Circle({
    center: [20,20+20*i],
    radius: SNAKE_RADIOUS,
    fillColor: 'red'
  });
  snake.push(segment);
}


var pos = new Point(20,20);

function onMouseDown(event){
  pos = event.point;
}

function onFrame(event) {
  console.log(event.count);
  var speed = 100;
    var vector = pos - snake[0].position;
    snake[0].position += vector / speed;
    for (var  i = SNAKE_LENGHT-1;i>0; i--) {
      var positionaux=snake[i].position;
      snake[i].position =(positionaux+snake[i-1].position)/2;
    }
  }
