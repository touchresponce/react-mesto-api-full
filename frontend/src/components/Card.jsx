import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onConfirmOpen, onConfirm }) {
  // контекст юзера
  const currentUser = useContext(CurrentUserContext);

  // "доступ" к удалению

  console.log(card)

  // const isOwn = card.owner._id === currentUser._id;
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? 'element__delete' : 'element__delete_hidden'
  }`;

  // проверка лайков
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `${
    isLiked ? 'element__like element__like-active' : 'element__like'
  }`;

  function handleConfirm(card) {
    onConfirmOpen(true);
    onConfirm(card._id);
  }

  return (
    <article className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={() => handleConfirm(card)}
      />
      <div className="element__panel">
        <h2 className="element__panel-text">{card.name}</h2>
        <div className="element__like-group">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={() => onCardLike(card)}
          />
          <span className="element__like-num">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}
