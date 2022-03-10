import decode from 'jwt-decode';
import config from '../../config';

export default class AuthMethods {

    constructor(domain) {
        this.domain = domain;
    }

    login = (username, password) => {
        return this.fetch(config.url + `/log-in`, {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            this.setToken(res.token);
            return Promise.resolve(res);
        });
    };

    loggedIn = () => {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    };

    isTokenExpired = token => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            console.log("expired check failed! Line 42: AuthService.js");
            return false;
        }
    };

    setToken = idToken => {
        localStorage.setItem("id_token", idToken);
    };

    getToken = () => {
        return localStorage.getItem("id_token");
    };

    logout = () => {
        localStorage.removeItem("id_token");
        window.location.reload(false);
    };

    getConfirm = () => {
        let answer = decode(this.getToken());
        return answer;
    };

    fetch = (url, options) => {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers["Authorization"] = "Bearer " + this.getToken();
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json());
    };

    _checkStatus = response => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    };

}