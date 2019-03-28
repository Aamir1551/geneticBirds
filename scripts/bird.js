const {Bird}  = require('./sprite');
//bird will do its instructions based upon its chromosome

function Bird(initialXPositiion, initialYPosition, intialChromosome, spriteImage) {
    Sprite.call(this, initialXPositiion, initialYPosition, intialChromosome, spriteImage);
    
}

Bird.prototype = Object.create(Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.move  = function(environment) {
    
}

