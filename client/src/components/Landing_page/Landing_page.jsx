import React from 'react';
import './landing.css';
import { Link } from 'react-router-dom'


function landing() {
    return (
<div className='landing'> 
<div className='lan'>
    <h1>POKEMON</h1>
</div>
  
<button className='ladingBoton'>
    <Link className='inicio' exact to="/inicio">INICIO</Link>
</button>

</div>   




    )
}

export default landing