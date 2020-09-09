/**
 * Filename: http.js
 * Author: Yusuf Erdal
 * AuthorUrl : https://github.com/erdalonline
 * Date: 5.05.2020
 * Time: 04:43
 */
import axios from 'axios'
import settings from '@/settings'
axios.defaults.baseURL = settings.API_URL
const http = {
    get(resource){
       return axios.get(resource)
    },
    post(resource,data){
        return axios.post(resource,data)
    },
    patch(resource,data){
        return axios.patch(resource,data)
    },
    delete(resource){
        return axios.delete(resource)
    },
    setHeader(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ` + token
    },
}

export default http
