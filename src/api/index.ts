import axios,{AxiosRequestConfig} from "axios";
import {refresh, me} from "@/api/endpoints";
import {parseJwt} from "@/helpers/auth";

const base_url = process.env.VUE_APP_SERVICE_ENDPOINT

const instance = axios.create({
    baseURL: base_url
})

function getRequestConfig(config?:AxiosRequestConfig){
    const token = localStorage.getItem("token")
    if(token){
        if(!config){
            config = {}
        }
        if(!config.headers){
            config.headers = {}
        }
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
}

export function post(url:string, data:any, config?:AxiosRequestConfig) {
    return instance.post(url, data, getRequestConfig(config))
}

export function put(url:string, data:any, config?:AxiosRequestConfig) {
    return instance.put(url, data, getRequestConfig(config))
}


export function get(url:string, config?:AxiosRequestConfig) {
    return instance.get(url, getRequestConfig(config))
}

export function isAuth() {
    return get(me,{headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .catch(err=> {
            if(err.response.status === 401){
                post(refresh, {refresh_token: localStorage.getItem('refreshToken')})
                    .then(res=>{
                        localStorage.setItem('token', res.data.access_token)
                        localStorage.setItem('refreshToken', res.data.refresh_token)
                    })
                    .catch(err=>{
                        console.error(err)
                        localStorage.removeItem('token')
                        localStorage.removeItem('refreshToken')
                        localStorage.removeItem('user')
                        throw err
                    })
            }else{
                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')
                throw err
            }
        })
}