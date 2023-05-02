import { ThemeContext } from "@/context/ThemeContext";
import { IHeader } from "@/types/types";
import { useContext } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'



const Header = ({handleTheme}: IHeader) => {

    const handleSwitchButtonClick = () => {
        handleTheme()
    }

    const theme = useContext(ThemeContext)

    return ( 
        <header className={`header header-${theme}`}>
            <div className="header__container">
                <h1 className="header__container-h1">Where in the world?</h1>
                <button onClick={handleSwitchButtonClick} className={`header__container-switch-button header__container-switch-button-${theme}`}>
                <FontAwesomeIcon className="icon" icon={faMoon} /> Dark mode
                </button>
            </div>
        </header>
     );
}
 
export default Header;