import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f282c3a797cd80f336c769ede385cfd1`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
    }
  };

  return (
    <div className='app'>
      <div className='search'>
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
          type='text'
        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{(data.main.temp - 273.15).toFixed(0)}°C</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        <div className='bottom'>
          <div className='feels'>
            <p className='bold'>Feels Like</p>
            {data.main ? <p>{(data.main.feels_like - 273.15).toFixed(0)}°C</p> : null}
          </div>
          <div className='humidity'>
            <p className='bold'>Humidity</p>
            {data.main ? <p>{data.main.humidity}%</p> : null}
          </div>
          <div className='wind'>
            <p className='bold'>Wind</p>
            {data.wind ? <p>{data.wind.speed} km/h</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
