import { useState } from "react";
import { Link, withRouter } from "react-router-dom";

function Login({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!username || !password) {
      return;
    }
    handleLogin(username, password);
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" name="login-form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          type="email"
          name="username"
          id="username"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          required
          autoComplete="off"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
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
          Войти
        </button>
      </form>
      <h3 className="login__text">
        Нет аккаунта?&nbsp;
        <Link className="login__link" to="sign-up">
          Зарегистрироваться
        </Link>
      </h3>
    </div>
  );
}

export default withRouter(Login);
