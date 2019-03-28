function Sprite(initialXPositiion, initialYPosition, intialChromosome, spriteImage) {
    this.x = initialXPositiion;
    this.y = initialYPosition;
    this.image = spriteImage;
    this.chromosome = intialChromosome;
}

Sprite.prototype.render = function() {

}

Sprite.updateX = function(deltaX) {
    this.x += deltaX;
}

Sprite.updateY = function(deltaY) {
    this.y += deltaY;
}