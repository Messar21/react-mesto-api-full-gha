import PopupWithForm from "./PopupWithForm";
import React, {useEffect} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [ name, setName ] = React.useState('');
    const [ description, setDescription ] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about)
    }, [currentUser, isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(name, description);
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='profile-edit'
            isOpen={isOpen}
            onClose={onClose}
            textSubmit='Сохранить'
            onSubmit={handleSubmit} >
            <input className="popup__input popup__input_type_name" value={name || ''} type="text"
                   name="name"
                   required minLength="2" maxLength="40" id="name-input"
                   onChange={handleNameChange}
            />
            <span className="popup__input-error name-input-error"></span>
            <input className="popup__input popup__input_type_about" value={description || ''} type="text"
                   name="about"
                   required minLength="2" maxLength="200" id="about-input"
                   onChange={handleDescriptionChange}
            />
            <span className="popup__input-error about-input-error"></span>
        </PopupWithForm>
    )
}