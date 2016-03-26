// ***********************************************************************************
//  filename:       SnakeGraphics.js
//  purpose:        module for use in SnakeJS to interface HTML5 canvas with SnakeGame
//
//  written by Jonathan Melcher on 2016-03-26
// ***********************************************************************************

function SnakeGraphics(game, canvas, context) {
    
    var snakeColour = "green";
    var appleColour = "red";
    var bgColour = "black";
    var block = getBlock();         // template for dimensions on canvas for a single cell
    
    // calculates dimensions of a single cell
    function getBlock() {
        return { w: canvas.width / game.cols, h: canvas.height / game.rows };
    }
    
    // adds cell to context using block template
    function blitCell(loc) {
        context.fillRect(loc.x * block.w, loc.y * block.h, block.w, block.h);
    }
    
    // adds snake body to context
    function blitSnake() {
        context.fillStyle = snakeColour;
        game.body.forEach(blitCell);
    }
    
    // adds apple to context
    function blitApple() {
        context.fillStyle = appleColour;
        blitCell(game.apple);
    }
    
    // draws current state of SnakeGame to context 
    function draw() {
        block = getBlock();
        context.fillStyle = bgColour;
        context.fillRect(0, 0, canvas.width, canvas.height);
        blitSnake();
        blitApple();
        context.fill();
    }

    // only the following are used externally    
    return { draw : draw };
}