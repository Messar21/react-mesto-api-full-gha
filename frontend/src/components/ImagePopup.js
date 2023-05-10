function ImagePopup({ card, onClose }) {
    return (
        <div onClick={onClose} className={ card ? ("popup popup_type_image popup_opened") : ("popup popup_type_image") }>
            <div className="popup__image-container">
                <figure className="popup__figure">
                    <img className="popup__image" src={ card?.link } alt={ card?.name }/>
                    <figcaption className="popup__caption">{ card?.name }</figcaption>
                </figure>
                <button onClick={onClose} className="popup__close" type="button"></button>
            </div>
        </div>
    )
}

export default ImagePopup