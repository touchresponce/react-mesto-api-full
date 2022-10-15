import { useState } from "react";
import { Link, withRouter } from "react-router-dom";

function Register({ handleRegistration }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegistration({ email, password });
  }

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" name="login-form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          type="email"
          name="email"
          id="email-input"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          required
          autoComplete="off"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <input
          className="login__input"
          type="password"
          name="password"
          id="password-input"
          placeholder="Пароль"
          minLength="2"
          maxLength="20"
          required
          autoComplete="off"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <button className="login__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <h3 className="login__text">
        Уже зарегистрированы?&nbsp;
        <Link className="login__link" to="sign-in">
          Войти
        </Link>
      </h3>
    </div>
  );
}

export default withRouter(Register);
