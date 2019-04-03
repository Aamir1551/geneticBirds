import {fixedLengthArray} from './helpers'

export class Chromosome {

    public constructor(public alleles:number[], public fitnessValue:number = 0, public mutatorFunction:(allele:number[])=>number[]) {}

    public mutateChromosome() {
        this.alleles = this.mutatorFunction(this.alleles);
    }

    public setFitnessValue(fitnessValue:number) {
        this.fitnessValue = fitnessValue;
    }

    public initialize(chromosomeLength : number, isAlleleRealValued : Boolean = false, minAlleleValue : number = 0, maxAlleleValue:number=0) {
        let currentChromosome = [];
        for(let j = 0; j<chromosomeLength; j++) {
            let randomAllele = Math.random() * (maxAlleleValue - minAlleleValue) + minAlleleValue;
            let randomAlleleChosen = isAlleleRealValued ? randomAllele : Math.round(randomAllele);
            currentChromosome.push(randomAlleleChosen);
        }
    }

    public selectParentByUniversalSampling(parentSample:Chromosome[], numParentsTOSelect:number, cumulativeFitnessValue) : Chromosome[]{
        let parentsSelected:Chromosome[] = [];
        let parentsPointsSelected = [];
        
        for(let i = 0; i<numParentsTOSelect; i++) {
            parentsPointsSelected.push(Math.random() * cumulativeFitnessValue); 
        }
        
        for(let i = 0; i<numParentsTOSelect; i++) {
            let chosenParentIndex:number = -1;
            while(parentsPointsSelected[i] > 0) {
                parentsPointsSelected[i] -= parentSample[chosenParentIndex+1].fitnessValue;
                chosenParentIndex++;
            }
            parentsSelected.push(parentSample[chosenParentIndex]);
        }
        return parentsSelected;
    }

    public selectParentByTournamentSelection(parentSample:Chromosome[], numParentsToSelect:number, tounramentSize:number) : Chromosome[]{

        let parentsSelected : Chromosome[];
        for(let j = 0; j<numParentsToSelect;j++) {
            let participantIndexes:number[] = [] //this will contain the list of indexes seleceted -- zero indexed
            
            for(let i=0; i<tounramentSize; i++) {
                let newParticipantIndex = Math.round(Math.random() * (parentSample.length -1));
                participantIndexes.includes(newParticipantIndex) ? i-- : participantIndexes.push(newParticipantIndex);
            }
            
            let parentSelectedIndex = participantIndexes[0]; //this is the first parent selected
            let parentSelectedFitnessValue = parentSample[parentSelectedIndex].fitnessValue;
            for(let i = 0; i<participantIndexes.length; i++) {
                if(parentSample[participantIndexes[i]].fitnessValue > parentSelectedFitnessValue) {
                    parentSelectedIndex = participantIndexes[i];
                    parentSelectedFitnessValue = parentSample[parentSelectedIndex].fitnessValue;
                }
            }
            parentsSelected.push(parentSample[parentSelectedIndex]);
        }
        return parentsSelected;
    }    

}

/*
export class Population {
    private chromosomes:Chromosome[] = [];
    private cumulativeFitnessValue:number = 0;

    public constructor(private populationSize : number = 0, chromosomeLength : number, initChromosomeToZero : boolean = false, isAllelRealValued : boolean = false, minAlleleValue : number = 0, maxAlleleValue : number = 1) {
        //this.populationSize = populationSize;
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

    private setChromosomesTo(chromosomes:Chromosome[]) {
        this.populationSize = chromosomes.length;
        this.cumulativeFitnessValue = 0;
        this.chromosomes = chromosomes;
    }


    public updateGeneration<L extends number>(crossOverOperation: (parentsSelected:fixedLengthArray<Chromosome, L>)=>Chromosome, parentsSelected:fixedLengthArray<Chromosome, L>[]){ //need to be tuple of chromosome
        //crossOverOperation takes in as many chormosome pairs as parents gives in a tuple
        //reset population to new population made

        let newChromosomes:Chromosome[] = []; 
        for(let i=0; i<parentsSelected.length;i++) {
            newChromosomes.push(crossOverOperation(parentsSelected[i]));
        }

    }


}*/