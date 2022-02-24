const fetchPlanets = async () => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(url, { method: 'GET' });
  const data = response.json();
  return data;
};

export default fetchPlanets;
