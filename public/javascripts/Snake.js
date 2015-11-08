var MOD_SCREEN_HEIGHT = 490;
var MOD_SCREEN_LENGTH = 1010;

var SNAKE_RADIOUS = 7;
var SNAKE_CAP=9;
var SNAKE_LENGTH = 10;
var SPEED = 10;

function point(x,y) {
    this.x = x;
    this.y = y;
    this.add = function (v) {
        this.x = this.x + (v.x*SPEED);
        this.y = this.y + (v.y*SPEED);
    };
}

function vecteur(p1,p2) {
    this.x = p2.x - p1.x;
    this.y = p2.y - p1.y;
    this.length = Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
    this.normalize = function() {
        this.x = this.x / this.length;
        this.y = this.y / this.length;
        this.length = 1;
    }
    this.reverse = function() {
        this.x = 0 - this.x;
        this.y = 0 - this.y;
    }
}

function circle(p) {
    this.center = p;
    this.update = function (v) {
        if (this.center.x > MOD_SCREEN_LENGTH || this.center.x  < 0)
            v.x = -v.x;
        if (this.center.y > MOD_SCREEN_HEIGHT || this.center.y < 0)
            v.y = -v.y;
        this.center.add(v);

    }
}

function snake() {
    this.body = [];
    this.deaths = 0;
    this.randomPoint = function () {
        return new point(Math.random()*MOD_SCREEN_LENGTH,Math.random()*MOD_SCREEN_HEIGHT);
    }
    this.generateDir = function () {
        var newDir = new vecteur(this.randomPoint(), this.randomPoint());
        newDir.normalize();
        return newDir;
    }
    var direction = this.generateDir();
    this.generateBody = function () {
        this.body[0] = new circle(this.randomPoint(),SNAKE_CAP);
        this.body[1] = new circle(new point(this.body[0].center.x + 1,this.body[0].center.y + 1),SNAKE_RADIOUS);
        direction = this.generateDir();
        for(var i = 2;i < SNAKE_LENGTH;i++)
        {
            var p = new point(this.body[i-1].center.x + 1,this.body[i-1].center.y + 1);
            p.add(direction);
            this.body[i] = new circle(p);
        }
        direction.reverse();
    }

    this.update = function (vecteur) {

        for(var i = this.body.length - 1 ;i > 0;i--)
        {
            this.body[i].center.x = this.body[i-1].center.x;
            this.body[i].center.y = this.body[i-1].center.y;
        }
        if(vecteur !== null)
        {
            this.body[0].update(vecteur);
            direction = vecteur;
        }else{
            this.body[0].update(direction);
        }

    }

    this.removeSnake = function(id) {
        delete this.body[id];
    }

    this.detectCollisions = function(snakes) {
        var l1 = snakes.length;
        var thisHead = this.body[0];
        var l2,distance;
        var collision = false;

        for( var i = 0; i < l1; i++ )
        {
            var j = 0;
            if( snakes[i] === this )
            {
                j = 2;
            }
            l2 = snakes[i].body.length;
            for( j; j < l2; j++ )
            {
                distance = Math.sqrt((Math.pow((thisHead.center.x - snakes[i].body[j].center.x) , 2)) + (Math.pow((thisHead.center.y - snakes[i].body[j].center.y) , 2)));
                if ( distance < SNAKE_RADIOUS ) {
                    collision = true;
                }
            }
        }

        if( collision === true )
        {
            this.deaths++;
            this.generateBody();
        }
    }

}

function allSnakes () {
    this.snakes = [];
    this.directions = [];

    this.update = function () {
        for(var i = 0;i < this.snakes.length;i++)
        {
            if(this.snakes[i] !== null)
            {
                if(this.snakes[i].direction != this.directions[i])
                {
                    this.snakes[i].update(this.directions[i]);
                }
                else {this.snakes[i].update(null);}
            }
        }
        // Collision check iteration (Synchronisation des updates avant le check)
        for(var i = 0;i < this.snakes.length;i++)
        {
            if(this.snakes[i] !== null)
            {
                this.snakes[i].detectCollisions(this.snakes);
            }
        }
    }

    this.addSnake = function (id) {
        this.snakes[id] = new snake();
        this.snakes[id].generateBody();
    }

    this.removeSnake = function (id){
        delete this.snakes[id];
    }
}

if(typeof exports != 'undefined')
{
    var exports = module.exports = {}
    module.exports.snake=snake;
    module.exports.allSnakes=allSnakes;
    module.exports.point=point;
    module.exports.vecteur=vecteur;
    module.exports.circle=circle;
}