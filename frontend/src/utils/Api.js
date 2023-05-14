export const BASE_URL = 'https://api.jutsio.nomoredomains.monster';

const getHeaders = (jwt) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ jwt }`,
    }
}

export const getInitialCards = (jwt) => {
        return fetch(`${BASE_URL}/cards`, {
            method: 'GET',
            headers: getHeaders(jwt),
        })
            .then(res => {
                return getResponseData(res);
            })
}

export const getUserInfo = (jwt) => {
        return fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers: getHeaders(jwt),
        })
            .then(res => {
                return getResponseData(res);
            })
}

export const sendUserInfo = (name, about, jwt) => {
        return fetch(`${BASE_URL}/users/me`, {
            method: 'PATCH',
            headers: getHeaders(jwt),
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => {
                return getResponseData(res);
            })
}

export const setNewAvatar = (link, jwt) => {
        return fetch(`${BASE_URL}/users/me/avatar`, {
            method: "PATCH",
            headers: getHeaders(jwt),
            body: JSON.stringify({
                    avatar: link
                }
            )
        })
            .then(res => {
                return getResponseData(res);
            })
}

export const postNewCard = (name, link, jwt) => {
        return fetch(`${BASE_URL}/cards`, {
            method: 'POST',
            headers: getHeaders(jwt),
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => {
                return getResponseData(res);
            })
}

export const deleteCard = (cardId, jwt) => {
        return fetch(`${BASE_URL}/cards/${cardId}`, {
            method: "DELETE",
            headers: getHeaders(jwt),
        })
            .then(res => {
                return getResponseData(res);
            })

}

export const changeLikeStatus = (cardId, isLiked, jwt) => {
        return isLiked ? fetch(`${BASE_URL}/cards/${cardId}/likes`, {
                    method: "DELETE",
                    headers: getHeaders(jwt),
                    })
                    .then(res => {
                        return getResponseData(res);
                    })
                : fetch(`${BASE_URL}/cards/${cardId}/likes`, {
                    method: "PUT",
                    headers: getHeaders(jwt),
                    })
                    .then(res => {
                        return getResponseData(res);
                    })
}

function getResponseData(res){
        if(!res.ok) {
            return Promise.reject(`Что-то пошло не так: ${res.status} ${res.statusText}`);
        }
        return res.json();
}
