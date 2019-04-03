import {Chromosome} from './geneticAlgoFunctions';
import {fixedLengthArray} from './helpers'
import { Animal } from './animal';

export abstract class Specie<N extends number, S ,T extends Animal<N, S>, L extends number> {

    public population:T[];

    constructor(initialPopulationSize:number=100, chromosomeLength:number=10, isAllelRealValued:boolean = false, minAlleleValue:number = 0, maxAlleleValue:number = 1, 
        public mutatorFunction:(allele:number[])=>number[], 
        public corssOverOperation:(parentsSelected:fixedLengthArray<number[], N>)=>number[], 
        public environmentHeight:number, public environmentWidth:number, public spriteSheet:string) {
            this.environmentHeight = environmentHeight;
            this.environmentWidth = environmentWidth;
            this.spriteSheet = spriteSheet;
        }
    
    
    public abstract renderAll():void;

    public abstract chooseActions():void;


}