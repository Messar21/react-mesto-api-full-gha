export const BASE_URL = 'https://api.jutsio.nomoredomains.monster';

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

function getResponseData(res){
    if(!res.ok) {
        return Promise.reject(`Что-то пошло не так: ${res.status} ${res.statusText}`);
    }
    return res.json();
}