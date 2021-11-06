import { baseURL } from '../../constant/url'
import {
    USER_LIST_LOADING, USER_LIST_SUCCESS, USER_LIST_ERROR, USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_CREATE_ERROR,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_ERROR, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_ERROR
} from '../../constant/ActionTypes/UserType'
import { Dispatch } from 'redux'
import { UserAdd } from '../../constant/Interface'
const axios = require("axios")

export const userList = (skip?: number, page?: number, search?: string) => (dispatch: Dispatch): any => {
    dispatch({ type: USER_LIST_LOADING });
    return axios({
        method: "GET",
        url: `${baseURL}user/user-list`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        params: {
            ...(skip || skip === 0 ? { skip: skip } : {}),
            ...(page ? { page: page } : {}),
            ...(search ? { search: search } : {})
        }
    }).then((response: any) => {
        return dispatch({ type: USER_LIST_SUCCESS, response: response });
    }).catch((error: any) => {
        if (error.message === "Network Error") {
            return dispatch({ type: USER_LIST_ERROR, response: error.message });
        }
        if (error.response.status === 401) {
        }
        return dispatch({ type: USER_LIST_ERROR, response: error.response });
    });
}

export const createNewUser = (obj: UserAdd) => (dispatch: Dispatch): any => {
    dispatch({ type: USER_CREATE_REQUEST });
    let url = `${baseURL}user/user-create`;
    return axios({
        method: "POST",
        url: url,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: obj,
    }).then((response: any) => {
        return dispatch({ type: USER_CREATE_SUCCESS, response: response });
    }).catch((error: any) => {
        if (error.message === "Network Error") {
            return dispatch({
                type: USER_CREATE_ERROR,
                response: error.message,
            });
        }

        if (error.response.status === 401) {
        }
        return dispatch({ type: USER_CREATE_ERROR, response: error });
    });
}

export const updateUserRecord = (obj: UserAdd, id: string) => (dispatch: Dispatch): any => {
    dispatch({ type: USER_UPDATE_REQUEST });
    let url = `${baseURL}user/user-edit-points/${id}`;
    return axios({
        method: "PATCH",
        url: url,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: obj,
    }).then((response: any) => {
        return dispatch({ type: USER_UPDATE_SUCCESS, response: response });
    }).catch((error: any) => {
        if (error.message === "Network Error") {
            return dispatch({
                type: USER_UPDATE_ERROR,
                response: error.message,
            });
        }
        if (error.message === "Network Error") {
        }
        if (error.response.status === 401) {
        }
        return dispatch({ type: USER_UPDATE_ERROR, response: error });
    });
}

export const deleteUserRecord = (id: string) => (dispatch: Dispatch): any => {
    dispatch({ type: USER_DELETE_REQUEST });
    return axios({
        method: "GET",
        url: `${baseURL}user/user-status/${id}`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then((response: any) => {
        return dispatch({ type: USER_DELETE_SUCCESS, response: response });
    }).catch((error: any) => {
        if (error.message === "Network Error") {
            return dispatch({ type: USER_DELETE_ERROR, response: error.message });
        }
        if (error.response.status === 401) {
        }
        return dispatch({ type: USER_DELETE_ERROR, response: error.response });
    });
}