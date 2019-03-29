function Chromosome(alleles, fitnessValue) {
    fitnessValue = 0 || fitnessValue;
    this.alleles = alleles;
    this.fitnessValue = 0;
}

function Population() {
    this.chromosomes = {};
    this.populationSize = 0;
    this.cumulativeFitnessValue = 0;
}


Population.prototype.initialisePopulation = function(populationSize, chromosomeLength, InitChromosomeToZero, alleleRange, isAllelRealValued) {
    this.populationSize = populationSize;
    let generatedPopulation = {};
    InitChromosomeToZero = InitChromosomeToZero || false;
    alleleRange = alleleRange || 1;
    isAllelRealValued = isAllelRealValued || false;
    if(InitChromosomeToZero == true) {
        for(let i = 0; i<populationSize; i++) {
            generatedPopulation[i] = new Chromosome(new Array(chromosomeLength).fill(0), 0);
        }
        this.chromosomes = generatedPopulation;
        return 1;
    }

    for(let i = 0; i<populationSize; i++) {
        let currentChromosome = [];
        for(let j = 0; j<chromosomeLength; j++) {
            let randomAllele = Math.random() * alleleRange;
            let randomAlleleChosen = isAllelRealValued ? randomAllele : Math.round(randomAllele);
            currentChromosome.push(randomAlleleChosen);
        }
        generatedPopulation[i] = new Chromosome(currentChromosome);
    }
    this.chromosomes = generatedPopulation;
    return 1;
}



Population.prototype.mutatePopulation = function(mutatorFunction) {
    for(let i = 0; i<this.populationSize; i++) {
        this.chromosomes[i] = mutatorFunction(this.chromosomes[i]);
    }
}

Population.prototype.calculateFitnessValue = function(fitnessFunction) {
    for(let i = 0; i<this.populationSize;i++) {
        this.chromosomes[i].fitnessValue = fitnessFunction(this.chromosomes[i].alleles);
    }
}

Population.prototype.sumFitnessValue = function() {
    let runningFitnessValue = 0;
    for(let i =0; i<this.populationSize; i++) {
        runningFitnessValue += this.chromosomes[i].fitnessValue;
    }
    this.cumulativeFitnessValue = runningFitnessValue;
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
            parentsPointsSelected[i] -= this.chromosomes[chosenParentIndex+1].fitnessValue;
            chosenParentIndex++;
        }
        parentsSelected.push(this.chromosomes[chosenParentIndex]);
    }
    return parentsSelected;
}

Population.prototype.selectParentByTournamentSelection = function(tounramentSize) {
    let participantIndexes = [] //this will contain the list of indexes seleceted -- zero indexed
    for(let i=0; i<tounramentSize; i++) {
        let newParticipantIndex = Math.round(Math.random() * (this.populationSize -1));
        participantIndexes.includes(newParticipantIndex) ? i-- : participantIndexes.push(newParticipantIndex);
    }
    
    let parentSelectedIndex = participantIndexes[0]; //this is the first parent selected
    let parentSelectedFitnessValue = this.chromosomes[parentSelectedIndex].fitnessValue;
    console.log(participantIndexes);
    for(let i = 0; i<participantIndexes.length; i++) {
        if(this.chromosomes[participantIndexes[i]].fitnessValue > parentSelectedFitnessValue) {
            parentSelectedIndex = participantIndexes[i];
            parentSelectedFitnessValue = this.chromosomes[parentSelectedIndex].fitnessValue;
        }
    }
    return this.chromosomes[parentSelectedIndex];
}

Population.prototype.crossOver = function(crossOverOperation, numChildren, parent1, parent2) {
    let children = [];
    for(let i = 0; i<numChildren; i++) {
        children.push(new Chromosome(crossOverOperation(parent1, parent2), 0));
    }
    return children;
};

Population.prototype.setChromosomesTo = function(chromosomes) {
    this.populationSize = chromosome.length;
    this.cumulativeFitnessValue = 0;
    this.chromosomes = chromosomes;
}