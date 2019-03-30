const {Population, Chromosome} = require('./geneticAlgoFunctions');
function Specie(initialPopulationSize, chromosomeLength, initChromosomeToZero, isAllelRealValued, minAlleleValue, maxAlleleValue, environmentHeight, environmentWidth, spriteSheet) {
    this.populationInfo = []; //populationInfo holds information for each individual in the population
    this.population = new Population();
    this.population.initialisePopulation(initialPopulationSize, chromosomeLength, initChromosomeToZero, isAllelRealValued, minAlleleValue, maxAlleleValue)
    this.EnvironmentHeight = environmentHeight;
    this.EnvironmentWidth = environmentWidth;
    this.spriteSheet = spriteSheet;
}

Specie.prototype.render = function() {

}

Specie.prototype.chooseAction = function() {
    throw new Error("chooseAction function has not yet been implemented");
}


Specie.updateX = function(deltaX) {
    this.x += deltaX;
}

Specie.updateY = function(deltaY) {
    this.y += deltaY;
}

Specie.prototype.mutatorFunction = function() {
    throw new Error("mutator function has not yet been implemented")
}

Specie.prototype.corssOverOperation = function() {throw new Error("crossOverOperation has not yet been implemented")}

module.exports = Specie;