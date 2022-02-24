import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

function Forms() {
  const { filterByName, handleFilterByName,
    handleFilters } = useContext(MyContext);
  const [inputColunm, setInputColunm] = useState('population');
  const [inputComparison, setInputComparison] = useState('maior que');
  const [inputValue, setInputValue] = useState(0);
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
      <div>
        <select
          id="inputColunm"
          name="inputColunm"
          value={ inputColunm }
          data-testid="column-filter"
          onChange={ ({ target }) => setInputColunm(target.value) }
        >
          <option
            value="population"
            id="population"
          >
            population
          </option>
          <option
            value="orbital_period"
            id="orbital_period"
          >
            orbital_period
          </option>
          <option
            value="diameter"
            id="diameter"
          >
            diameter
          </option>
          <option
            value="rotation_period"
            id="rotation_period"
          >
            rotation_period
          </option>
          <option
            value="surface_water"
            id="sufarce_water"
          >
            surface_water
          </option>
          {/* { optionsColunm.map((option, index) => (
            <option
              value={ option }
              key={ index }
              id={ option }
            >
              { option }
            </option>
          )) } */}
        </select>
        <select
          id="inputComparison"
          name="inputComparison"
          value={ inputComparison }
          data-testid="comparison-filter"
          onChange={ ({ target }) => setInputComparison(target.value) }
        >
          <option
            value="maior que"
            id="maior que"
          >
            maior que
          </option>
          <option
            value="menor que"
            id="menor que"
          >
            menor que
          </option>
          <option
            value="igual a"
            id="igual a"
          >
            igual a
          </option>
        </select>
        <label htmlFor="inputValue">
          Valor
          <input
            type="number"
            name="inputValue"
            id="inputValue"
            data-testid="value-filter"
            value={ inputValue }
            onChange={ ({ target }) => setInputValue(target.value) }
          />
        </label>
        <button
          data-testid="button-filter"
          type="submit"
          onClick={ () => {
            const filter = {
              colunm: inputColunm,
              comparison: inputComparison,
              value: inputValue,
            };
            return handleFilters(filter);
          } }
        >
          Filtrar
        </button>
      </div>
    </form>
  );
}

export default Forms;
