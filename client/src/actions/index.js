//import axios from 'axios'
export const GET_POKEMONS = 'GET_POKEMONS'
export const GET_POKEMONS_DETAILS = 'GET_POKEMONS_DETAILS'
export const ORDER_POKEMONS = 'ORDER_POKEMONS'
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE'
export const POST_POKEMON = 'POST_PO'
export const POKEMON_TYPE = 'POKEMON_TYPE'


// export const getPokemons = () => async(dispatch,getState) => {
  // const offSet = getState().pokemons.offSet
// try {     //el try crea constante que guarde la respuesta de la espera de axios 
// const res = await axios.get('http://localhost:3001/pokemons') //==> axios genera la respuesta es res.data
// dispatch({
//   type: GET_POKEMONS,
//   payload: res.data.results
// })
// } catch(error) {
//   console.log(error)
// }
// }
export function getPokemons() {
 return function(dispatch) {
   return fetch ('http://localhost:3001/pokemons')
   .then(res => res.json())
   .then(pokemon =>
    dispatch({type: GET_POKEMONS, payload: pokemon}))
 }
}

export function getPokemonsDetail(name) {
    
  return function(dispatch) {
      return fetch(`http://localhost:3001/pokemon/?name=${name}`)
      .then(res => res.json())
      .then(detail => 
      dispatch({type: GET_POKEMONS_DETAILS, payload: detail}))
        
  }
}
export function postPokemon() {
  return function(dispatch) {
    return fetch ('http://localhost:3001/pokemons',{method: 'POST', body: JSON.stringify()})
    .then(res => res.json())
    .then(pokemon =>
     dispatch({type: GET_POKEMONS, payload: pokemon}))
  }
}

export function type() {
  return function(dispatch){
    return fetch('http://localhost:3001/types')
    .then(res => res.json())
    .then(res => {
      dispatch({type: POKEMON_TYPE, payload: res})
    })
  }
  
}

export function filterByType(type) {
  return function(dispatch) {
    return fetch('http://localhost:3001/pokemons')
    .then(res => res.json())
    .then(pokes => {
      let newState = pokes.filter(pokemon=> pokemon.type.includes(type))
      dispatch({type: FILTER_BY_TYPE, payload: newState })
    })
  }
}

export function order() {
  return function(dispatch) {
    return fetch('http://localhost:3001/pokemons')
    .then(res => res.json())
    .then(order => {
      let newState = order.sort((a,b) => (a.name > b.name) ? 1 : -1)
      dispatch({type: ORDER_POKEMONS, payload: newState })
    })
  }
}  

export function empty() {
 return {
   type: GET_POKEMONS_DETAILS,
   payload: {} 
 }
}

//dentro del arraw function, si pomgo llaves tengo que colocar el return 