import {Population} from './geneticAlgoFunctions';

export abstract class Specie<T> {

    public population:Population;
    public phenotypes:T[];
    public x:number;
    public y:number;

    constructor(initialPopulationSize:number=100, chromosomeLength:number=10, initChromosomeToZero:boolean = false, isAllelRealValued:boolean = false, minAlleleValue:number = 0, maxAlleleValue:number = 1, public mutatorFunction:(parent1Allele:number[], parent2Allele:number[])=>number[], corssOverOperation:(parent1Allele:number[], parent2Allele:number[])=>number[] , 
     public environmentHeight:number, public environmentWidth:number, public spriteSheet:string) {
        this.population = new Population(initialPopulationSize, chromosomeLength, initChromosomeToZero, isAllelRealValued, minAlleleValue, maxAlleleValue);
        this.environmentHeight = environmentHeight;
        this.environmentWidth = environmentWidth;
        this.spriteSheet = spriteSheet;
    }
    
    public abstract render():void;

    public abstract chooseAction():void;

    public updateX(deltaX:number):void {
        this.x += deltaX;
    }

    public updateY(deltaY:number):void {
        this.y += deltaY;
    }
}