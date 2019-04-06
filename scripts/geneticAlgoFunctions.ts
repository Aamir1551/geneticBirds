export class Chromosome {

    public constructor(public alleles:number[] = [], public fitnessValue:number = 0) {}

    public mutateChromosome(mutatorFunction:(allele:number[])=>number[]) : void{
        this.alleles = mutatorFunction(this.alleles);
    }

    public setFitnessValue(fitnessValue:number) : void {
        this.fitnessValue = fitnessValue;
    }

    public initialize(chromosomeLength : number, isAlleleRealValued : Boolean = false, minAlleleValue : number = 0, maxAlleleValue:number=0) : void {
        let currentChromosome = [];
        for(let j = 0; j<chromosomeLength; j++) {
            let randomAllele = Math.random() * (maxAlleleValue - minAlleleValue) + minAlleleValue;
            let randomAlleleChosen = isAlleleRealValued ? randomAllele : Math.round(randomAllele);
            currentChromosome.push(randomAlleleChosen);
        }
    }

    public static selectParentByUniversalSampling(parentSample:Chromosome[], numParentsTOSelect:number, cumulativeFitnessValue:number) : Chromosome[]{
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

    public static selectParentByTournamentSelection(parentSample:Chromosome[], numParentsToSelect:number, tounramentSize:number) : Chromosome[]{

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