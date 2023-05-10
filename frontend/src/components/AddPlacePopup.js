import PopupWithForm from "./PopupWithForm";
import React from "react";
export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [nameCard, setNameCard] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setNameCard('');
        setLink('');
    }, [isOpen]);

    function handleNameCardChange(e) {
        setNameCard(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(nameCard, link);
    }

    return (
        <PopupWithForm
            title='Новое место'
            name='add-card'
            isOpen={isOpen}
            onClose={onClose}
            textSubmit='Создать'
            onSubmit={handleSubmit}>
            <input className="popup__input popup__input_type_name-card" placeholder="Название"
                   type="text" name="nameCard" required minLength="2" maxLength="30" id="name-card-input"
                   value={nameCard} onChange={handleNameCardChange}/>
            <span className="popup__input-error name-card-input-error"></span>
            <input className="popup__input popup__input_type_link" placeholder="Ссылка на картинку"
                   type="url" name="link" required id="link-input" value={link}
                   onChange={handleLinkChange}/>
            <span className="popup__input-error link-input-error"></span>
        </PopupWithForm>
    )
}