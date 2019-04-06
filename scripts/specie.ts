import {Chromosome} from './geneticAlgoFunctions';
import { Animal } from './animal';

export abstract class Specie<S> {

    public population:Animal<S>[];

    constructor(public populationSize:number=100,public chromosomeLength:number = 1,
        public isAllelRealValued:boolean = false, public minAlleleValue:number = 0, public maxAlleleValue:number = 0, 
        public corssOverOperation:(...parentsSelected:number[])=>number[], 
        public selectParentFunction: typeof Chromosome.selectParentByTournamentSelection | typeof Chromosome.selectParentByUniversalSampling,
        public environmentHeight:number, public environmentWidth:number, public spriteSheet:string) {}
    
    
    public renderAll() :void {


    }

    public mutateAll() {
        for(let i=0;i<this.population.length;i++) {
            let currentAnimal = this.population[i];
            currentAnimal.chromosome.mutateChromosome(currentAnimal.mutatorFunction);
        }
    } 

    public chooseActions() {
        let actionsChosen = [];
        for(let i = 0; i<this.population.length; i++) {
            actionsChosen.push(this.population[i].chooseAction());
        }
    }

    public selectParentsForNextGeneration() {

    }

    public createNextGeneration() {

    }

    public updateFitnessValues() {
        for(let i=0; i<this.population.length;i++) {
            this.population[i].updateFitness();
        }
    }

    public iterateGamePlay() {

    }

    public startNextGeneration() {

    }

    public sumFitnessValues() {
        
    }


}