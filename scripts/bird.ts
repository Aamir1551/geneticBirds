export class Bird {
    public constructor(public x:number, public y:number, public angleOfRotation:number = 0, 
        public vision:Bird[], public isAlive:boolean = true){};

    public updateSurroundings(newVision:Bird[]) : void {
        this.vision = newVision;
    }

    public updateLocation(newXvalue:number, newYvalue:number, deltaRotationalValue:number) : void{
        this.x = newXvalue;
        this.y = newYvalue;
        this.angleOfRotation+=deltaRotationalValue;
    }

    public die() : void{
        this.isAlive = false;
    }
}