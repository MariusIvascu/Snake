// Ouverture du WebSocket player
var ws = new WebSocket('wss://localhost:8000');
var allSnakesPlayer = new allSnakes();
var colors = ['#660066','#CCCC33','#33CC33','#3300CC','#20ff20','#ff20ff','#0000FF','#000000'];

function playerColor(id) {
    return colors[id%8];
}

var myID = null;
var tMess;
var vector;
var mousePoint;
var currentPoint;
var clearCanvas = false;
var tab =[];

function onMouseDown(event) {

    mousePoint = new point(event.point.x,event.point.y);
    // Génération d'un vecteur entre la pos. actuelle et la pos. désirée
    currentPoint = new point(allSnakesPlayer.snakes[myID].body[0].center.x,allSnakesPlayer.snakes[myID].body[0].center.y);
    console.log(currentPoint);
    console.log(mousePoint);
    vector = new vecteur(currentPoint, mousePoint);
    vector.normalize();
    console.log(vector);
    tab[0] = myID;
    tab[1] = vector;
    ws.send(JSON.stringify(tab));
}

var i,j;
var circle;
var currentSnake;
var message;

// Ici, on reçoit le broadcast du serveur
ws.onmessage = function(msg) {

    message = JSON.parse(msg.data);
    tMess = message[0];

    if(tMess === "init")
    {
        myID = message[1];
        console.log("ID Assigned : " + myID);
    }
    else if(myID === null )
    {
        console.error("ID not set : Fatal error");
    }
    else if(tMess === "game")
    {
        allSnakesPlayer.snakes = message[1];
        project.activeLayer.removeChildren();
        if(allSnakesPlayer.snakes.length != 0)
        {
            for(i = 0;i < allSnakesPlayer.snakes.length;i++)
            {
                currentSnake = allSnakesPlayer.snakes[i];
                circle = new Path.Circle({
                    center : [currentSnake.body[0].center.x,currentSnake.body[0].center.y],
                    radius : SNAKE_CAP,
                    fillColor : playerColor(i)
                });

                for(j = 1; j < currentSnake.body.length;j++) {
                    circle = new Path.Circle({
                        center : [currentSnake.body[j].center.x,currentSnake.body[j].center.y],
                        radius : SNAKE_RADIOUS,
                        fillColor : playerColor(i)
                    });
                }
            }
        }
        else { console.log("allSnakesPlayer est vide");}
        view.update();
    }
    else if(tMess === "CLEAR_CANVAS") {
        clearCanvas=true;
    }
}

function onFrame() {
    if (clearCanvas) {
        project.clear();
    }
}