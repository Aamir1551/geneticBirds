import {Chromosome} from './geneticAlgoFunctions';
import { Animal } from './animal';

export abstract class Specie<S> {

    public population:Animal<S>[];

    constructor(public initialPopulationSize:number=100, chromosomeLength:number = 1,
        isAllelRealValued:boolean = false, minAlleleValue:number = 0, maxAlleleValue:number = 0, 
        public corssOverOperation:(parentsSelected:number[])=>number[], 
        public environmentHeight:number, public environmentWidth:number, public spriteSheet:string) {
            this.environmentHeight = environmentHeight;
            this.environmentWidth = environmentWidth;
            this.spriteSheet = spriteSheet;
        }
    
    
    public abstract renderAll():void;

    public abstract chooseActions():void;


}