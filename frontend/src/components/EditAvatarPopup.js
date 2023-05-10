import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar }) {

    const inputRef = React.useRef();
    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar(inputRef.current.value);
        inputRef.current.value = '';
    }

    return (
        <PopupWithForm
            title='Обновить аватар'
            name='profile-avatar'
            isOpen={isOpen}
            onClose={onClose}
            textSubmit='Сохранить'
            onSubmit={handleSubmit}>
            <input className="popup__input popup__input_type_avatar" placeholder="Ссылка на аватар"
                   type="url"
                   name="avatarLink"
                   required id="avatarLink-input"
                   ref={inputRef}/>
            <span className="popup__input-error avatarLink-input-error"></span>
        </PopupWithForm>
    )
}