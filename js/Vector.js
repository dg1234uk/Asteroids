var asteroids = (function(module) {

  var Vector = function(x, y) {
    this.x = x;
    this.y = y;
  };

  Vector.prototype.multiplyScaler = function(scaler) {
    this.x *= scaler;
    this.y *= scaler;
  };


  // MODULE EXPORTS
  module.Vector = Vector;
  return module;

}(asteroids || {}));
