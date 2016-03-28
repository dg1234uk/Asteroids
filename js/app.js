/*global scaleCanvasForHiDPI*/

var asteroids = (function() { // jshint ignore:line
  var game = {
    options: {
      timeStep: 1000 / 60, // constant dt step of 1 frame every 60 seconds
      gameSpeed: 1,
    },

    init: function() {
      // Set up Canvas
      game.canvas = document.getElementById('gameCanvas');
      game.ctx = game.canvas.getContext('2d');
      scaleCanvasForHiDPI(game.ctx);



      game.astr = new Asteroid(100, 100, 5, [new Vector(-4,-2), new Vector(-2,-4), new Vector(0,-2), new Vector(2,-4), new Vector(4,-2), new Vector(3,0), new Vector(4,2), new Vector(1,4), new Vector(-2,4), new Vector(-4,2), new Vector(-4,-2)]);


      game.main();
    },

    main: function(currentTime) {
      game.rAF = requestAnimationFrame(game.main);
      if (!game.lastFrameTime) {
        game.lastFrameTime = currentTime;
      }

      game.timeSinceLastUpdate = currentTime - game.lastFrameTime;
      game.lastFrameTime = currentTime;
      game.accumulator += game.timeSinceLastUpdate;

      // Keep the update fixed to 1/60 sec to ensure there aren't collision issues etc
      // Count steps to stop panic state, could also control FPS to stop panic states
      // TODO: Better document it
      var numUpdateSteps = 0;
      while (game.accumulator >= game.timeStep) {
        game.displayFPS(game.timeSinceLastUpdate / 1000);
        game.update((game.timeStep / 1000) / game.options.gameSpeed);
        game.accumulator -= game.timeStep;
        if (++numUpdateSteps >= 240) {
          game.panic();
          break;
        }
      }
      game.render();
    },

    panic: function() {
      game.accumulator = 0;
    },

    displayFPS: function(dt) {
      var fps = 1 / dt; //jshint ignore:line
      // game.gameFPSText.textContent = Math.round(fps);
    },

    update: function() {

    },

    render: function() {
      game.ctx.clearRect(0, 0, game.canvas.scaledWidth, game.canvas.scaledHeight);
      game.astr.draw();
    },

  };

  var Vector = function(x, y) {
    this.x = x;
    this.y = y;
  };

  Vector.prototype.multiplyScaler = function(scaler) {
    this.x *= scaler;
    this.y *= scaler;
  };

  var Asteroid = function(x, y, size, vertices) {
    this.x = x;
    this.y = y;
    this.vertices = vertices;

    for (var i = 0; i < this.vertices.length; i++) {
      this.vertices[i].multiplyScaler(size);
    }
  };

  Asteroid.prototype.draw = function() {
    game.ctx.save();
    game.ctx.beginPath();
    game.ctx.strokeStyle = '#ffffff';

    game.ctx.moveTo(this.vertices[0].x + this.x, this.vertices[0].y + this.y);

    for (var i = 1; i < this.vertices.length; i++) {
      game.ctx.lineTo(this.vertices[i].x + this.x, this.vertices[i].y + this.y);
    }

    game.ctx.closePath();

    game.ctx.stroke();
    game.ctx.closePath();
    game.ctx.restore();
  };


  game.init();

}());
