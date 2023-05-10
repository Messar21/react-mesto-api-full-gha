import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

export default  function Login ({ onLogin, openInfoToolTip }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    function resetForm () {
        setPassword('');
        setEmail('');
    }

    function handleSubmit (evt)  {
        evt.preventDefault();

        onLogin({ password, email })
            .then(() => {
                resetForm();
                navigate('/my-page', {replace: true});
            })
            .catch(() => {
                openInfoToolTip('Что-то пошло не так! Попробуйте ещё раз.', true);
            });
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
                <h2 className="popup__form-heading popup__form-heading_type_auth">Вход</h2>
                <input onChange={handleEmailChange} className="popup__input popup__input_type_auth" type="email"
                       name="email" placeholder="Email" value={email}
                       required minLength="2" maxLength="40" id="email-input"
                />
                <span className="popup__input-error email-input-error"></span>
                <input onChange={handlePasswordChange} className="popup__input popup__input_type_auth" type="password"
                       name="password" placeholder="Пароль" value={password}
                       required minLength="2" maxLength="200" id="password-input"
                />
                <span className="popup__input-error password-input-error"></span>
                <button className="popup__save popup__save_type_auth" type="submit">Войти</button>
            </form>
        </div>
    )
}