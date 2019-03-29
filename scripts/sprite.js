function Sprite(initialXPositiion, initialYPosition, intialChromosome, spriteImage, alleleMaxValue) {
    this.x = initialXPositiion;
    this.y = initialYPosition;
    this.image = spriteImage;
    this.chromosome = intialChromosome;
    this.alleleMaxValue = alleleMaxValue;
}

Sprite.prototype.render = function() {

}

Sprite.updateX = function(deltaX) {
    this.x += deltaX;
}

Sprite.updateY = function(deltaY) {
    this.y += deltaY;
}

module.exports = Sprite;