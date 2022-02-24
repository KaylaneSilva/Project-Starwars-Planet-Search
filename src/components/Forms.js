import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Forms() {
  const { filterByName, handleFilterByName } = useContext(MyContext);
  return (
    <form onSubmit={ (event) => event.preventDefault() }>
      <div>
        <label htmlFor="searchPlanets">
          Search Planets
          <input
            data-testid="name-filter"
            type="text"
            name="searchPlanets"
            id="searchPlanets"
            value={ filterByName.name }
            onChange={ ({ target }) => {
              handleFilterByName({ name: target.value });
            } }
          />
        </label>
      </div>
    </form>
  );
}

export default Forms;
