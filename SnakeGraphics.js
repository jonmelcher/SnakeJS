function SnakeGraphics(game, canvas, context) {
    
    var snakeColour = "green";
    var appleColour = "red";
    var bgColour = "black";
    var block = getBlock();
    
    function getBlock() {
        return { w: canvas.width / game.cols, h: canvas.height / game.rows };
    }
    
    function blitSnakeSegment(loc) {
        context.fillRect(loc.x * block.w, loc.y * block.h, block.w, block.h);
    }
    
    function blitSnake() {
        context.fillStyle = snakeColour;
        game.body.forEach(blitSnakeSegment);
    }
    
    function blitApple() {
        context.fillStyle = appleColour;
        context.fillRect(game.apple.x * block.w, game.apple.y * block.h, block.w, block.h);
    }
    
    function draw() {
        block = getBlock();
        context.fillStyle = bgColour;
        context.fillRect(0, 0, canvas.width, canvas.height);
        blitSnake();
        blitApple();
        context.fill();
    }
    
    return { draw : draw };
}