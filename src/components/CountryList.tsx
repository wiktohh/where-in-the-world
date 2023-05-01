import { ICountryList } from "@/types/types";
import Country from "./Country";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const CountryList = ({countries}: ICountryList) => {

    const theme = useContext(ThemeContext)

    return ( 
         <div className={`country-list country-list-${theme}`}>
            <div className="country-list__container">
                {countries.map((country, index) => <Country key={index} name={country.name} population={country.population} flag={country.flag} region={country.region} capital={country.capital} />)}
            </div>
         </div>
     );
}
 
export default CountryList;