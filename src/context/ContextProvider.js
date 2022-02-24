import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/fetchPlanets';
import MyContext from './MyContext';

function ContextProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetchPlanets().then((data) => setPlanets(data.results));
  }, []);

  const context = {
    data: planets,
  };

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default ContextProvider;
