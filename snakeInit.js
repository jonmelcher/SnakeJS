// *******************************************************************
//  filename:       snakeInit.js
//  purpose:        initialization procedure for SnakeJS in index.html
//
//  written by Jonathan Melcher and Martin Humphreys on 2016-03-26
// *******************************************************************

(function() {
    
    var game = null;            // instance of SnakeGame
    var canvas = null;          // canvas
    var context = null;         // canvas context
    var graphics = null;        // SnakeGraphics module
    var statusEl = null;        // status scan element in index.html
    var pointsEl = null;        // points scan element in index.html
    var size = 19;              // number of rows / columns of playing area
    var tickSpeedMs = 70;       // tick speed of game in milliseconds 
    
    // canvas tick procedure
    function tick() {
        game.tick();                        // calculate next state of game
        graphics.draw();                    // draw state to canvas
        reportPoints();                     // update scan element
        reportStatus();                     // update scan element
        setTimeout(wait, tickSpeedMs);      // wait for next tick
    }
    
    // tick callback
    function wait() {
        requestAnimationFrame(tick);
    }

    // updates status scan element with running status of game
    function reportStatus() {
        statusEl.innerHTML = game.isAlive ? "" : "Game Over!";
    }
    
    // updates points scan element with accumulated points of game
    function reportPoints() {
        pointsEl.innerHTML = game.points;
    }

    // callback when resizing window to appropriately resize the canvas
    function resizeGame () {
        var padWidth = 50;
        var padHeight = 150;
        var max = Math.min(window.innerWidth - padWidth, window.innerHeight - padHeight);
        canvas.style.width = max + "px";
        canvas.style.height = max + "px";
    }
    
    // assigns a keydown event given direction name and its keycode
    function assignMovementEventHandler(direction, keyCode) {
        
        document.body.addEventListener("keydown", function(event) {
            if (keyCode == event.keyCode)
                game.moves.push(direction);
                if (game.moves.length > 2)
                    game.moves.shift();
                if (game.body.length > 1
                && directions.getOppositeDirection(game.direction) == game.moves[0])
                    game.moves.shift();
        }, true);
    }
    
    // onload procedure
    window.onload = function() {
        
        // initialize fields
        statusEl = document.getElementById("status");
        pointsEl = document.getElementById("points");
        canvas = document.getElementById("gameCanvas");
        context = canvas.getContext("2d");
        game = new SnakeGame(size, size);
        graphics = SnakeGraphics(game, canvas, context);

        // assign event handlers
        directions.getDirections().forEach(function(direction) {
            directions.getKeyCodes(direction).forEach(function(keyCode) {
                assignMovementEventHandler(direction, keyCode);    
            });
        });
        
        document.getElementById("newGame").addEventListener("click", function() {
            game = new SnakeGame(size, size);
            graphics = SnakeGraphics(game, canvas, context);
        });
        
        window.addEventListener("resize", resizeGame);
        
        // premptive resize
        resizeGame();

        // start ticking
        tick();
    }

})();