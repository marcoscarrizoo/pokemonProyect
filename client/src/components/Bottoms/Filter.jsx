import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { filterByType } from '../../actions';
import './filter.css'


function Filter() {
  
const pokesType = useSelector(store=> store.pokeType)
const dispatch = useDispatch()

function handleChange(e) {
dispatch(filterByType(e.target.value))
}

    return (
        <button className='button'>
            <label>Filter By Type</label> <br></br>
            
            <select onChange={e => {
              handleChange(e)  
            }}> 
               {pokesType.map(e => {
                return (
                    <option key={e.id} value={e.name}>{e.name}</option>
                )
            })}
            </select>
        </button>
    )
}

export default Filter;
