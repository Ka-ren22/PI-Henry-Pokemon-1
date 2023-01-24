const { Pokemon, Type } = require("../db.js");
const axios = require("axios")

const random = (arrlength) => {
  let number = Math.floor(Math.random() * arrlength);
  console.log(number, 'number')
  return number
 }

const arreglo = (arr) => {
  let results = []

  if(arr[0] && arr[0].hasOwnProperty('move')){
    const one = arr[random(arr.length)];
    const two = arr[random(arr.length)];
    const three = arr[random(arr.length)];

    results.push(one.move.name, two.move.name, three.move.name)
    console.log(results,'results')
  } else{
    if(arr.length > 1){
      const one = arr[random(arr.length)]['location_area'].name;
      const two = arr[random(arr.length)]['location_area'].name;

      one !== two ? results.push(one, two) : results.push(one)
    } else{
      arr[0] ? results.push(arr[0]['location_area'].name) : results
    }
  }
  return results
 } 



//Data de la api
const getApiInfo = async () => {
    const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
    //console.log(apiUrl)
    const results = apiUrl.data.results
    //console.log(results)
    const pokemonInfo = []

    
    for(let i = 0 ; i < results.length ; i++){
      const pokes = await axios.get(results[i].url);
      //console.log(pokes)
      const pokeInfo = pokes.data;
      console.log(pokeInfo)
      pokemonInfo.push({
        id: pokeInfo.id,
        name: pokeInfo.name,
        types: pokeInfo.types.map((t) => t.type.name),
        img: pokeInfo.sprites.other['official-artwork'].front_default,
        attack: pokeInfo.stats[1].base_stat,
        weight: pokeInfo.weight,
        height: pokeInfo.height
      });
    }
    
    return pokemonInfo;
}


//Data de la DB
const getDbInfo = async () => {
	const data = (await Pokemon.findAll({ 
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }
  })).map(pokemon => {
    const json = pokemon.toJSON();
    return{
      ...json,
      types: json.types.map( type => type.name)
    }
  });
  
  return data
}


//Concateno info de la api y la db
const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = [...apiInfo, ...dbInfo]; 
    // console.log(infoTotal)

    return infoTotal;
}


//Funcion que trae la data pasando el id
const getPokeInfo = async (id) => {
  try {
    const apiPokeUrl = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id);
    const results = apiPokeUrl.data
    const apiPokeSpecie = await axios.get(results.species.url)
    const speciesresult = apiPokeSpecie.data
   

    const allDescriptions = speciesresult["flavor_text_entries"].filter( el => el.language.name === 'en')
    const speciespok = speciesresult.genera.filter( el => el.language.name === 'en')
    const locations = await axios.get(results['location_area_encounters'])
    const moves = results.moves
    

    const pokemonInfo = {
      
      abilities: results.abilities ? results.abilities.map( a => a.ability.name) : null,
      growth: speciesresult['growth_rate'] ? speciesresult['growth_rate'].name : null,
      habitat: speciesresult.habitat ? speciesresult.habitat.name : null,
      description: allDescriptions[random(allDescriptions.length)]['flavor_text'].replace('POKéMON', 'Pokémon'),
      species: speciespok[0].genus ? speciespok[0].genus : null,
      locations: arreglo(locations.data),
      moves: arreglo(moves),

      
      id: results.id,
      name: results.name,
      types: results.types.map((t) => t.type.name),
      img: results.sprites.other['official-artwork'].front_default,
      hp: results.stats[0].base_stat,
      attack: results.stats[1].base_stat,
      defense: results.stats[2].base_stat,
      speed: results.stats[5].base_stat,
      weight: results.weight,
      height: results.height,
      happiness: speciesresult['base_happiness'],
      capture: speciesresult['capture_rate'],

      //EVOLUTION
      //evolution: await evolution(pokeEvolution.data)
    }
    console.log(pokemonInfo)

    return pokemonInfo;
  } catch (e) {
    console.error(e);
    if (e.status === 404) return null;
  }
}


//Funcion que trae la data pasandole el nombre
const getPokeInfoxName = async (name) => {
  try {
    const apiPokeUrl = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/" + name
    );
    const results = apiPokeUrl.data;

    const pokemonInfo = {
      id: results.id,
      name: results.name,
      types: results.types.map((t) => t.type.name),
      img: results.sprites.other["official-artwork"].front_default,
      weight: results.weight,
      height: results.height,
    };
    console.log(pokemonInfo);

    return pokemonInfo;
  } catch (e) {
    if (e.status === 404) return null;
  }
};

module.exports = {
  random,
  arreglo,
  getApiInfo,
  getDbInfo,
  getAllPokemons,
  getPokeInfo,
  getPokeInfoxName
};