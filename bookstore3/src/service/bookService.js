import config from '../utils/config';
import {postRequest, GatewayPost} from '../utils/ajax';

export const getBooks = (data, callback) => {
    const url = `${config.backendUrl}`;
    postRequest(url,data,callback);
}

export const getBookDetail = (data, callback) => {
    const url = `${config.backendUrl}/BookDetails`;
    postRequest(url,data,callback);
}

export const DeleteById = (data, callback) => {
    const url = `${config.backendUrl}/DeleteById`;
    postRequest(url,data,callback);
}

export const ChangeBook = (data, callback) => {
    const url = `${config.backendUrl}/changeBook`;
    postRequest(url,data,callback);
}

export const addBook = (data, callback) => {
    const url = `${config.backendUrl}/addBook`;
    postRequest(url,data,callback);
}

export const solrSearch = (data, callback) => {
    const url = `${config.backendUrl}/Solr`;
    postRequest(url,data,callback);
}

export const SearchAuthorByBook = (data, callback) => {
    const url = `http://localhost:8080/author/searchAuthor?bookName=${data}`;
    console.log(url);
    GatewayPost(url,data,callback);
}

export const FindBookByTag = (data, callback) => {
    const url = `${config.backendUrl}/findBookByTag`;
    postRequest(url, data, callback);
}
