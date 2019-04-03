class Chromosome {
    public alleles: number[];
    public fitnessValue = 0;

    public constructor(allele:number[], fitnessValue:number = 0) {
        this.alleles = allele;
        this.fitnessValue = fitnessValue;
    }
}

class Population {
    private chromosomes:Chromosome[] = [];
    private populationSize = 0;
    private cumulativeFitnessValue = 0;

    public constructor(populationSize : number, chromosomeLength : number, initChromosomeToZero : boolean = false, isAllelRealValued : boolean = false, minAlleleValue : number = 0, maxAlleleValue : number = 1) {
        this.populationSize = populationSize;
        let generatedPopulation:Chromosome[] = [];
        if(initChromosomeToZero) {
            for(let i = 0; i<populationSize; i++) {
                generatedPopulation[i] = new Chromosome(new Array(chromosomeLength).fill(0), 0);
            }
            this.chromosomes = generatedPopulation;
        } else {
            for(let i = 0; i<populationSize; i++) {
                let currentChromosome = [];
                for(let j = 0; j<chromosomeLength; j++) {
                    let randomAllele = Math.random() * (maxAlleleValue - minAlleleValue) + minAlleleValue;
                    let randomAlleleChosen = isAllelRealValued ? randomAllele : Math.round(randomAllele);
                    currentChromosome.push(randomAlleleChosen);
                }
                generatedPopulation[i] = new Chromosome(currentChromosome, 0);
            }
            this.chromosomes = generatedPopulation;
        }
    }

    public mutatePopulation(mutatorFunction:(chromosome:Chromosome)=>Chromosome) : void{
        for(let i = 0; i<this.populationSize; i++) {
            this.chromosomes[i] = mutatorFunction(this.chromosomes[i]);
        }
    }

    public calculateFitnessValues(fitnessFunction:(chromosome:Chromosome)=>Chromosome) :void {
        for(let i = 0; i<this.populationSize;i++) {
            this.chromosomes[i] = fitnessFunction(this.chromosomes[i]);
        }
    }

    public sumFitnessValue() :void {
        let runningFitnessValue:number = 0;
        for(let i =0; i<this.populationSize; i++) {
            runningFitnessValue += this.chromosomes[i].fitnessValue;
        }
        this.cumulativeFitnessValue = runningFitnessValue;
    }

    public selectParentByUniversalSampling(numParentsTOSelect:number, useCurrentFitnessValue:boolean=false) : Chromosome[]{
        useCurrentFitnessValue ? null : this.sumFitnessValue(); 
        let parentsSelected:Chromosome[] = [];
        let parentsPointsSelected = [];
        
        for(let i = 0; i<numParentsTOSelect; i++) {
            parentsPointsSelected.push(Math.random() * this.cumulativeFitnessValue);
        }
        
        for(let i = 0; i<numParentsTOSelect; i++) {
            let chosenParentIndex:number = -1;
            while(parentsPointsSelected[i] > 0) {
                parentsPointsSelected[i] -= this.chromosomes[chosenParentIndex+1].fitnessValue;
                chosenParentIndex++;
            }
            parentsSelected.push(this.chromosomes[chosenParentIndex]);
        }
        return parentsSelected;
    }

    public selectParentByTournamentSelection(numParentsToSelect:number, tounramentSize:number) : Chromosome[]{

        let parentsSelected : Chromosome[];
        for(let j = 0; j<numParentsToSelect;j++) {
            let participantIndexes:number[] = [] //this will contain the list of indexes seleceted -- zero indexed
            
            for(let i=0; i<tounramentSize; i++) {
                let newParticipantIndex = Math.round(Math.random() * (this.populationSize -1));
                participantIndexes.includes(newParticipantIndex) ? i-- : participantIndexes.push(newParticipantIndex);
            }
            
            let parentSelectedIndex = participantIndexes[0]; //this is the first parent selected
            let parentSelectedFitnessValue = this.chromosomes[parentSelectedIndex].fitnessValue;
            for(let i = 0; i<participantIndexes.length; i++) {
                if(this.chromosomes[participantIndexes[i]].fitnessValue > parentSelectedFitnessValue) {
                    parentSelectedIndex = participantIndexes[i];
                    parentSelectedFitnessValue = this.chromosomes[parentSelectedIndex].fitnessValue;
                }
            }
            parentsSelected.push(this.chromosomes[parentSelectedIndex]);
        }
        return parentsSelected;
    }

    public crossOver(crossOverOperation:(parent1Allele:number[],parent2Allele:number[])=>number[], numChildren:number, parent1:number[], parent2:number[]) : Chromosome[] {
        let children:Chromosome[] = [];
        for(let i = 0; i<numChildren; i++) {
            children.push(new Chromosome(crossOverOperation(parent1, parent2), 0));
        }
        return children;
    };

    public setChromosomesTo(chromosomes:Chromosome[]) {
        this.populationSize = chromosomes.length;
        this.cumulativeFitnessValue = 0;
        this.chromosomes = chromosomes;
    }
}


module.exports = {Population, Chromosome};