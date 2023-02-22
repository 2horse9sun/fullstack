import { useState ,useEffect} from 'react'
import axios from 'axios';
import Country from './components/Country';
import Weather from './components/Weather';


const COUNTRY_URL = "https://restcountries.com/v3.1/all"


const CountryList=({countries,filter,handleClickShow})=>{
  const filteredCountryList=countries.filter(country=>country.name.common.toLowerCase().includes(filter.toLowerCase()));
  if(filter === ''){
    return null
  }else if(filteredCountryList.length>10){
    return <p>Too many matches, specify another filter</p>
  }else if(filteredCountryList.length===1){
    return filteredCountryList.map(country=><Country key={country.name.common} country={country}/>)
  }else{
    return filteredCountryList.map(country=>{
      return(
        <div key={country.name.common}>
          <span>{country.name.common}</span>
          <button onClick={(event)=>handleClickShow(event,country.name.common)} >Show</button>
        </div>
      )
    })
  }
}

const App=()=>{
  const [countries,setCountryList]=useState([]);
  const [filter,setFilter]=useState('');

  useEffect(()=>{
    axios
      .get(COUNTRY_URL)
      .then(response=>{
        setCountryList(response.data);
      })
  },[])

  const handleClickInput=(event)=>{
    event.preventDefault();
    setFilter(event.target.value);
  }

  const handleClickShow=(event,name)=>{
    event.preventDefault();
    setFilter(name);
  }

  return(
    <div>
      <form>
        find countries <input value={filter} onChange={handleClickInput}/>
      </form>
      <CountryList countries={countries} filter={filter} handleClickShow={handleClickShow}/>
    </div>
  )
}

export default App