import {Animal} from './animal'
import {Chromosome} from './geneticAlgoFunctions'
import {Action} from './action'

export class Bird extends Animal<Bird> {
    
    public constructor(public x:number, public y:number, public speed:number, 
        public angleOfRotation:number = 0, public vision:Bird[], public isAlive:boolean = true, 
        public selectParentFunction:(parentSampleSpace:Chromosome[])=>Chromosome[]){
            super(new Chromosome([Math.random(), Math.random()]),
            function(allele) { return [allele[0] + Math.random() - 0.5, allele[1] + Math.random() - 0.5];}), 
            x, y, speed, angleOfRotation, vision, isAlive, selectParentFunction}

    public updateSurroundings(newVision:Bird[]) : void {
        this.vision = newVision;
    }


    protected static birdAction = class extends Action {
        constructor(public deltaAngle:number){super()}
    }

    public chooseAction() : Action {
        let actionChosen = 0;
        for(let i = 0; i<this.vision.length; i++) {
            actionChosen+= (this.vision[i].x - this.x) * this.chromosome[0];
            actionChosen+= (this.vision[i].y - this.y) * this.chromosome[1]; 
        }
        return new Bird.birdAction(actionChosen);
    }
}