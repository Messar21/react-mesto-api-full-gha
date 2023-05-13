export const BASE_URL = 'https://84.252.128.243';

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then((res) => {
            return getResponseData(res)
        })
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then((res) => {
            return getResponseData(res)
        })
};

export const getContent = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${jwt}`
        }
    })
        .then((res) => {
            return getResponseData(res)
        })
}

function getResponseData(res){
    if(!res.ok) {
        return Promise.reject(`Что-то пошло не так: ${res.status} ${res.statusText}`);
    }
    return res.json();
}