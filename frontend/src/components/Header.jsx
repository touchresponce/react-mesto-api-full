import logo from "../images/logo.svg";
import { Link, withRouter, useLocation } from "react-router-dom";
import { useState } from "react";

function Header({ loggedIn, email, onSignOut }) {
  const location = useLocation();

  const [isOpen, setOpen] = useState(false);

  return (
    <header className={`header ${isOpen && loggedIn ? "header__visible" : ""}`}>
      <img className="header__logo" src={logo} alt="Лого проекта Mesto" />
      {loggedIn ? (
        <div
          className={`header__wrapper ${
            isOpen && loggedIn ? "header__wrapper_visible" : ""
          }`}
        >
          <p className="header__email">{email}</p>
          <Link className="header__link" to="/sign-in" onClick={onSignOut}>
            Выйти
          </Link>
        </div>
      ) : (
        <div
          className={`header__wrapper ${
            isOpen ? "header__wrapper_visible" : ""
          }`}
        >
          {location.pathname === "/sign-up" ? (
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          ) : (
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          )}
        </div>
      )}
      <button
        className={`header__burger ${isOpen ? "header__burger-open" : ""}`}
        type="button"
        onClick={() => setOpen(!isOpen)}
      >
        <span className="header__burger-line"></span>
      </button>
    </header>
  );
}

export default withRouter(Header);
