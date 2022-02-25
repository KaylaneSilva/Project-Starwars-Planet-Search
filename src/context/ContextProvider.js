import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/fetchPlanets';
import MyContext from './MyContext';

function ContextProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsBackup, setPlanetsBackup] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filtersNumber, setFiltersNumber] = useState([]);
  const [optionsColunm, setOptionsColunm] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  useEffect(() => {
    fetchPlanets().then((data) => {
      setPlanetsBackup(data.results);
      setPlanets(data.results);
    });
  }, []);

  const handleFilters = (filter, filterColunm) => {
    setOptionsColunm((prevState) => prevState
      .filter((options) => options !== filterColunm));
    setFiltersNumber((prevState) => [...prevState, filter]);
  };

  const removeAllFilters = () => {
    setFiltersNumber([]);
  };

  const filtersByNumber = () => {
    if (filtersNumber.length > 0) {
      return filtersNumber.map((filter) => {
        const { colunm, comparison, value } = filter;
        if (comparison === 'maior que') {
          const planetsFiltered = planets
            .filter((planeta) => Number(planeta[colunm]) > Number(value));
          return setPlanets(planetsFiltered);
        }
        if (comparison === 'menor que') {
          const planetsFiltered = planets
            .filter((planeta) => Number(planeta[colunm]) < Number(value));
          return setPlanets(planetsFiltered);
        }

        const planetasFiltrados = planets
          .filter((planeta) => Number(planeta[colunm]) === Number(value));
        return setPlanets(planetasFiltrados);
      });
    }
    return setPlanets(planetsBackup);
  };

  const deleteFilter = (filtro) => {
    setFiltersNumber((prevState) => prevState.filter((filter) => filter !== filtro));
    setPlanets(planetsBackup);
  };

  useEffect(() => {
    filtersByNumber();
  }, [filtersNumber]);

  const filterPlanetsName = () => {
    if (filterByName.name !== '') {
      const planetsFiltered = planetsBackup
        .filter((planet) => planet.name.includes(filterByName.name));
      return setPlanets(planetsFiltered);
    }
    setPlanets(planetsBackup);
  };

  useEffect(() => {
    filterPlanetsName();
  }, [filterByName]);

  const context = {
    data: planets,
    filterByName,
    filterPlanetsByName: filterPlanetsName,
    handleFilterByName: setFilterByName,
    handleFilters,
    filtersNumber,
    optionsColunm,
    deleteFilter,
    removeAllFilters,
  };

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ContextProvider;
