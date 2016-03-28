// *****************************************************************************************
//  filename:       SnakeGame.js
//  purpose:        provides an engine for calculating the state of the classic game 'Snake'
//
//  written by Jonathan Melcher on 2016-03-26
// ***************************************************************************************** 

// module taken from Directions.js
var directions = Directions();

// constructor pattern -    SnakeGame becomes an object with state which we can use to calculate
//                          the next state of the game
function SnakeGame(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.isAlive = true;
    this.points = 0;                            // how many apples have been eaten by player
    this.body = [this.getRandomLocation()];     // cells occupied by the player
    this.movements = [];                        // two element circular array for smooth movement
    this.direction = null;                      // current direction player is traveling in
    this.apple = this.nextApple();              // location of apple
}

// returns a random location within the bounds of the playing area
SnakeGame.prototype.getRandomLocation = function () {
    return { x: Math.floor(Math.random() * this.cols), y: Math.floor(Math.random() * this.rows) };
};

SnakeGame.prototype.isInBody = function(move) {
    return this.body.filter(function(o) { return o.x == move.x && o.y == move.y } ).length > 0;
};

// generates a new location for the apple on the playing area which does not collide with the player
// if no location exists the game ends
SnakeGame.prototype.nextApple = function () {

    if (this.body.length == this.cols * this.rows) {
        this.isAlive = false;
        return { x: -1, y: -1 };
    }

    // greedy algorithm to generate random locations until one works
    // the canonical one would require finding the difference between all cells and the occupied cells
    // of the player and choosing a random element, but this would run in O(n^2) time, while the algorithm
    // below will typically run faster, slowing down when the player occupies more and more of the playing area

    var appleLoc;
    do
        appleLoc = this.getRandomLocation();
    while (this.isInBody(appleLoc));

    return appleLoc;
};

SnakeGame.prototype.isOutOfBounds = function (x, y) {
    return x < 0 || x >= this.cols || y < 0 || y >= this.rows;
};

SnakeGame.prototype.getNewHead = function () {

    var head = this.body[this.body.length - 1];

    switch (this.direction) {
        case "up":
            return { x: head.x, y: head.y - 1 };
        case "down":
            return { x: head.x, y: head.y + 1 };
        case "left":
            return { x: head.x - 1, y: head.y };
        case "right":
            return { x: head.x + 1, y: head.y };
        default:
            return { x: head.x, y: head.y };
    }
};

SnakeGame.prototype.isMoveValid = function(move) {
    return !(this.isOutOfBounds(move.x, move.y) || this.isInBody(move));
}

SnakeGame.prototype.tick = function () {

    this.direction = this.movements.shift() || this.direction;

    if (!(this.isAlive && this.direction))
        return;
    
    var newHead = this.getNewHead();

    if (!this.isMoveValid(newHead)) {
        this.isAlive = false;
        return;
    }

    this.body.push(newHead);

    // if head is colliding with the apple, generate a new apple,
    // add to points, and 'grow' snake by not shifting body array
    if (this.apple.x == newHead.x && this.apple.y == newHead.y) {
        this.apple = this.nextApple();
        ++this.points;
    }
    else
        this.body.shift();
};
