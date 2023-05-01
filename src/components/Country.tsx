import { ICountry } from "@/types/types";
import { useRouter } from "next/router";

const Country = ({name, population, flag, region, capital}: ICountry) => {
    const router = useRouter()


    const handleClick = () => {
        router.push(`/country/${name.toLocaleLowerCase()}`)
    }

    return ( 
        <div className="country" onClick={handleClick}>
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