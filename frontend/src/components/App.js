import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import {useEffect, useState} from "react";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import {Route, Routes, Navigate, useNavigate} from "react-router-dom";
import * as auth from "./../utils/AuthApi";


function App(){
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cardsData, setCardsData] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [message, setMessage] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, data]) => {
                setCurrentUser(user);
                setCardsData(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    const closeAllPopups = (evt) => {
        if (evt.target.classList.contains('popup_opened')
            || evt.target.classList.contains('popup__close')){
            setIsEditAvatarPopupOpen(false);
            setIsEditProfilePopupOpen(false);
            setIsAddPlacePopupOpen(false);
            setIsInfoTooltipPopupOpen(false);
            setSelectedCard(null);
        }
    }

    const handleCardLike = (card) => {

        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeStatus(card._id, isLiked)
            .then((newCard) => {
                setCardsData((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                setCardsData((state) => state.filter((c) => c !== card));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleUpdateUser = (name, about) => {
        api.sendUserInfo(name, about)
            .then((user) => {
                setCurrentUser(user);
                setIsEditProfilePopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleUpdateAvatar = (link) => {
        api.setNewAvatar(link)
            .then((user) => {
                setCurrentUser(user);
                setIsEditAvatarPopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleAddPlaceSubmit = (name, link) => {
        api.postNewCard(name, link)
            .then((newCard) => {
                setCardsData([newCard, ...cardsData]);
                setIsAddPlacePopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        if (loggedIn) {
            navigate('/my-page', {replace: true});
        }
    }, [navigate, loggedIn]);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            checkToken(jwt);
        }
    }, [loggedIn])

    const onLogin = ({ password, email }) => {
        return auth.authorize(password, email)
            .then((res) => {
                if(res.token) {
                    setLoggedIn(true);
                    localStorage.setItem('jwt', res.token);
                }
            })
    }

    const onRegister = ({ password, email }) => {
        return auth.register(password, email)
    }

    const checkToken = (jwt) => {
            auth.getContent(jwt)
                .then((res) => {
                    if(res) {
                        setLoggedIn(true);
                        setUserEmail(res.data.email);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
    }


    const onSignOut = () => {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        setUserEmail('');
        navigate('/sign-in', {replace: true});
    }

    const openInfoToolTip = (msg, isOpen) => {
        setMessage(msg);
        setIsInfoTooltipPopupOpen(isOpen);
    }

    return (
        <CurrentUserContext.Provider value={ currentUser }>
            <div className="background-page">
                <div className="page">
                    <Header isLogged={loggedIn} onSignOut={onSignOut} email={userEmail}/>
                    <Routes>
                        <Route path="/my-page" element={ <ProtectedRoute element={Main}
                                                                         onEditProfile={ handleEditProfileClick }
                                                                         onAddPlace={ handleAddPlaceClick }
                                                                         onEditAvatar={ handleEditAvatarClick }
                                                                         onCardClick={ handleCardClick }
                                                                         onCardLike={ handleCardLike }
                                                                         onCardDelete={ handleCardDelete }
                                                                         cards={ cardsData }
                                                                         loggedIn={loggedIn} /> }
                        />
                        <Route path="/sign-in" element={
                            <Login onLogin={onLogin} openInfoToolTip={openInfoToolTip}/>
                        } />
                        <Route path="/sign-up" element={
                            <Register onRegister={onRegister} openInfoToolTip={openInfoToolTip}/>
                        } />
                        <Route path="/*" element={ loggedIn ? <Navigate to="/my-page" replace/> :
                            <Navigate to="/sign-up" replace/> }/>
                    </Routes>
                    <Footer/>
                    <EditAvatarPopup isOpen={ isEditAvatarPopupOpen }
                                     onClose={ closeAllPopups }
                                     onUpdateAvatar={ handleUpdateAvatar }/>
                    <EditProfilePopup isOpen={ isEditProfilePopupOpen }
                                      onClose={ closeAllPopups }
                                      onUpdateUser={ handleUpdateUser }/>
                    <AddPlacePopup isOpen={ isAddPlacePopupOpen }
                                   onClose={ closeAllPopups }
                                   onAddPlace={ handleAddPlaceSubmit }/>
                    <ImagePopup card={ selectedCard } onClose={ closeAllPopups }/>
                    <InfoTooltip isOpen={isInfoTooltipPopupOpen}
                                 onClose={ closeAllPopups }
                                 message={message}/>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
