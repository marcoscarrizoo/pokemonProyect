import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import AddPokemon from './components/Bottoms/AddPokemon';
import Filter from './components/Bottoms/Filter';
import Order from './components/Bottoms/Order';
//import inicio from './components/inicio/inicio'
import Landing from './components/Landing_page/Landing_page';
import PokemonDetail from './components/detail/PokemonDetail';
import Pokemons from './components/Pokemons/Pokemons';
import SearchBar from './components/SearchBar/SearchBar';
import './index.css'


function App() {
  return (
<BrowserRouter>  
    <React.Fragment>
    <Route exact path ='/' component={Landing}/>
    <Route path ='/detail/:name' component={PokemonDetail}/>

    <Route path='/inicio' render={()=> <div> 
      <SearchBar/> 
      <Order/>
      <Filter/>
      <div className='contenedor'> 
        <div className='p1'><Route path ='/inicio' component={Pokemons}/> </div>
        <div className='p2'><Route path ='/inicio' component={AddPokemon}/> </div>
    </div>
    </div>} />
  </React.Fragment>
</BrowserRouter>       
    
  );
}

export default App;

