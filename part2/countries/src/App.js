import {useEffect, useState} from "react";
import axios from "axios";

const DisplayWeather = ({weather}) =>{
    console.log('weather is ', weather);
    if(weather){
        console.log(weather.weather.icon)
        return(
            <>

                <p>Temperature {Math.round(weather.main.temp - 273.15)} Celcius</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                     alt={weather.weather.main}
                />
                <p>wind {weather.wind.speed}m/s</p>
            </>

        );
    }


    return (<></>)
}
const Country = ({country}) =>{
    const api_key = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[0]}&appid=${api_key}`
    console.log(url)
    const [weatherObj, setWeatherObj] = useState();

    useEffect(()=>{
        axios
            .get(url)
            .then(response=>{
                setWeatherObj(response.data)
            })
            .catch(e=>console.log(e))
    },[url])
    console.log(weatherObj)

    return(
        <div>
            <h1>{country.name["common"]}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>Languages</h3>
            {/*{country.languaes.map()}*/}
            <ul>
                {Object.values(country.languages).map(lang=><li key={lang}>{lang}</li>)}

            </ul>
            <img src={country.flags["png"]} alt=""/>
            <h2>Weather in {country.capital}</h2>
            <DisplayWeather weather={weatherObj}/>

        </div>


    )
}
const ShortCountries = ({countries}) =>{
    const [isShow, setShow] = useState([countries.map(c=>false)])
    useEffect(()=>setShow(countries.map(c=>false)), [ countries])
    console.log('form outside',isShow)
    const handleClick = (id) =>{
        //why this don't work?
        //newShow = isShow
        //newShow[i] = !isShow[i]
        setShow(isShow.map((e,i)=>i===id?!e:e));
    }
    return(
        <div>
            {countries.map((c,i)=>
                    <div key={c['cca2']}>
                        <span >{c.name["common"]}</span>
                        <button onClick={ () =>handleClick(i)}>{
                            isShow[i]?'hide':'show'

                        }
                        </button>
                        {isShow[i]?<Country country={countries[i]}/>:""}
                    </div>)}
        </div>
    );
}
const Display = ({countries}) => {
    // console.log(countries.length)
    let result;
    if(countries.length > 10){
        // console.log("Too many matches")
        result = <p> Too many matches, Specify another filter</p>

    } else if(countries.length ===1) {
        // console.log("there is a single country");
        // console.log(JSON.stringify(countries[0].languages))
        result = <Country country={countries[0]}/>
    } else if (countries.length <=10 && countries.length > 1) {
        // console.log("there is multiple coutries scenario");
        result = <ShortCountries countries={countries}/>
    }
    return result;
};

function App() {
    const [filterName, setFilterName] = useState('');
    const [countries, setCountries] = useState([]);
    const [filterdCountries, setFilteredCountries] = useState([]);
    useEffect(()=>{axios
        .get('https://restcountries.com/v3.1/all')
        .then(res=>{
            setCountries(res.data);
            console.log("fetched the countries from the server")
        })
    },[])
    const updateCountriesToShow = () =>{
        setFilteredCountries(countries.filter(country=>
            country.name.common.toLowerCase().includes(filterName.toLowerCase())));
        // console.log(filterdCountries.view);
    }
    useEffect(updateCountriesToShow,[filterName,countries])

    const handleFilterChange = (e)=>{
        setFilterName(e.target.value);
    }
  return (
    <div>
        <input type="text" value={filterName} onChange={handleFilterChange}/>
        <Display countries={filterdCountries}/>
    </div>
  );
}

export default App;
