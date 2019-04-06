import {Bird} from './bird'
import {Specie} from './specie'
import {Chromosome} from './geneticAlgoFunctions'

class BirdPopulation extends Specie<Bird>{

    constructor(initialPopulationSize:number, environmentHeight:number, environmentWidth:number, spriteSheet:string){
        super(initialPopulationSize, 2, true, -1, 1, 
            function(...parentsSelected:number[]){return [parentsSelected[0][0], parentsSelected[1][1]];},
            Chromosome.selectParentByUniversalSampling, environmentHeight, environmentWidth, spriteSheet)
    }
}