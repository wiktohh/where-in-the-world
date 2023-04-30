import { ICountryList } from "@/types/types";
import Country from "./Country";

const CountryList = ({countries}: ICountryList) => {
    return ( 
         <div className="country-list">
            {countries.map((country, index) => <Country key={index} name={country.name} population={country.population} flag={country.flag} region={country.region} capital={country.capital} />)}
         </div>
     );
}
 
export default CountryList;