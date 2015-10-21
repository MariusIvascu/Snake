var canvas = document.getElementById('canvas-1');
console.log("canvas : " + canvas);

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

var cerc = new Path.Circle({
    center: [250,250],
    radius: 10,
    fillColor: 'blue'
});
console.log(cerc.radius)

var ws = new WebSocket('wss://localhost:8000/');
ws.onopen = function(msg) {
};

ws.onmessage = function(message) {
  console.log('received: %s', message.data);
};

var pos = new Point(400,400);

function onMouseDown(event){
  pos = event.point;
    ws.send(JSON.stringify(event.point));
}






function onFrame(event) {
    var speed = 100;
    var vector = pos - snake[0].position;
    snake[0].position += vector / speed;
    for (var i = SNAKE_LENGHT - 1; i > 0; i--) {
        var positionaux = snake[i].position;
        snake[i].position = (positionaux + positionaux + snake[i - 1].position) / 3;
    }
    var distance = cerc.position - snake[0].position;
    if (distance == snake[0].position) {
        console.log(distance);
    }
}