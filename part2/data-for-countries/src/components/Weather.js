import axios from 'axios';

const Weather=({weather})=>{
    return(
      <div>
        <p>temperature {weather.main.temp} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather illustration"></img>
        <p>Wind {weather.wind.speed} m/s</p>
      </div>
    )
}

export default Weather