import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { data } = useContext(MyContext);
  const columnHeads = data.map((obj) => Object.keys(obj))[0];
  const titles = columnHeads && columnHeads.filter((names) => names !== 'residents');
  return (
    <table>
      <thead>
        <tr>
          {columnHeads && titles.map((title) => {
            if (!title.includes('_') && title !== 'residents') {
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
            { titles.map((title) => (
              <td key={ title }>
                { planets[title] }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Table;

// Name, Rotation Period, Orbital Period, Diameter, Climate, Gravity, Terrain, Surface Water, Population, Films, Created, Edited, Url;
