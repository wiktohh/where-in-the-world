import { ICountry } from "@/types/types";

const Country = ({name, population, flag, region, capital}: ICountry) => {
    return ( 
        <div className="country">
            <div className="country__flag"><img src={flag}></img></div>
            <div className="country__info">
                <h3>{name}</h3>
                <p><span className="country__info-item">Population: </span>{population}</p>
                <p><span className="country__info-item">Region: </span>{region}</p>
                <p><span className="country__info-item">Capital: </span>{capital}</p>
            </div>
        </div>
     );
}
 
export default Country;