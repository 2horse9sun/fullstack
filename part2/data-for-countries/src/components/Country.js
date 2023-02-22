import { useState ,useEffect} from 'react'
import axios from 'axios';
import Weather from './Weather';

const Country=({country})=>{
    const [lat,lon]=country.latlng;
    const api_key = process.env.REACT_APP_API_KEY;
    const [weather,setWeather]=useState({});

    useEffect(()=>{
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
        .then(response=>{
          setWeather(response.data);
        })
    },[lat,lon,api_key])

    return(
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h2>languages</h2>
        <ul>
          {Object.entries(country.languages).map(([key,value])=><li key={key}>{value}</li>)}
        </ul>
        <img src={country.flags.png} alt="country flag" width="200"/>
        <h1>Weather in {country.name.common}</h1>
        {weather.main && <Weather weather={weather}/>}
      </div>
    )
}

export default Country