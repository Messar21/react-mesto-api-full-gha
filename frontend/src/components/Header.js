import logo from "../images/logo.svg";
import {Link, useLocation} from "react-router-dom";

function Header({ isLogged, onSignOut, email }) {
    const location = useLocation();
    const handleClick = () => {
        onSignOut();
    }
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип 'Место: Россия'"/>
            {(!isLogged && location.pathname === "/sign-up" &&
                    <Link to="/sign-in" className="header__link">Войти</Link>)
            || (!isLogged && location.pathname === "/sign-in" &&
                    <Link to="/sign-up" className="header__link">Регистрация</Link>)
            || (isLogged && <><p className="header__email">{email}</p>
                    <Link onClick={handleClick} to="/sign-in" className="header__link header__link_out">Выйти</Link></>)}
        </header>
    )
}

export default Header