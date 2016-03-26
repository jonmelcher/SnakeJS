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
    this.moves = [];                            // two element circular array for smooth movement
    this.direction = null;                      // current direction player is traveling in
    this.apple = this.nextApple();              // location of apple
}

// returns a random location within the bounds of the playing area
SnakeGame.prototype.getRandomLocation = function () {
    return { x: Math.floor(Math.random() * this.cols), y: Math.floor(Math.random() * this.rows) };
};

// returns whether a location is colliding with any of the cells occupied by the player
SnakeGame.prototype.isInBody = function(obj) {
    return this.body.filter(function(o) { return o.x == obj.x && o.y == obj.y } ).length > 0;
};

// generates a new location for the apple on the playing area which does not collide with the player
// if no location exists the game ends
SnakeGame.prototype.nextApple = function () {

    // win condition
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

// returns whether the given coordinates are inside the playing area or not
SnakeGame.prototype.isOutOfBounds = function (x, y) {
    return x < 0 || x >= this.cols || y < 0 || y >= this.rows;
};

// calculates the next position of the head of the player, given the current direction
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

// calculates next state of the game
SnakeGame.prototype.tick = function () {
    
    // do nothing if game is over
    if (!this.isAlive)
        return;
    
    // calculate new direction
    this.direction = this.moves.shift() || this.direction;
    
    // do nothing if snake is not moving
    if (!this.direction)
        return;
    
    // calculate position of new head
    var newHead = this.getNewHead();

    // lose condition - new head collides with body or is out of bounds
    if (this.isOutOfBounds(newHead.x, newHead.y) || this.isInBody(newHead)) {
        this.isAlive = false;
        return;
    }

    // add new head to body
    this.body.push(newHead);

    // if head is colliding with the apple, generate a new apple, add to points and 'grow' snake
    // by not shifting body array
    if (this.apple.x == newHead.x && this.apple.y == newHead.y) {
        this.apple = this.nextApple();
        ++this.points;
    }
    // otherwise simply shift array to move the snake without growing
    else
        this.body.shift();
};