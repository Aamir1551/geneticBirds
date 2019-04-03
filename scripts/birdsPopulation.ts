
import {Bird} from './bird'
import {Specie} from './specie'

//bird will do its instructions based upon its chromosome

class BirdPopulation extends Specie<Bird, 2>{

    constructor(initialPopulationSize:number, initChromosomeToZero:boolean = false, environmentHeight:number, environmentWidth:number, spriteSheet:string) {

        super(initialPopulationSize, 2, initChromosomeToZero, true, -1, 1, 
        function(allele) { return [allele[0] + Math.random() - 0.5, allele[1] + Math.random() - 0.5];},
        function([parentAllele1, parentAllele2]) { return [parentAllele1[0], parentAllele2[1]];},
        environmentHeight, environmentWidth, spriteSheet);
        for(let i = 0; i<initialPopulationSize; i++) {
            this.phenotypes.push(new Bird(Math.random() * environmentHeight, Math.random() * environmentWidth, Math.random() * 360, []));
        }
    }

    public render() :void {

    }

    public chooseAction(birdInfo) {
    let actionChosen = 0;
    for(let i = 0; i<birdInfo.surroundings.length; i++) {
        actionChosen+= (birdInfo.surroundings[i].x - birdInfo.x) * this.chromosome[0];
        actionChosen+= (birdInfo.surroundings[i].y - birdInfo.y) * this.chromosome[1]; 
    }
    return actionChosen > 0 ? 1 : -1;
}
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
