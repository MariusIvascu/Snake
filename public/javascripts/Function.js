var canvas = document.getElementById('canvas-1');
console.log("canvas : " + canvas);
var SNAKE_RADIOUS = 15;
var SNAKE_LENGHT = 15;
var SNAKE_CAP=20;

var snake = [];
var cap = new Path.Circle({
  center: [400,400],
  radius: SNAKE_CAP,
  fillColor: 'red'
});
snake.push(cap);

for(var i=1;i<SNAKE_LENGHT;i++){
  var segment = new Path.Circle({
    center: [400,400+20*i],
    radius: SNAKE_RADIOUS,
    fillColor: 'red'
  });
  snake.push(segment);
}

var ws = new WebSocket('wss://localhost:8000/');
//ws.on('open', function() {
//  ws.send('something');
//});
ws.onmessage = function(message) {
  console.log('received: %s', message.data);
  var obj = JSON.parse(message.data);
  pos.x = obj.x;
  pos.y = obj.y;
};

var pos = new Point(400,400);



function onMouseDown(event){
  pos = event.point;
}

function onFrame(event) {
    var speed = 100;
    var vector = pos - snake[0].position;
    snake[0].position += vector / speed;
    for (var i = SNAKE_LENGHT - 1; i > 0; i--) {
      var positionaux = snake[i].position;
      snake[i].position = (positionaux + positionaux + snake[i - 1].position) / 3;
    }

}