
function Bird(initialXvalue, initialYvalue, initialRotationValue, surroundings) {
    this.x = initialXvalue;
    this.y = initialYvalue;
    this.angle = initialRotationValue;
    this.surroundings = surroundings;
    this.isAlive = true;
}

Bird.prototype.updateSurroundings = function(newSurroundings) {
    this.surroundings = newSurroundings;
}

Bird.prototype.updateLocation = function(newXvalue, newYvalue, newRotationValue) {
    this.x = newXvalue;
    this.y = newYvalue;
    this.angle = newRotationValue;
}

Bird.die() = function() {
    this.isAlive = false;
}


module.exports = Bird;