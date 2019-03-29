import {Population, Chromosome} from './geneticAlgoFunctions.js'
//environment will hold the population
//environment will fill in the population details (mutator func and all that)
//

function Environment(crossOverOperation, mutatorFunction) {
    this.birdPopulation = new Population();
    this.mutatorFunction = mutatorFunction;
    this.crossOverOperation = crossOverOperation;
}

//This function will give each bird its corresponding chromosome
Environment.initialise = function() {

}

//An iteration will consist of all the birds doing their respective motions
Environment.iterate = function() {

}

Environment.startNextGeneration = function() {

}