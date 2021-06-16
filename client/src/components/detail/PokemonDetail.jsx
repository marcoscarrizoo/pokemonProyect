import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router';
import {getPokemonsDetail, empty } from '../../actions';
//import { Link } from 'react-router-dom';
import './pokemon_detail.css'
import {Link} from 'react-router-dom'


export default function PokemonDetail() {

  const detail = useSelector(store=> store.pokemonsDetail)
  const dispatch = useDispatch()  
  const{name} = useParams()

useEffect(() => {
  dispatch(getPokemonsDetail(name))
  return function() {
    dispatch(empty())
  }
  },[dispatch, name])


// if(detail.sprites.front_default) {
//   let img = detail.sprites.front_default
// } else {
//   let img = 'img not found'
// }


return(
  <div className='colorAll'> 
  <Link to='/inicio'>
  <button className='home'>
    HOME
  </button>
  </Link>
  <h1 className='title'> POKEMON DETAIL</h1>
  
       {
       detail.id ? 
       <div className='pokeCard2'>
          <div className='data2'>
            
            <div> <img src={detail.img} alt={detail.name}/></div> 
              <div>NAME: {detail.name} </div> 
              <div>TYPE: {detail.type} </div> 
              <div>HEIGHT: {detail.height} </div>
              <div>WEIGHT: {detail.weight} </div>
              <div>ATACK: {detail.height}</div>
            
          </div>
          
        </div>
        : <h1>LOADING</h1>
      } 

  </div>  
       
        )
    
}

 



