const {Population, Chromosome} =  require('./geneticAlgoFunctions.js');
//const {Bird} = require('./bird'); should be needing bird file
//environment will hold the population
//environment will fill in the population details (mutator func and all that)
//

//environment may need to support multiple populations
//make each parameter concerning one population into an array

function Environment(...species) { //species is an array containing the specie type and the number of species of that type required
    this.species = species;
    this.populations = [];
    for(let i = 0; i<species.length; i++) {
        this.population.push(new Population());
    }
}

//This function will give each bird its corresponding chromosome
Environment.initialise = function() {
    
    this.population.initialisePopulation(this.populationSize, this.chromosomeLength, this.InitChromosomeToZero, isAllelRealValued, minAlleleValue, maxAlleleValue);
    
    for(let i = 0; i<this.populationSize; i++) {
        this.species.push(new Bird(0,0, this.chromosomeLength,''));
    }
}

//An iteration will consist of all the birds doing their respective motions
Environment.iterate = function() {
    
}

Environment.startNextGeneration = function() {

}

module.exports = {Environment}