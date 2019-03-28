function Chromosome(allels, fitnessValue) {
    fitnessValue = 0 || fitnessValue;
    this.allels = allels;
    this.fitnessValue = 0;
}

function Population(chromosomeLength, populationSize) {
    this.chromosomes = {};
    this.chromosomeLength = chromosomeLength;
    this.populationSize = populationSize;
    this.cumulativeFitnessValue = 0;
}


Population.prototype.initialisePopulation = function(populationSize, chromosomeLength, InitChromosomeToZero, alleleRange, isAllelRealValued) {
    this.populationSize = populationSize;
    this.chromosomeLength = chromosomeLength;
    let generatedPopulation = {};
    InitChromosomeToZero = InitChromosomeToZero || false;
    alleleRange = alleleRange || 1;
    isAllelRealValued = isAllelRealValued || true;
    if(InitChromosomeToZero == True) {
        for(let i = 0; i<populationSize; i++) {
            generatedPopulation[i] = {'chromosome': new Chromosome(new Array(chromosomeLength).fill(0), 0)};
        }
    }

    for(let i = 0; i<populationSize; i++) {
        let currentChromosome = [];
        for(let j = 0; j<chromosomeLength; j++) {
            let randomAllele = Math.random() * alleleRange;
            let randomAlleleChosen = isAllelRealValued ? Math.round(randomAllele) : randomAllele;
            currentChromosome.push(randomAlleleChosen);
        }
        generatedPopulation[i] = {'chromosome': new Chromosome(currentChromosome)};
    }
    this.chromosomes = generatedPopulation;
}



Population.prototype.mutatePopulation = function(mutatorFunction) {
    for(let i = 0; i<populationSize; i++) {
        this.chromosomes[i] = mutatorFunction(this.chromosomes[i]);
    }
}

Population.prototype.calculateFitnessValue = function(fitnessFunction) {
    for(let i = 0; i<populationSize;i++) {
        this.chromosomes[i] = fitnessFunction(this.chromosomes[i]);
    }
}

Population.prototype.sumFitnessValue = function() {
    let runningFitnessValue = 0;
    for(let i =0; i<populationSize; i++) {
        runningFitnessValue += this.chromosomes[i].fitnessValue;
    }
    this.cumulativeFitnessValue = runningFitnessValue;
}

Population.prototype.selectParent = function(useCurrentFitnessValue) {
    useCurrentFitnessValue = useCurrentFitnessValue || false;
    if(useCurrentFitnessValue == false) {
        this.sumFitnessValue();
    }
}

Population.prototype.selectParentByRouletteWheelSelection = function(useCurrentFitnessValue) {

}

Population.prototype.selectParentByUniversalSampling = function(numParentsTOSelect, useCurrentFitnessValue) {
    useCurrentFitnessValue ? null : this.sumFitnessValue(); 
    let parentsSelected = [];
    let parentsPointsSelected = [];
    for(let i = 0; i<numParentsTOSelect; i++) {
        parentsPointsSelected.push(Math.random() * this.cumulativeFitnessValue);
    } 
    for(let i = 0; i<numParentsTOSelect; i++) {
        let chosenParentIndex = -1;
        while(parentsPointsSelected[i] > 0) {
            parentsPointsSelected[i] -= this.chromosomes.fitnessValue;
            chosenParentIndex++;
        }
        parentsSelected.push(this.chromosomes[chosenParentIndex]);
    }
    return parentsSelected;
}

Population.prototype.crossOver = function() {

};