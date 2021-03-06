import {Chromosome} from './geneticAlgoFunctions'
import { Action } from './action';

export abstract class Animal<L> {

    public constructor(public chromosome:Chromosome, public x:number, public y:number, 
        public speed:number, public angleOfRotation:number = 0, public vision:L[], public isAlive:boolean = true, 
        public mutatorFunction:(allele:number[])=>number[]){};

    public updateSurroundings(newVision:L[]) : void {
        this.vision = newVision;
    }

    public setLocation(x:number, y:number, angleOfRotation:number = 0) {
        this.x = x;
        this.y = y;
        this.angleOfRotation = angleOfRotation;
    }

    public updateLocation(newSpeed : number) : void{
        /**
         * need to do the maths
         */
    }

    public abstract chooseAction() : Action;

    public abstract updateFitness() : void;

    public die() : void{
        this.isAlive = false;
    }
    
}