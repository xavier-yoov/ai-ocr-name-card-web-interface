import axios from "axios";
import { refresh, me } from "@/api/endpoints";
const base_url = process.env.VUE_APP_SERVICE_ENDPOINT;
const instance = axios.create({
    baseURL: base_url
});
function getRequestConfig(config) {
    const token = localStorage.getItem("token");
    if (token) {
        if (!config) {
            config = {};
        }
        if (!config.headers) {
            config.headers = {};
        }
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}
export function post(url, data, config) {
    return instance.post(url, data, getRequestConfig(config));
}
export function get(url, config) {
    return instance.get(url, getRequestConfig(config));
}
export function isAuth() {
    return get(me, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
        .then(res => console.log(res))
        .catch(err => {
        if (err.response.status === 401) {
            post(refresh, { refresh_token: localStorage.getItem('refreshToken') })
                .then(res => {
                localStorage.setItem('token', res.data.access_token);
                localStorage.setItem('refreshToken', res.data.refresh_token);
            })
                .catch(err => {
                console.error(err);
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                throw err;
            });
        }
        else {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            throw err;
        }
    });
}
//# sourceMappingURL=index.js.map