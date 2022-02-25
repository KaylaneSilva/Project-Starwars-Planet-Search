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
  const [order, setOrder] = useState({});

  useEffect(() => {
    fetchPlanets().then((data) => {
      const planetas = data.results;
      const planetasOrdenados = planetas.sort((a, b) => {
        const oneNegative = -1;
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return oneNegative;
        }
        return 0;
      });
      setPlanetsBackup(planetas);
      setPlanets(planetasOrdenados);
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

  const sortPlanets = () => {
    const { colunm, sort } = order;

    let planetsOrder = [];

    if (order) {
      const planetWithUnknown = planets.filter((planet) => planet[colunm] === 'unknown');
      const planetWithoutUnknown = planets
        .filter((planet) => planet[colunm] !== 'unknown');
      const planetasOrdenados = planetWithoutUnknown.sort((planetA, planetB) => {
        if (sort === 'ASC') {
          return Number(planetA[colunm]) - Number(planetB[colunm]);
        }
        return Number(planetB[colunm]) - Number(planetA[colunm]);
      });
      planetsOrder = [...planetasOrdenados, ...planetWithUnknown];
    }
    return setPlanets(planetsOrder);
  };

  useEffect(() => {
    sortPlanets();
  }, [order]);

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
    handleOrderState: setOrder,
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
