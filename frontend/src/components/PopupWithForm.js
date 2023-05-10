function PopupWithForm({ name, title, children, isOpen, onClose, textSubmit , onSubmit }) {
    return (
        <div onClick={onClose} className={ isOpen ? (`popup popup_type_${ name } popup_opened`) : (`popup popup_type_${ name }`)}>
            <div className="popup__container">
                <button onClick={onClose} className="popup__close" type="button"></button>
                <form name={ name } onSubmit={ onSubmit } className="popup__form" noValidate>
                    <h2 className="popup__form-heading">{ title }</h2>
                    { children }
                    <button className="popup__save" type="submit">{textSubmit}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm