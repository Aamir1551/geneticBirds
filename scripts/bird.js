const {Bird}  = require('./sprite');
//bird will do its instructions based upon its chromosome

function Bird(initialXPositiion, initialYPosition, intialChromosome, spriteImage) {
    Sprite.call(this, initialXPositiion, initialYPosition, intialChromosome, spriteImage);
    
}

Bird.prototype = Object.create(Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.chooseAction  = function(surroundings) {
    let actionChosen = 0;
    for(let i = 0; i<surroundings.length; i++) {
        actionChosen+= (surroundings[i].x - this.x) * this.chromosome[0];
        actionChosen+= (surroundings[i].y - this.y) * this.chromosome[1]; 
    }
    return actionChosen > 0 ? 1 : 0;
}

