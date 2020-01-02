import React, { Fragment, useEffect, useState } from 'react';
import { navigate } from '@reach/router';

function App(props) {
  const [data, setData] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const level = parseInt(props.level);

  useEffect(() => {
    setIsloading(true);

    fetch('/sunrise.json')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setIsloading(false);
      });
  }, []);

  function goToPrev() {
    navigate(`/answers/${level - 1}`);
  }

  function goToNext() {
    navigate(`/answers/${level + 1}`);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    if (!data[level]) {
      return <div>Oops, something went wrong</div>;
    }

    const gridElementStyle = {
      alignItems: 'center',
      backgroundColor: '#1976d2',
      borderRadius: '0.25rem',
      color: '#fff',
      display: 'flex',
      fontSize: '2rem',
      fontWeight: '500',
      height: '3rem',
      justifyContent: 'center',
      lineHeight: '1',
      textTransform: 'uppercase',
      width: '3rem',
    };

    const emptyElementStyle = {
      ...gridElementStyle,
      backgroundColor: 'transparent',
    };

    const gridStyle = {
      display: 'grid',
      gridTemplateColumns: `repeat(${data[level].cols}, 1fr)`,
      gridTemplateRows: `repeat(${data[level].rows}, 1fr)`,
      gridColumnGap: '0.5rem',
      gridRowGap: '0.5rem',
      margin: 'auto',
      width: `${data[level].cols * 3 + (data[level].cols - 1) * 0.5}rem`,
    };

    return (
      <div>
        <h1>
          {data[level].name} (Level {data[level].level})
        </h1>
        <div style={gridStyle}>
          {data[level].grid.map((row, i) => {
            return (
              <Fragment key={i}>
                {row.map((letter, j) => (
                  <div
                    key={j}
                    style={letter ? gridElementStyle : emptyElementStyle}
                  >
                    {letter}
                  </div>
                ))}
              </Fragment>
            );
          })}
        </div>

        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1rem',
          }}
        >
          <button disabled={level === 1} onClick={goToPrev}>
            Previous
          </button>
          <button onClick={goToNext}>Next</button>
        </div>
      </div>
    );
  }
}

export default App;
