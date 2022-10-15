import { useContext } from 'react';
import addBtnPlus from '../images/addBtnPlus.svg';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Main({
  cards,
  onCardLike,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onConfirmOpen,
  onConfirm,
}) {
  //
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__wrapper">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
            onClick={onEditAvatar}></img>
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__info-edit" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="profile__info-add" type="button" onClick={onAddPlace}>
          <img src={addBtnPlus} alt="Кнопка добавления"></img>
        </button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onConfirmOpen={onConfirmOpen}
            onConfirm={onConfirm}
          />
        ))}
      </section>
    </main>
  );
}
