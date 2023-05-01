import Header from "@/components/Header";
import { useRouter } from "next/router";
import Link from 'next/link';
import { Country } from "@/types/Country";
import { useEffect, useState } from "react";
import { IDetal } from "@/types/types";

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

const CountryWebsite = () => {
  const router = useRouter()
  const countryName = router.query.country;
  
  const [countryData, setCountryData] = useState<IDetal>();

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

  console.log(countryData);

    return ( 
      <div>
        <Header/>
        <Link href="/"><div>Back</div></Link>
        <div>
          <div className="flag">
            <img src={countryData?.flag} alt="country flag" />
          </div>
          <div>
            <h3>{countryData?.name}</h3>
            <div className="info">
              <p><span>Native name: </span>{countryData?.nativeName}</p>
              <p><span>Top Level Domain: </span>{countryData?.tld}</p>
              <p><span>Population: </span>{countryData?.population}</p>
              <p><span>Currencies: </span>{countryData?.currencies}</p>
              <p><span>Region: </span>{countryData?.subregion}</p>
              <p><span>Languages: </span>{countryData?.languages}</p>
              <p><span>Sub Region: </span>{countryData?.region}</p>
              <p><span>Capital: </span>{countryData?.capital}</p>
            </div>
            <div className="borders">
              {countryData?.borders.map(border => <div>{border}</div>)}
            </div>
          </div>
        </div>
      </div>
     );
}
 
export default CountryWebsite;