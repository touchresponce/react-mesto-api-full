import { useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../utils/useFormValidation";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  buttonName,
  title,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);
  const {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
    forceValidationChange,
  } = useFormValidation();

  useEffect(() => {
    isOpen &&
      setValues({
        name: currentUser.name,
        info: currentUser.about,
      });
    forceValidationChange();
  }, [isOpen, setValues, currentUser]);

  function handleNameInput(evt) {
    handleChange(evt);
  }

  function handleInfoInput(evt) {
    handleChange(evt);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.info,
    });
    forceValidationChange();
  }

  return (
    <PopupWithForm name="edit" isOpen={isOpen} onClose={onClose}>
      <form className="form edit-form" name="edit-form" onSubmit={handleSubmit}>
        <h2 className="popup__title">{title}</h2>
        <input
          className={`popup__input popup__input_profile_name ${
            errors.name ? "popup__input_type_error" : ""
          }`}
          type="text"
          name="name"
          id="userName-input"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          autoComplete="off"
          onChange={handleNameInput}
          value={values.name || ""}
        />
        <span
          className={`popup__input-error userName-input-error ${
            !isValid ? "popup__input-error_active" : ""
          }`}
        >
          {errors.name}
        </span>
        <input
          className={`popup__input popup__input_profile_job ${
            errors.info ? "popup__input_type_error" : ""
          }`}
          type="text"
          name="info"
          id="userJob-input"
          placeholder="Работа"
          minLength="2"
          maxLength="200"
          required
          autoComplete="off"
          onChange={handleInfoInput}
          value={values.info || ""}
        />
        <span
          className={`popup__input-error userJob-input-error ${
            !isValid ? "popup__input-error_active" : ""
          }`}
        >
          {errors.info}
        </span>
        <button
          className={`popup__submit ${isValid ? "" : "popup__submit_disabled"}`}
          type="submit"
          disabled={!isValid}
        >
          {isLoading ? "Сохранение..." : buttonName}
        </button>
      </form>
    </PopupWithForm>
  );
}
