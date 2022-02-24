import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/fetchPlanets';
import MyContext from './MyContext';

function ContextProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsBackup, setPlanetsBackup] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });

  useEffect(() => {
    fetchPlanets().then((data) => {
      setPlanetsBackup(data.results);
      setPlanets(data.results);
    });
  }, []);

  const filterPlanetsName = async () => {
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
