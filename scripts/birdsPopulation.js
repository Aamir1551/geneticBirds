const {Specie}  = require('./specie');
const {Bird} = require('./bird')
//bird will do its instructions based upon its chromosome

function BirdPopulation(populationSize, initChromosomeToZero, environmentHeight, environmentWidth, spriteSheet) {
    Specie.call(populationSize, 2, initChromosomeToZero, true, -1, 1, environmentHeight, environmentWidth, spriteSheet);
    for(let i = 0; i<populationSize; i++) {
        this.populationInfo.push(new Bird(Math.random() * environmentHeight, Math.random() * environmentWidth, Math.random() * 360, []));
    }
}

BirdPopulation.prototype = Object.create(Specie.prototype);
BirdPopulation.prototype.constructor = Birds;

BirdPopulation.crossOverOperation = function(chromosome1, chromosome2) {
    return [chromosome1.alleles[0], chromosome2.alleles[1]]; 
}

BirdPopulation.prototype.createNextGeneration = function(numberOfChildren, parents) {
    for(let i = 0; i<selectedParentPairs.length; i++) {
        this.population.crossOver(BirdPopulation.crossOverOperation, numberOfChildren, selectedParentPairs[0], parents[1]);
    }
}

//selectParents will select parents from both alive and dead birds as to allow for diversity
Bird.prototype.selectParents = function(numOfParentsToSelect) {

}


BirdPopulation.prototype.updateFitnessValues = function() {
    //only update fitness value for the ones that survived
    for(let i = 0; i<this.population.length; i++) {
        
    }
}

BirdPopulation.mutatorFunction = function(chromosome) {
    return [chromosome[0] + Math.random() - 0.5, chromosome[1] + Math.random() - 0.5];
}

BirdPopulation.prototype.mutate = function() {
    for(let i = 0; i<this.populationSize; i++) {
        this.population.mutatePopulation(mutatorFunction);
    }
}

//chooseAction returns the amount of rotation nessesary in degrees 
BirdPopulation.chooseAction  = function(birdInfo) {
    let actionChosen = 0;
    for(let i = 0; i<birdInfo.surroundings.length; i++) {
        actionChosen+= (birdInfo.surroundings[i].x - birdInfo.x) * this.chromosome[0];
        actionChosen+= (birdInfo.surroundings[i].y - birdInfo.y) * this.chromosome[1]; 
    }
    return actionChosen > 0 ? 1 : -1;
}

BirdPopulation.prototype.iterate = function() {
    for(let i = 0; i<this.populationInfo.length; i++) {
        let roationRequired = Birds.chooseAction(this.population[i]);
        this.populationInfo[i].updateLocation(x, y, roationRequired); //change the x and y so that the bird moves in the direction the peak is pointing 
    }
}


module.exports = BirdPopulation;
