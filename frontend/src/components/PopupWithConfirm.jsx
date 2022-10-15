import PopupWithForm from './PopupWithForm';

export default function PopupWithConfirm({
  isOpen,
  onClose,
  buttonName,
  onCardDelete,
  title,
  isLoading,
}) {
  return (
    <PopupWithForm title="Вы уверены?" name="confirm" isOpen={isOpen} onClose={onClose}>
      <form
        className="form add-form"
        name="add-form"
        onSubmit={(evt) => {
          evt.preventDefault();
          onCardDelete();
        }}>
        <h2 className="popup__title">{title}</h2>
        <button className="popup__submit margin" type="submit">
          {isLoading ? 'Удаление...' : buttonName}
        </button>
      </form>
    </PopupWithForm>
  );
}
