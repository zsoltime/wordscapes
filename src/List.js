import React, { useEffect, useState } from 'react';

function List() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/groups.json')
      .then(res => res.json())
      .then(d => setData(d));
  }, []);

  if (data) {
    return (
      <ol>
        {data.map(group => (
          <li key={group.name}>
            <p>{group.name}</p>
            <p>Levels {group.levels.join('-')}</p>
            <ol>
              {group.packs.map(pack => (
                <li key={pack}>{pack}</li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    );
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default List;
