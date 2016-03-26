var directions = Directions();

function SnakeGame(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.body = [this.getRandomLocation()];
    this.direction = null;
    this.apple = this.nextApple();
    this.isAlive = true;
    this.points = 0;
    this.moves = [];
}

SnakeGame.prototype.getRandomLocation = function () {
    return { x: Math.floor(Math.random() * this.cols), y: Math.floor(Math.random() * this.rows) };
};

SnakeGame.prototype.isInBody = function(obj) {
    return this.body.filter(function(o) { return o.x == obj.x && o.y == obj.y } ).length > 0;
};

SnakeGame.prototype.nextApple = function () {

    if (this.body.length == this.cols * this.rows) {
        this.isAlive = false;
        return { x: -1, y: -1 };
    }

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
        default:
            return { x: head.x + 1, y: head.y };
    }
};

SnakeGame.prototype.tick = function () {
    
    if (!this.isAlive)
        return;
        
    this.direction = this.moves.shift() || this.direction;
    
    if (!this.direction)
        return;
        
    var newHead = this.getNewHead();
    if (this.isOutOfBounds(newHead.x, newHead.y) || this.isInBody(newHead)) {
        this.isAlive = false;
        return;
    }

    this.body.push(newHead);
    if (this.apple.x == newHead.x && this.apple.y == newHead.y) {
        this.apple = this.nextApple();
        ++this.points;
    }
    else
        this.body.shift();
};