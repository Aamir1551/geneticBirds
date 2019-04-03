import {Chromosome} from './geneticAlgoFunctions'
import {fixedLengthArray} from './helpers'

export abstract class Animal<T extends number, L> {

    constructor(public chromosome:Chromosome, public x:number, public y:number, 
        public vision:any[], public isAlive:boolean = true, public selectParentFunction:(parentSampleSpace:Chromosome[])=>Chromosome[],
        public crossOver: (parents:fixedLengthArray<number, T>)=>Chromosome){};

    public updateSurroundings(newVision:L[]) : void {
        this.vision = newVision;
    }

    public abstract updateFeatures(deltaFeatures:number[]) 

    public updateLocation(newXvalue:number, newYvalue:number) : void{
        this.x = newXvalue;
        this.y = newYvalue;
    }

    //An action is chosen based upon the surroundings and its features
    public abstract ChooseAction();

    public die() : void{
        this.isAlive = false;
    }
    
}