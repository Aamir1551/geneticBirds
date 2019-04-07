import {Chromosome} from './geneticAlgoFunctions';
import { Animal } from './animal';
import { type } from 'os';

export abstract class Specie<A extends Animal<any>> {

    public population:A[];
    public cumulativeFitness:number = 0;

    constructor(populationSize:number=100,public chromosomeLength:number = 1,
        public isAllelRealValued:boolean = false, public minAlleleValue:number = 0, public maxAlleleValue:number = 0, 
        public corssOverOperation:(...parentsSelected:number[])=>number[], 
        public selectParentFunction: typeof Chromosome.selectParentByTournamentSelection | typeof Chromosome.selectParentByUniversalSampling,
        public environmentHeight:number, public environmentWidth:number, public spriteSheet:string) {
            for(let i=0; i<populationSize;i++) {
                /*
                    this.population(new A()) -- simulate this
                */



                let newChromsome:Chromosome = new Chromosome();
                newChromsome.initialize(chromosomeLength, isAllelRealValued, minAlleleValue, maxAlleleValue);
                //this.population.push(cons());
            }
        }
    
    
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

    public selectParentsForNextGeneration(numParentsToSelect:number, option:number = this.cumulativeFitness) : Chromosome[] {
        return this.selectParentFunction(this.population.map(s=>s.chromosome), numParentsToSelect, option);
    }

    public createNextGeneration() {
        /**
         * this function needs to create replace the current generation with the new generation
         */
    }

    public updateFitnessValues() {
        for(let i=0; i<this.population.length;i++) {
            this.population[i].updateFitness();
        }
    }

    public iterateGamePlay() {
        //loop over each specie in population and do an action on each specie and then move each specie
        //add fitness value to each specie
        for(let i=0; i<this.population.length;i++) {

        }
    }

    public startNextGeneration() {
        //select parents for next generation and use them to create next generation -- use createNextGeneration
    }

    public calculateCumulativeFitness() :void {
        this.cumulativeFitness = 0;
        for(let i=0;i<this.population.length;i++) {
            this.cumulativeFitness+=this.population[i].chromosome.fitnessValue;
        }
    }


}