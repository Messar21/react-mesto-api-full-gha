import React from "react";
import {useEffect, useState} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');

    const user = React.useContext(CurrentUserContext);

    useEffect(() => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
    }, [user.name, user.about, user.avatar]);

    return (
        <main className="content">
            <section aria-label="Профиль" className="profile">
                <button onClick={onEditAvatar} className="profile__avatar-btn">
                    <img className="profile__avatar" src={userAvatar} alt="Аватар"/>
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button onClick={onEditProfile} className="profile__edit-button" type="button"></button>
                    <p className="profile__about">{userDescription}</p>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__add-button"></button>
            </section>
            <section aria-label="Фотографии" className="elements">
                <ul className="elements__list">
                    {
                        cards.map((card) => (
                                <Card onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={card._id} card={card} />
                            )
                        
                        )
                    }
                </ul>
            </section>
        </main>
    )
}

export default Main