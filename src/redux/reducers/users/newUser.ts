import { USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_CREATE_ERROR } from '../../../constant/ActionTypes/UserType'

const addNewUser = (state: object = {}, action: any) => {
    switch (action.type) {
        case USER_CREATE_REQUEST: {
            let obj:any = {
                loading: true
            };
            return obj;
        }
        case USER_CREATE_SUCCESS: {
            let obj:any = {
                loading: false,
                data: action.response.data,
            };
            return obj;
        }
        case USER_CREATE_ERROR: {
            let obj:any = {
                loading: false,
                status: action.response,
            };
            return obj;
        }
        default:
            return state;
    }
}

export default addNewUser