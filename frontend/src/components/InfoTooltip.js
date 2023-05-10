import success from "../images/Success.svg";
import error from "../images/Error.svg"
function InfoTooltip ({ isOpen, onClose, message }) {
    return (
        <div onClick={onClose} className={ isOpen ? (`popup popup_type_register popup_opened`) : (`popup popup_type_register`)}>
            <div className="popup__container">
                <button onClick={onClose} className="popup__close" type="button"></button>
                { message === "Что-то пошло не так! Попробуйте ещё раз." ?
                    <img className="popup__register-logo"
                         src={error}
                         alt="Ошибка"/>
                :   <img className="popup__register-logo"
                       src={success}
                       alt="Успешно"/>}
                <p className="popup__register-info">{ message }</p>
            </div>
        </div>
    )
}

export default InfoTooltip;