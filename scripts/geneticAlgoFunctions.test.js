const {Population, Chromosome} = require('./geneticAlgoFunctions');

let population1ChromosomeSize = 10;
let population1SizeCount = 5;
let populationAlleleBounds = 3

let population1 = new Population(population1ChromosomeSize, population1SizeCount);
population1.initialisePopulation(population1SizeCount, population1ChromosomeSize, true, populationAlleleBounds, false);

test('Testing if size of chromosomes in population is initialised with correct length', ()=>{
    expect(population1.chromosomes[0].allels.length).toBe(population1ChromosomeSize);
});

test("Testing if population size is initialised to correct Value", ()=>{
    expect(population1.populationSize).toBe(population1SizeCount);
})

//Tests will be added later