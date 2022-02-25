import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { data, filtersNumber, deleteFilter } = useContext(MyContext);
  const columnHeads = data.map((obj) => Object.keys(obj))[0];
  const titles = columnHeads && columnHeads.filter((names) => names !== 'residents');

  return (
    <div>
      <section>
        { filtersNumber && filtersNumber.map((filtro, index) => {
          const { colunm, comparison, value } = filtro;
          return (
            <div data-testid="filter" key={ index }>
              <span>{`${colunm} || ${comparison} || ${value}`}</span>
              <button
                type="button"
                onClick={ () => deleteFilter(filtro) }
              >
                X
              </button>
            </div>
          );
        })}
      </section>
      <table>
        <thead>
          <tr>
            {columnHeads && titles.map((title) => {
              if (!title.includes('_')) {
                return (
                  <th key={ title }>
                    {title.charAt(0).toUpperCase() + title.slice(1)}
                  </th>
                );
              }
              let name = title.split('_');
              name = name
                .map((titulo) => titulo.charAt(0).toUpperCase() + titulo.slice(1));
              return (
                <th key={ name[0] }>
                  {`${name[0]} ${name[1]}`}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          { data && data.map((planets, index) => (
            <tr key={ index }>
              { titles.map((title) => {
                if (title === 'name') {
                  return (
                    <td key={ title } data-testid="planet-name">
                      { planets[title] }
                    </td>
                  );
                }
                return (
                  <td key={ title }>
                    { planets[title] }
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Table;

// Name, Rotation Period, Orbital Period, Diameter, Climate, Gravity, Terrain, Surface Water, Population, Films, Created, Edited, Url;
