import React, { useState } from "react";
import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./searchBar.css";


function SearchBar() {
  const [pokemon, setPokemon] = useState("");

  function handleChange(event) {
    setPokemon(event.target.value)
    
  }

  

  return (
    <div className="search">
      <form>
        <nav className="nav">
          <button className="pokemon">Pokemon</button>

          <input
            type="text"
            placeholder="Search pokemon"
            autoComplete="on"
            value={pokemon}
            onChange={(event) => handleChange(event)}
          />

          <button className="boton" type="submit">
            <Link to={"/detail/" + pokemon}>Search</Link>
          </button>
        </nav>
      </form>
    </div>
  );
}

export default SearchBar
