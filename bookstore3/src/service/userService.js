import config from '../utils/config';
import {postRequest} from '../utils/ajax';

export const login = (data, callback) => {
    const url = `${config.backendUrl}/LogIn`;
    postRequest(url, data, callback);
};

export const signIn = (data, callback) =>{
    const url = `${config.backendUrl}/SignIn`;
    postRequest(url,data,callback);
}

export const rootUsers = (data, callback) => {
    const url = `${config.backendUrl}/RootUsers`;
    postRequest(url, data,callback);
}

export const changeIdentity = (data, callback) => {
    const url = `${config.backendUrl}/changeIdentity`;
    postRequest(url, data, callback);
}

export const logout = (data,callback) => {
    const url = `${config.backendUrl}/Logout`;
    postRequest(url, data, callback);
}
