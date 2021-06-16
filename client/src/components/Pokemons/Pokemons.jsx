import React, { useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {getPokemons} from '../../actions/index';
import './pokemons.css'

function Pokemons() {
const dispatch = useDispatch()   ////nos ayuda a consumir nuestra accion (getPokemonDetail) 
const pokemons = useSelector(store=> store.pokemons) //nos sirve para leer los estados que tenemos definidos en nuestro reducer (pokemons)
useEffect(() => {
dispatch(getPokemons())
},[dispatch]) //los corchetes vacios sirve para que se ejecute una sola vez cuando se renderiza 



const pokes = pokemons.map(e => (
    
    <Link className='name' to={'/detail/' + e.name} >
{ pokemons ? 
<div className='pokeCard'> 
    <div className='data'> 
        <div>
            <img src={e.img} alt="pokemon"/>
        </div>  
        <div>name: {e.name}</div>
        <div>type: {e.type}</div> 
        {/* <div>height: {e.height}</div>  */}
    </div>
</div> 
: <h1> LOADING ... </h1>
}
</Link>
))

  return (
    <div className='container'>
        <ul>
            {pokes}  
        </ul>
    </div>
        )

    
    
}





export default Pokemons

//useSelector es que hace la conexion
//useDispatch: dispatcha la accion