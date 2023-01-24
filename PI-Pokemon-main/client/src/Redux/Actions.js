
import axios from 'axios'


//Action types
export const GET_POKEMONS = "GET_POKEMONS";
export const RELOAD_POKEMONS = "RELOAD_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const POST_POKEMON = "POST_POKEMON";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const GET_DETAILS = "GET_DETAILS";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME_OR_STRENGH = "ORDER_BY_NAME_OR_STRENGH"


//Action creators

export function getPokemons(){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/pokemons")
            return dispatch({
                type:"GET_POKEMONS",
                payload: json.data
            })
        }catch(error) {
            alert('No se ha podido cargar la pagina')
        }
       
        
    }
}

export function reloadPokemons(){
    return {
        type:"RELOAD_POKEMONS",
    }
}


export function getTypes(){
    return async function(dispatch){
        try{
            var info = await axios.get("http://localhost:3001/types")

            return dispatch({ 
                type:"GET_TYPES",
                payload: info.data
            })
        }catch(error) {
            alert('No se encontró el tipo de pokemon')
        }
        
    }
}

export function postPokemon(payload){
    return async function(dispatch){
        try{
            const pokemon = await axios.post("http://localhost:3001/pokemons", payload)
        
            return {
                type:"POST_POKEMON",
                payload: pokemon
            }     
        }
        catch(error) {
            alert('Hay un dato erroneo')
        }
        
    }
}

export function getPokemonName(name){
    return async function (dispatch){
        try{
            const json = await axios.get("http://localhost:3001/pokemons?name=" + name)
            // console.log(json.data)

            return dispatch({
                type:"GET_POKEMON_NAME",
                payload: json.data
            })
        } catch(error){
            console.log(error)
            return dispatch({
                type:"GET_POKEMON_NAME",
                payload: ['Pokemon']
            })
        }
    }
}

export function getDetail (id){
    return async function (dispatch){
        try{
            let json = await axios.get("http://localhost:3001/pokemons/" + id);

            return dispatch({
                type:"GET_DETAILS",
                payload: json.data
            }) 
        } catch(error){
            console.log(error)
        }
    }
}

export function removeDetail(){
    return {
        type:"REMOVE_DETAILS",
    }
}

export function filterPokemonsByType(payload){
    return {
        type:"FILTER_BY_TYPES",
        payload
    }
}

export function filterCreated(payload){
    
    return {
        type:"FILTER_CREATED",
        payload
    }
}

export function orderByNameOrStrengh(payload){
    
    return {
        type:"ORDER_BY_NAME_OR_STRENGH",
        payload
    }
}
