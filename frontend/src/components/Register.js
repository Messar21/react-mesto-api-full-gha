import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

export default  function Register ({ onRegister, openInfoToolTip }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function resetForm () {
        setPassword('');
        setEmail('');
    }

    function handleSubmit (evt)  {
        evt.preventDefault();

        onRegister({ password, email })
            .then(() => {
                resetForm();
                navigate('/sign-in', {replace: true});
                openInfoToolTip('Вы успешно зарегистрировались!', true);
            })

            .catch(() => {
                openInfoToolTip('Что-то пошло не так! Попробуйте ещё раз.', true);
            }
        );
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    return (
        <div className="popup__container popup__container_type_auth">
            <form name="login" onSubmit={ handleSubmit } className="popup__form" noValidate>
                <h2 className="popup__form-heading popup__form-heading_type_auth">Регистрация</h2>
                <input onChange={handleEmailChange} className="popup__input popup__input_type_auth" type="email"
                       name="reg-email" placeholder="Email" value={email}
                       required minLength="2" maxLength="40" id="reg-email-input"
                />
                <span className="popup__input-error reg-email-input-error"></span>
                <input onChange={handlePasswordChange} className="popup__input popup__input_type_auth" type="password"
                       name="reg-password" placeholder="Пароль" value={password}
                       required minLength="2" maxLength="200" id="reg-password-input"
                />
                <span className="popup__input-error reg-password-input-error"></span>
                <button className="popup__save popup__save_type_auth" type="submit">Зарегистрироваться</button>
                <Link to={"/sign-in"} className="popup__link">Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    )
}