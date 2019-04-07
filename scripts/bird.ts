import {Animal} from './animal'
import {Chromosome} from './geneticAlgoFunctions'
import {Action} from './action'

export class Bird extends Animal<Bird> {
   
    constructor(x:number, y:number, speed:number, 
        angleOfRotation:number, vision:Bird[], isAlive:boolean) {
            super(new Chromosome([Math.random(), Math.random()],0), 
            x, y, speed, angleOfRotation, vision, isAlive, 
            function(allele) { return [allele[0] + Math.random() - 0.5, allele[1] + Math.random() - 0.5];})
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

    public updateFitness() : void {
        if(this.isAlive) {
            this.chromosome.fitnessValue++;
        }
    }
}