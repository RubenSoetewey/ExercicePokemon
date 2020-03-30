class Pokemon{
   name: string;
   lvl: number;
   speed: number;
   alreadyAttacked: boolean;
   atk: number;
   def: number;
   pv: number;
   attacks: Array<Attack>;
   constructor(name, lvl, speed, atk, def, pv, attacks)
   {
      this.name = name;
      this.lvl = lvl;
      this.speed = speed;
      this.alreadyAttacked = false;
      this.atk = atk;
      this.def = def;
      this.pv = pv;
      this.attacks = attacks;
   }
}

class Attack
{
   name: string;
   dmg: number;
   type: string;
   constructor(name, dmg, type)
   {
      this.name = name;
      this.dmg = dmg;
      this.type = type;
   }
}


function Fight(attackingPokemon: Pokemon,defendingPokemon: Pokemon)
{
   var move:Attack = attackingPokemon.attacks[Math.floor(Math.random() * attackingPokemon.attacks.length)];
   var dmg = Math.floor(Math.floor(Math.floor(2 * attackingPokemon.lvl / 5 + 2) * attackingPokemon.atk * move.dmg / defendingPokemon.def) / 50) + 2
   defendingPokemon.pv -= dmg;
   if(defendingPokemon.pv < 0)
      defendingPokemon.pv = 0;
   console.log(attackingPokemon.name+ " attaque "+ defendingPokemon.name + " avec "+move.name+" . Dommages : "+dmg+" PV restants : "+defendingPokemon.pv);
   return dmg
}

function Round(pokemon1: Pokemon,pokemon2: Pokemon)
{
   var tour = 0;
   while(pokemon1.pv > 0 && pokemon2.pv > 0){
      tour ++;
      console.log("Tour "+ tour);
      var attacker: Pokemon = WhoAttacks(pokemon1,pokemon2);
      var defender: Pokemon;
      if(attacker === pokemon1)
         defender = pokemon2;
      else
         defender = pokemon1;
      Fight(attacker,defender);
   }
   if(pokemon1.pv === 0)
   {
      console.log(pokemon2.name + " a vaincu "+ pokemon1.name);
      return pokemon2;
   }
   else if (pokemon2.pv === 0)
   {
      console.log(pokemon1.name + " a vaincu "+ pokemon2.name);
      return pokemon1;
   }
   else
   console.log("Something went wrong...")
}

function WhoAttacks(pokemon1: Pokemon, pokemon2: Pokemon)
{
   if(pokemon1.alreadyAttacked){
      pokemon1.alreadyAttacked = false;
      return pokemon2;
   }
   if(pokemon2.alreadyAttacked){
      pokemon2.alreadyAttacked = false;
      return pokemon1;
   }
   if(pokemon1.speed > pokemon2.speed){
      pokemon1.alreadyAttacked = true;
      return pokemon1;
   }
   if (pokemon2.speed > pokemon1.speed){
      pokemon2.alreadyAttacked = true;
      return pokemon2;
   }
   else{
      var rdm = Math.random();
      if(rdm > 0.5){
         pokemon1.alreadyAttacked = true;
         return pokemon1;
      }
      else{
         pokemon2.alreadyAttacked = true;
         return pokemon2;
      }
   }
}

var attaqueDracaufeu = new Attack("Lance-Flammes", 90, "Feu");
var attaqueTortank = new Attack("Hydrocanon", 110, "Feu");
var tortank = new Pokemon("Tortank",50,100,83,100,79,[attaqueTortank]);
var dracaufeu = new Pokemon("Dracaufeu",50,78,84,78,78,[attaqueDracaufeu]);
Round(dracaufeu,tortank);

module.exports = {Pokemon, WhoAttacks, Attack, Fight};
