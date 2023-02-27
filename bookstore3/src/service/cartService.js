import config from '../utils/config';
import {postRequest} from '../utils/ajax';

export const addToCart = (data, callback) =>{
    const url = `${config.backendUrl}/AddToCharts`;
    postRequest(url,data,callback);
}

export const getCarts = (data, callback) =>{
    const url = `${config.backendUrl}/GetCharts`;
    postRequest(url,data,callback);
}

export const deleteOneCart = (data, callback) =>{
    const url = `${config.backendUrl}/DeleteOneChart`;
    postRequest(url,data,callback);
}
