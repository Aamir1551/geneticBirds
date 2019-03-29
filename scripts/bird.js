const {Bird}  = require('./sprite');
//bird will do its instructions based upon its chromosome

function Bird(initialXPositiion, initialYPosition, intialChromosome, spriteImage) {
    Sprite.call(this, initialXPositiion, initialYPosition, intialChromosome, spriteImage);
    
}

Bird.prototype = Object.create(Sprite.prototype);
Bird.prototype.constructor = Bird;

//surroundings consist of all the birds that are in the canvas for now -- i.e for this case its the set of all birds
//What this function is meant to do
//loop over over all the birds and subtract its x,y poition from the other birds that are there
//Use this list of x,y and multiply that by its chromosome(each allele may be subtracted by some amount) (each chromosome is going to consist of 2 alleles for now)
//After multiplying it by its chromosomes, sum up all the numbers and then if number if more than 0 move up otherwise move down by 1 degrees.
Bird.prototype.move  = function(surroundings) {
}

