import React, { useEffect } from 'react'
import './addPokemon.css'
import {type} from '../../actions/index'
import { useDispatch, useSelector } from 'react-redux'

function AddPokemon() {
const pokeTypes = useSelector(store => store.pokeType) //estan todos los typs de pokemon que traemos de la api 
const dispatch = useDispatch()

useEffect(()=>{
  dispatch(type())
},[dispatch])


    return (
      
      <div className='form'>
        <form action='http://localhost:3001/pokemons' method='POST' >  
          <div> 
            <label className='in'>Add Pokemon</label>
            <input className='in' type='text' placeholder='name' name='name'/> <br/>
            <label className='in'>type</label>
            <select className='in' name='type'>
            
            {pokeTypes.map(e => {
              return (
            <option className='in' key={e.id} value={e.id}>{e.name}</option>
            )
             }
             )}
             
             </select> 
            <input className='in' type='text' placeholder='lifeTime' name='lifeTime'/><br/>
            <input className='in' type='text' placeholder='strength' name='strength'/><br/>
            <input className='in' type='text' placeholder='defense'name='defense'/><br/>
            <input className='in' type='text' placeholder='speed' name='speed'/><br/>
            <input className='in' type='text' placeholder='height'name='height'/><br/>
            <input className='in'type='text' placeholder='weight'name='weight'/><br/>
            <button className='in' type="submit">Ready</button>
          </div>
        </form>
      </div>
    )
}
            
  
            
            

export default AddPokemon
