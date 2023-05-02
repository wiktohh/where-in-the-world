import { ThemeContext } from "@/context/ThemeContext";
import { Country } from "@/types/Country";
import { IDetal } from "@/types/types";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";


const fetchData = async (countryName: string) => {
    let countries;
    const API_URL = `https://restcountries.com/v3.1/name/${countryName}`
    console.log(API_URL);
    const res = await fetch(API_URL)
    const data = await res.json() as Country[]
    console.log(data)
    countries = data.map(country => {
      return{
        flag: country.flags.png,
        name: country.name.common,
        population: country.population,
        region: country.region,
        capital: country.capital ? country.capital[0] : null,
        nativeName: Object.values(country.name.nativeName)[0].official,
        subregion: country.subregion,
        currencies: Object.values(country.currencies).map(currency => currency.name).join(", "),
        languages: Object.values(country.languages).join(", "),
        tld: country.tld[0],
        borders: country.borders,
  
      }
    })
  
    return countries[0]
  }



const ContentCountry = () => {
    const router = useRouter()
    const countryName = router.query.country;
    const {theme, toggleTheme } = useContext(ThemeContext);
    
    const [countryData, setCountryData] = useState<IDetal>();
    
    const handleBackButton = () => {
      router.push("/")
    }
  
    useEffect(() => {
      const getData = async() => {
        if(countryName){
          const country = typeof countryName === "string" ? countryName : countryName[0];
          const data: IDetal  = await fetchData(country);
          setCountryData(data)
        }
      }
      getData()
    },[countryName])
    

    return ( 
        <div className={`${theme}`}>
        <div className="container">
        <div onClick={handleBackButton}className={`back back-${theme}`}><FontAwesomeIcon icon={faArrowLeft} /><span>Back</span></div>
        <div className="main">
          <div className="flag">
            <img src={countryData?.flag} alt="country flag" />
          </div>
          <div className={`info info-${theme}`}>
            <h3>{countryData?.name}</h3>
            <div className={`info-items info-items-${theme}`}>
              <p><span>Native name: </span>{countryData?.nativeName}</p>
              <p><span>Top Level Domain: </span>{countryData?.tld}</p>
              <p><span>Population: </span>{countryData?.population}</p>
              <p><span>Currencies: </span>{countryData?.currencies}</p>
              <p><span>Region: </span>{countryData?.subregion}</p>
              <p><span>Languages: </span>{countryData?.languages}</p>
              <p><span>Sub Region: </span>{countryData?.region}</p>
              <p><span>Capital: </span>{countryData?.capital}</p>
            </div>
            <div className={`borders`}>
              Border Countries: {countryData?.borders ? countryData?.borders.map(border => <div>{border}</div>) : <div>None</div>}
            </div>
          </div>
        </div>
      </div>
      </div>
     );
}
 
export default ContentCountry;