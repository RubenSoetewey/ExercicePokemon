const index = require('../index.ts')

test('dracofeu attacks before tortank',()=>{
    var attaqueDracaufeu = new index.Attack("Lance flammes", 80, "Feu");
    var attaqueTortank = new index.Attack("Hydrocanon", 110, "Eau");
    var tortank = new index.Pokemon("Tortank",50,100,83,100,79,[attaqueTortank]);
    var dracaufeu = new index.Pokemon("Dracaufeu",50,78,84,78,78,[attaqueDracaufeu]);
    expect(index.WhoAttacks(tortank,dracaufeu)).toBe(dracaufeu);
    expect(index.Fight(dracaufeu,tortank)).toBe(35);
    expect(index.Round(dracaufeu,tortank)).toBe(tortank);
 })