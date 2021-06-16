//import {GET_POKEMONS, GET_POKEMONS_DETAILS, ORDER_POKEMONS, FILTER_POKEMONS } from '../actions/index'

import { GET_POKEMONS, GET_POKEMONS_DETAILS, POKEMON_TYPE, FILTER_BY_TYPE, ORDER_POKEMONS } from "../actions";

//nuestros estados
const initialState = {
  pokemons: [], // mostrara los pokemons
  pokemonsDetail: {}, // mostrara los detalles de un pokemon es especifico
  pokemonPost: {},
  pokeType: [],
  offSet: 0
};

//nuestro reducer 
export default function rootReducer(state = initialState, action) {

  switch (action.type) {
    case GET_POKEMONS:
      return {  //retornamos una accion 
        ...state,
        pokemons: action.payload
      }
    case GET_POKEMONS_DETAILS:
      return {
        ...state,
        pokemonsDetail: action.payload

      };
    case POKEMON_TYPE:
      return {
        ...state,
        pokeType: action.payload
      };
    case FILTER_BY_TYPE:
      return {
        ...state,
        pokemons: action.payload
      };
      case ORDER_POKEMONS:
        return {
          ...state,
          pokemons: action.payload
        }
    default:
      return state;
  }

}
     



