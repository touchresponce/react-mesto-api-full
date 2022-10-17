import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import PopupWithConfirm from "./PopupWithConfirm";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [idCardToDelete, setIdCardToDelete] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registration, setRegistration] = useState(false);
  const [error, setError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const history = useHistory();

  useEffect(()=>{
    tokenCheck();
    const token = localStorage.getItem('token');
    if (token) {
      Promise.all([api.getUserInfo(), api.getCards()])
      .then(([apiUser, apiCards]) => {
        console.log(apiUser, apiCards);
        setCurrentUser(apiUser)
        setCards(apiCards)
      })
      .catch((err) => console.log(err));
    }}, [loggedIn])

  // управление модалками
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
    setRegistration(false);
  }

  // лайки логика
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .like(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .dislike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  // удаление
  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(idCardToDelete)
      .then(() => {
        setCards((state) =>
          state.filter((item) => item._id !== idCardToDelete)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // ред-ие юзера
  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // ред-ие аватарки
  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .setAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // добавление карт
  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .setCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // вход
  function handleLogin(username, password) {
    auth
      .authorize({
        identifier: username,
        password: password,
      })
      .then((data) => {
        if (data.token) {
          console.log(data.token);
          setLoggedIn(true);
          tokenCheck();
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setRegistration(true);
        setTimeout(() => {
          setRegistration(false);
        }, 3000);
      });
  }

  // регистрация
  function handleRegistration({ email, password }) {
    auth
      .register(email, password)
      .then(() => {
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setRegistration(true);
        setTimeout(() => {
          setRegistration(false);
        }, 3000);
      });
  }

  // проверка токена
  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          // setEmail(res.email);
          // console.log(res)
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // выход с акка
  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  return (
    <div className="page">
      <Header loggedIn={loggedIn} email={email} onSignOut={handleSignOut} />
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={loggedIn}
          Component={
            <CurrentUserContext.Provider value={currentUser}>
              <Main
                cards={cards}
                onCardLike={handleCardLike}
                onConfirmOpen={setIsConfirmPopupOpen}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onConfirm={setIdCardToDelete}
              />
              <Footer />
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                children={EditProfilePopup}
                onUpdateUser={handleUpdateUser}
                buttonName="Сохранить"
                title="Редактировать профиль"
                isLoading={isLoading}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                children={AddPlacePopup}
                onAddPlace={handleAddPlaceSubmit}
                buttonName="Создать"
                title="Новое место"
                isLoading={isLoading}
              />
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                children={EditAvatarPopup}
                onUpdateAvatar={handleUpdateAvatar}
                buttonName="Сохранить"
                title="Обновить аватар"
                isLoading={isLoading}
              />
              <PopupWithConfirm
                isOpen={isConfirmPopupOpen}
                onClose={closeAllPopups}
                buttonName="Да"
                title="Вы уверены?"
                onCardDelete={handleCardDelete}
                isLoading={isLoading}
              />
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
          }
        />
        <Route path="/sign-in">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path="/sign-up">
          <Register handleRegistration={handleRegistration} />
        </Route>
      </Switch>

      <InfoTooltip
        isOpen={registration}
        // isOpen={true}
        onClose={closeAllPopups}
        error={error}
      />
    </div>
  );
}
