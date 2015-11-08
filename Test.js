var model = require("./public/javascripts/snake");
var point = model.point;
var vecteur = model.vecteur;
var Snake = model.snake;

function testFunctionAdd() {
    var p = new point(2,2);
    var p1 = new point(0,0);
    var p2 = new point(1,0);

    console.log(p);
    var v = new vecteur(p1,p2);
    console.log(v);
    p.add(v); //parce qu'il a une vitesse égale ? 10
    if(p.x !== 12 || p.y !== 2) {
        console.error("Attendu [12,2] , recu " + JSON.stringify(p));
    }else{
        console.log("Succ?s");
    }
}

function testUpdateSnake() {
    var p1 = new point(1,0);
    var p2 = new point(2,0);
    var v1 = new vecteur(p1,p2);

    console.log("v1.x = " + v1.x);
    console.log("v1.y = " + v1.y);

    var snake = new Snake();
    snake.generateBody();

    var x0 = snake.body[0].center.x;

    console.log("snake.body[0] avant Update " + snake.body[0].center.x + " , " + snake.body[0].center.y);
    console.log("snake.body[1] avant Update " + snake.body[1].center.x + " , " + snake.body[1].center.y);
    console.log("x0 avant Update " + x0  + "\n");

    snake.update(v1);
    console.log("snake.body[0] apr?s Update " + snake.body[0].center.x + " , " + snake.body[0].center.y);
    console.log("snake.body[1] apr?s Update " + snake.body[1].center.x + " , " + snake.body[1].center.y);
    console.log("x0 apr?s Update " + x0 + "\n");

    if(snake.body[0].center.x != x0 + 10)
    {
        console.error("Attendu ["+ (x0+10) +"], recu " + snake.body[0].center.x);
    }
    else {console.log("Passed");}

    if(snake.body[1].center.x != x0) {
        console.error("Attendu ["+ (x0) +"], recu " + snake.body[1].center.x);
    }
    else {console.log("Passed");}
}

function testColision(){
    var p11 = new point(1,0);
    var p12 = new point(2,0);
    var v1 = new vecteur(p11,p12);
    var p21 = new point(0,1);
    var p22 = new point(0,2);
    var v2 = new vecteur(p21,p22);

    console.log("v1.x = " + v1.x);
    console.log("v1.y = " + v1.y);
    console.log("v2.x = " + v2.x);
    console.log("v2.y = " + v2.y);
    var allSnake = new model.allSnakes();
    var snake1 = new Snake();
    snake1.generateBody();
    var snake2 = new Snake();
    snake2.generateBody();
    var avantSnake1Y = [] ;
    var avantSnake2X = [];
    allSnake.snakes.push(snake1);
    allSnake.snakes.push(snake2);

    console.log("snake.body[0] avant Update " + snake1.body[0].center.x + " , " + snake1.body[0].center.y);
    console.log("snake2.body[0] avant Update " + snake2.body[0].center.x + " , " + snake2.body[0].center.y);
    avantSnake2X[0] = snake2.body[0].center.x;
    avantSnake1Y[0] = snake1.body[0].center.y;
    for( var a=1 ; a<100;a++){
        snake1.update(v1);
        snake2.update(v2);
        for(var i = 0;i < allSnake.snakes.length;i++)
        {
            if(allSnake.snakes[i] !== null)
            {
                allSnake.snakes[i].detectCollisions(allSnake.snakes);
            }
        }

        avantSnake2X[a] = snake2.body[0].center.x;
        avantSnake1Y[a] = snake1.body[0].center.y;
    }
    for ( var k = 1 ; k < 100; k++){
        if(avantSnake2X[k] == avantSnake2X[k-1]){
            console.log("Snake1 ? l'étape " + k + " pas en collision");
        }else{
            console.log("Snake1 ? l'étape " + k + " entrer en collision");
        }
        if(avantSnake1Y[k] == avantSnake1Y[k-1]){
            console.log("Snake2 ? l'étape " + k + " pas en collision");
        }else{
            console.log("Snake2 ? l'étape " + k + " entrer en collision");
        }
    }
}
//

//testUpdateSnake();
//testFunctionAdd();
testColision();


