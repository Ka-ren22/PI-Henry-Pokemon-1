const { Router } = require("express");
const { Pokemon, Type } = require("../db.js");
const { getDbInfo, getAllPokemons, getPokeInfo, getPokeInfoxName } = require("../middlewares/middlewares");
const router = Router();

router.get("/", async (req, res) => {
  const name = req.query.name;
  //const attack =  req.query.name;
  

  if (name) {
    const pokemonName = await getPokeInfoxName(name.toLowerCase());

    if (pokemonName) {
      return res.status(200).send([pokemonName]);
    } else {
      const pokemonsDB = await getDbInfo();
      const pokemonNAM = pokemonsDB.filter(
        el => el.name.toLowerCase() === name.toLowerCase()
      );

      return pokemonNAM.length
        ? res.status(200).send(pokemonNAM)
        : res.status(404).send("Pokemon not found");
    }
  } else {
    const pokemonsTotal = await getAllPokemons();

    return res.status(200).send(pokemonsTotal);
  }
  /*if(attack){
    const attackPoke = await getAllPokemons()
    const att = attackPoke.filter( e => e.attack >= attack)
    if(attack){
      res.status(200).send(att)
    }else{
    res.status(500)
    }
  }*/
}); 



router.post('/', async (req, res) => {
  const { name, types, hp, attack, defense, speed, height, weight, img,createdInDb } = req.body;

  const pokemonCreated = await Pokemon.create({
    name, 
    hp, 
    attack, 
    defense, 
    speed, 
    height, 
    weight, 
    img,
    createdInDb 
  })

  const pokemonTypes = await Type.findAll({
    where: { name: types }
  })

  pokemonCreated.addType(pokemonTypes)
  return res.send('Pokemon created successfuly')
})




router.get('/:idPokemon', async (req, res) => {
  const { idPokemon } = req.params
  
  let pokemonInfo;
  if(idPokemon >= 1 && idPokemon <= 40 ){
    const pokemonInfo = await getPokeInfo(idPokemon)
    
    return pokemonInfo ?
    res.status(200).send([pokemonInfo]) :
    res.status(404).send('Pokemon not found')
  }

  const pokemonsTotal = await getDbInfo()

  if(!pokemonInfo && idPokemon){
    const pokemonId = pokemonsTotal.filter( el => el.id == idPokemon )

    return pokemonId.length ?
    res.status(200).send(pokemonId) :
    res.status(404).send('Pokemon not found')
  }
})


module.exports = router