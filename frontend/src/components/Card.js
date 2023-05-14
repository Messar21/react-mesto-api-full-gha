import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    const ownerCard = card.owner._id === currentUser._id;
    const ownerLike = card.likes.some(i => i._id === currentUser._id);
    console.log(currentUser._id);
    console.log(card.likes);
    function handleClick() {
        onCardClick(card);
    }

    function handleClickLikeBtn() {
        onCardLike(card);
    }

    function handleClickDeleteBtn() {
        onCardDelete(card);
    }

        return (
            <li className="elements__item">
                {ownerCard && <button onClick={handleClickDeleteBtn} className="elements__delete" type="button"/>}
                <img onClick={handleClick} className="elements__photo" src={card.link} alt={card.name}/>
                <div className="elements__about">
                    <h2 className="elements__name">{card.name}</h2>
                    <button onClick={handleClickLikeBtn} className={`elements__like ${ownerLike && 'elements__like_active'}`} type="button"/>
                    <p className="elements__likes-count">{card.likes.length}</p>
                </div>
            </li>
        )
}

export default Card