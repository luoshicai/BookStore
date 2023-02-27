import config from '../utils/config';
import {postRequest} from '../utils/ajax';

export const getOrders = (data,callback) => {
    const url = `${config.backendUrl}/GetOrders`;
    postRequest(url,data,callback);
}

export const addToOrder = (data, callback) =>{
    const url = `${config.backendUrl}/AddOneOrder`;
    postRequest(url,data,callback);
}

export const getAllOrders = (data, callback) =>{
    const url =`${config.backendUrl}/GetAllOrders`;
    postRequest(url,data,callback);
}

export const getBookSales = (data, callback) =>{
    const url =`${config.backendUrl}/GetBookSales`;
    postRequest(url,data,callback);
}

export const getConsumption = (data, callback) =>{
    const url = `${config.backendUrl}/GetUserConsumption`;
    postRequest(url, data, callback);
}

export const FilterBookByTime = (data, callback) =>{
    const url = `${config.backendUrl}/FilterBookByTime`;
    postRequest(url, data, callback);
}

export const AddToOrders = (data, callback) => {
    const url = `${config.backendUrl}/addToOrder`;
    postRequest(url,data,callback);
}

export const GetOrderDetails = (data, callback) => {
    const url = `${config.backendUrl}/GetOrderDetails`;
    postRequest(url,data,callback);
}

export const FilterTime = (data, callback) => {
    const url = `${config.backendUrl}/FilterTime`;
    postRequest(url,data,callback);
}

export const FilterAllOrderByTime = (data, callback) =>{
    const url = `${config.backendUrl}/FilterAllOrderByTime`;
    postRequest(url,data,callback);
}

export const FilterUserOrderByTime = (data, callback) =>{
    const url = `${config.backendUrl}/FilterUserOrderByTime`;
    postRequest(url,data,callback);
}

export const GetBookSalesById  = (data, callback) =>{
    const url = `${config.backendUrl}/GetBookSalesById`;
    postRequest(url,data,callback);
}

export const FilterUserBookByTime = (data,callback) =>{
    const url = `${config.backendUrl}/FilterUserBookByTime`;
    postRequest(url,data,callback);
}

